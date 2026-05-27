// adminMiddleware.js
module.exports = (req, res, next) => {
    // 1️⃣ Verificar que exista req.user (por si el authMiddleware no pasó)
    if (!req.user) {
        return res.status(403).json({ success: false, message: "Token requerido" });
    }

    // 2️⃣ Verificar rol de admin
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ success: false, message: "Acceso solo para admin" });
    }

    // 3️⃣ Si todo OK, continuar
    next();
};