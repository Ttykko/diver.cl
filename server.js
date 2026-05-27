/**
 * V/ADIVER PRO 2026 - PRODUCTION SERVER (FULL ROBUST VERSION)
 * Sistema de Gestión de Operaciones Submarinas y Tienda Técnica
 */
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();

const authMiddleware = require('./middlewares/authMiddleware');
/* ==========================================
   1. CONFIGURACIÓN Y CONSTANTES
========================================== */
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ||'VADIVER_PRO_2026_SECRET_ULTRA_SEGURA';
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Crear carpeta de subidas si no existe
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

/* ==========================================
   2. CONEXIÓN A BASE DE DATOS (MySQL 9)
========================================== */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root123',
    database: process.env.DB_NAME || 'diver_db_2026',
    waitForConnections: true,
    connectionLimit: 10
});

/* ==========================================
   3. SEGURIDAD (MIDDLEWARE JWT)
========================================== */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae solo el código

    if (!token) return res.status(401).json({ success: false, message: "Token faltante" });

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error("❌ Error de Verificación:", err.message);
            return res.status(403).json({ success: false, message: "Sesión inválida" });
        }
        req.user = user;
        next();
    });
};

/* ==========================================
   4. AUTENTICACIÓN (LOGIN Y REGISTRO)
========================================== */

app.post('/api/auth/login', async (req,res)=>{

try{

const { email,password } = req.body;

const [rows] = await pool.execute(
"SELECT * FROM users WHERE email = ?",
[email]
);

if(!rows.length){

return res.status(401).json({
success:false,
message:'Usuario no encontrado'
});

}

const user = rows[0];

const ok = await bcrypt.compare(
password,
user.password
);

if(!ok){

return res.status(401).json({
success:false,
message:'Contraseña incorrecta'
});

}

const token = jwt.sign(
{
id:user.id,
rol:user.rol
},
JWT_SECRET_KEY,
{
expiresIn:'8h'
}
);

res.json({
success:true,
token,
user:{
id:user.id,
nombre:user.nombre,
email:user.email,
telefono:user.telefono,
rol:user.rol,
avatar:user.avatar
}
});

}catch(err){

console.error("🔥 Error Login:",err);

res.status(500).json({
success:false
});

}

});


app.post('/api/auth/register', async (req,res)=>{

try{

const {nombre,email,password,telefono,rol} = req.body;

const hash = await bcrypt.hash(password,10);

const [result] = await pool.execute(
`INSERT INTO users
(nombre,email,password,telefono,rol)
VALUES(?,?,?,?,?)`,
[
nombre,
email,
hash,
telefono || null,
rol || 'cliente'
]
);

const token = jwt.sign(
{
id: result.insertId,
rol: rol || 'cliente'
},
JWT_SECRET_KEY,
{
expiresIn:'8h'
}
);

res.json({
success:true,
token,
user:{
id: result.insertId,
nombre,
email,
telefono,
rol: rol || 'cliente'
}
});

}catch(err){

console.error(err);

res.status(500).json({
success:false
});

}

});


app.post('/api/auth/update-profile', authMiddleware, async (req,res)=>{

try{

const { id,nombre,telefono,avatar } = req.body;

await pool.execute(
`UPDATE users
SET nombre=?, telefono=?, avatar=?
WHERE id=?`,
[
nombre,
telefono,
avatar,
id
]
);

res.json({
success:true
});

}catch(err){

console.error("🔥 Error Perfil:",err);

res.status(500).json({
success:false,
message:'Error actualizando perfil'
});

}

});
/* ==========================================
   5. PANEL DE ADMINISTRACIÓN (PROTEGIDO)
========================================== */
app.get('/api/admin/dashboard', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT id, nombre, email, telefono, rol, fecha_registro FROM users ORDER BY id DESC');
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

app.get('/api/admin/orders', authenticateToken, async (req, res) => {
    // Solo permitimos si es admin
    if (req.user.rol !== 'admin') return res.status(403).json({ success: false });

    try {
        // Consulta simplificada para evitar errores de nombres
        const query = `
            SELECT 
                o.id AS order_id, 
                o.estado, 
                u.nombre, 
                u.email, 
                p.nombre AS producto, 
                oi.cantidad, 
                oi.precio 
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN order_items oi ON oi.order_id = o.id
            JOIN products p ON oi.product_id = p.id
            ORDER BY o.id DESC`;

        const [rows] = await pool.execute(query);
        
        console.log("✅ Ventas encontradas:", rows.length); // Verás esto en tu terminal
        
        res.json({ 
            success: true, 
            data: rows 
        });
    } catch (err) {
        console.error("🔥 ERROR CRÍTICO EN SQL VENTAS:", err.message);
        res.status(500).json({ 
            success: false, 
            message: "Error en la consulta de base de datos",
            error: err.message 
        });
    }
});


app.post('/api/admin/update-order-status', authenticateToken, async (req, res) => {
    const { order_id, nuevo_estado } = req.body;
    try {
        await pool.execute('UPDATE orders SET estado = ? WHERE id = ?', [nuevo_estado, order_id]);
        res.json({ success: true, message: "Estado actualizado" });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

/* ==========================================
   6. GESTIÓN DE PRODUCTOS
========================================== */
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM products ORDER BY id DESC");
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// Crear/Administrar productos (Solo Admin)
app.post('/api/products/manage', authenticateToken, async (req, res) => {
    if (req.user.rol !== 'admin') return res.status(403).json({ success: false });
    const { nombre, precio, descripcion } = req.body;
    try {
        await pool.execute("INSERT INTO products (nombre, precio, descripcion) VALUES (?, ?, ?)", [nombre, precio, descripcion]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});


/* ==========================================
   ELIMINAR PRODUCTO (ADMIN)
========================================== */

app.delete('/api/products/manage/:id', authenticateToken, async (req, res) => {

    if (req.user.rol !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No autorizado'
        });
    }

    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Producto eliminado correctamente'
        });

    } catch (err) {
        console.error("❌ ERROR DELETE PRODUCT:", err);
        res.status(500).json({
            success: false,
            message: 'Error interno'
        });
    }
});
/* ==========================================
   7. CHECKOUT Y LOGS DE ACTIVIDAD
========================================== */
app.post('/api/orders/create', authenticateToken, async (req, res) => {
    const { items } = req.body;
    const user_id = req.user.id;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total, status, estado) VALUES (?, ?, ?, ?)',
            [user_id, total, 'pagado', 'pendiente']
        );
        const orderId = orderResult.insertId;

        for (const item of items) {
            await connection.execute(
                "INSERT INTO order_items (order_id, product_id, cantidad, precio) VALUES (?, ?, ?, ?)",
                [orderId, item.id, item.cantidad || 1, item.precio]
            );
        }

        // Log de Actividad Robusto
        await connection.execute(
            "INSERT INTO user_activity_logs (user_id, action, metadata) VALUES (?, ?, ?)",
            [user_id, 'CREATE_ORDER', JSON.stringify({ orderId, total })]
        );

        await connection.commit();
        res.json({ success: true, orderId });
    } catch (err) {
        await connection.rollback();
        console.error("❌ ERROR CHECKOUT:", err);
        res.status(500).json({ success: false });
    } finally {
        connection.release();
    }
});

/* ==========================================
   8. GESTIÓN DE AVATARES (MULTER)
========================================== */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, unique + path.extname(file.originalname));
    }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/api/upload-avatar', upload.single('avatar'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false });
    res.json({ success: true, url: `/uploads/${req.file.filename}` });
});

/* ==========================================
   9. INICIO DE SERVIDOR
========================================== */
app.listen(PORT, () => {
    console.log(`⚓ V/ADIVER PRO CORE 2026 ACTIVO en http://localhost:${PORT}`);
});
