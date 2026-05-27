// 1. CARGA DINÁMICA DEL MOTOR PDF (VERSIÓN ROBUSTA)
if (typeof html2pdf === 'undefined') {
    const s = document.createElement('script');
    s.src = "https://cloudflare.com";
    s.onload = () => console.log("⚓ Motor PDF Sincronizado");
    document.head.appendChild(s);
}


/**
 * V/ADIVER PRO 2026 - ADMIN CORE (VERSIÓN FINAL PULIDA)
 * Sistema de Gestión de Productos, Usuarios y Ventas con JWT
 */

// Usamos window para asegurar que el navegador siempre encuentre el objeto Admin
window.Admin = {
    
    // 1. INICIALIZACIÓN
    async init() {
        console.log("🚀 V/ADIVER Admin System: Activo");
        this.checkAdmin();
        try {
            await this.cargarProductos();
            await this.cargarDashboardUnificado();
            await this.cargarOrdenesAdmin();
            this.inicializarFormularioProductos();
        } catch (err) {
            console.error("❌ Error en la carga inicial:", err);
        }
    },

    // 2. SEGURIDAD Y COMUNICACIÓN (apiCall con JWT)
    async apiCall(url, method = 'GET', body = null) {
        const token = localStorage.getItem('vadiver_token');
        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        if (body) options.body = JSON.stringify(body);

        try {
            const res = await fetch(url, options);
            if (res.status === 401 || res.status === 403) {
                alert("⛔ Sesión expirada o acceso no autorizado");
                window.location.href = 'index.html';
                return null;
            }
            return await res.json();
        } catch (err) {
            console.error(`Error en fetch (${url}):`, err);
            return null;
        }
    },

    checkAdmin() {
        const user = JSON.parse(localStorage.getItem('vadiver_user'));
        if (!user || user.rol !== 'admin') {
            window.location.href = 'index.html';
        }
    },

    // 3. GESTIÓN DE PRODUCTOS
    async cargarProductos() {
        const cont = document.getElementById('admin-products');
        if (!cont) return;

        const data = await this.apiCall('/api/products');
        if (data?.success) {
            cont.innerHTML = data.data.map(p => `
                <div class="admin-card">
                    <div>
                        <strong>${p.nombre}</strong>
                        <p>$${Number(p.precio).toLocaleString('es-CL')}</p>
                        <small>${p.descripcion || 'Hardware técnico certificado'}</small>
                    </div>
                    <button onclick="Admin.eliminarProducto(${p.id})" class="btn-delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    },

    async crearProducto() {
        const nombre = document.getElementById('prodNombre')?.value.trim();
        const precio = document.getElementById('prodPrecio')?.value;
        const descripcion = document.getElementById('prodDesc')?.value.trim();
        
        if (!nombre || !precio) return alert("⚠️ Completa nombre y precio");

        const data = await this.apiCall('/api/products/manage', 'POST', {
            nombre, precio: Number(precio), descripcion
        });

        if (data?.success) {
            alert("✅ Producto creado");
            ["prodNombre", "prodPrecio", "prodDesc"].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.value = "";
            });
            this.cargarProductos();
        }
    },

    async eliminarProducto(id) {
        if (!confirm("¿Eliminar este producto?")) return;
        const data = await this.apiCall(`/api/products/manage/${id}`, 'DELETE');
        if (data?.success) this.cargarProductos();
    },

    // 4. GESTIÓN DE USUARIOS
    async cargarDashboardUnificado() {
        const container = document.getElementById('userTableBody');
        if (!container) return;

        const result = await this.apiCall('/api/admin/dashboard');
        if (result?.success) {
            container.innerHTML = result.data.map(u => `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.nombre}</td>
                    <td>${u.email}</td>
                    <td>${u.telefono || 'N/A'}</td>
                    <td>${u.rol}</td>
                    <td>${new Date(u.fecha_registro).toLocaleDateString()}</td>
                    <td style="color:#00ff00">Activo</td>
                </tr>
            `).join('');
        }
    },

       // 5. GESTIÓN DE VENTAS (Versión ultra-compatible)
           // 5. GESTIÓN DE VENTAS (TICKETS Y PDF)
    async cargarOrdenesAdmin() {
        const container = document.getElementById('adminOrders');
        const template = document.getElementById('ticket-template');
        if (!container) return;

        const data = await this.apiCall('/api/admin/orders');
        if (!data || !data.success) return;

        const clientes = this.agruparVentas(data.data);
        container.innerHTML = ""; 

        Object.entries(clientes).forEach(([email, info], idx) => {
            const grupo = document.createElement('div');
            grupo.className = 'cliente-grupo';
            
            // Aquí inyectamos el HTML que incluye el BOTÓN DE DESCARGA
            grupo.innerHTML = `
                <button class="btn-collapse" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                    <span>👤 ${info.nombre} (${email})</span>
                    <span>$${info.totalGral.toLocaleString('es-CL')} ▾</span>
                </button>

                <div class="detalles-orden" style="display:none; padding:20px;">
                    ${Object.values(info.ordenes).map(orden => `
                        <div class="orden-item" style="border-bottom:1px solid #333; padding-bottom:20px; margin-bottom:20px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                                <strong>🧾 Orden #${orden.id}</strong>
                              // Dentro de tu map de órdenes en admin.js:
                            ${orden.estado === 'entregado' 
                                ? '<b style="color:#2ecc71; font-size:0.8rem;">✅ ENTREGADO</b>' 
                                : `<button onclick="cambiarEstado(${orden.id},'entregado')" class="btn-entregar">MARCAR ENTREGADO</button>`}

                            </div>

                            <!-- TICKET BLANCO -->
                            <div id="ticket-pdf-${orden.id}" style="background:#fff; color:#000; padding:20px; border-radius:4px;">
                                ${this.plantillaPDF(orden, info.nombre, email)}
                            </div>

                            <!-- EL BOTÓN QUE TE FALTABA -->
                            <button onclick="descargarPDF('ticket-pdf-${orden.id}')" 
                                    style="width:100%; background:#e74c3c; color:white; border:none; padding:12px; margin-top:10px; border-radius:4px; cursor:pointer; font-family:'Orbitron', sans-serif;">
                                <i class="fa-solid fa-file-pdf"></i> DESCARGAR BOLETA PDF
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(grupo);
        });
    },



    agruparVentas(data) {
        return data.reduce((acc, item) => {
            // Aseguramos que el email sea la llave
            if (!acc[item.email]) acc[item.email] = { nombre: item.nombre, ordenes: {}, totalGral: 0 };
            
            // Usamos order_id que es como viene del server.js
            const idOrden = item.order_id; 
            
            if (!acc[item.email].ordenes[idOrden]) {
                acc[item.email].ordenes[idOrden] = { 
                    id: idOrden, 
                    productos: [], 
                    totalO: 0 
                };
            }
            
            const precio = Number(item.precio) || 0;
            const cantidad = Number(item.cantidad) || 0;
            const subtotal = precio * cantidad;

            acc[item.email].ordenes[idOrden].productos.push({ 
                nombre: item.producto, // Debe coincidir con p.nombre AS producto del server
                cantidad: cantidad, 
                precio: precio 
            });
            
            acc[item.email].ordenes[idOrden].totalO += subtotal;
            acc[item.email].totalGral += subtotal;
            
            return acc;
        }, {});
    },

    // 6. HELPERS
    agruparVentas(data) {
        return data.reduce((acc, item) => {
            if (!acc[item.email]) acc[item.email] = { nombre: item.nombre, ordenes: {}, totalGral: 0 };
            if (!acc[item.email].ordenes[item.order_id]) {
                acc[item.email].ordenes[item.order_id] = { id: item.order_id, estado: item.estado, productos: [], totalO: 0 };
            }
            const sub = (Number(item.precio) || 0) * (Number(item.cantidad) || 0);
            acc[item.email].ordenes[item.order_id].productos.push({ nombre: item.producto, cantidad: item.cantidad, precio: item.precio });
            acc[item.email].ordenes[item.order_id].totalO += sub;
            acc[item.email].totalGral += sub;
            return acc;
        }, {});
    },

    plantillaPDF(orden, nombre, email) {
        return `
            <div style="padding:40px; font-family:Arial; color:#000; background:#fff; border:1px solid #eee;">
                <h1 style="text-align:center; color:#0056b3;">V/ADIVER PRO</h1>
                <hr>
                <p><strong>Orden:</strong> #${orden.id} | <strong>Cliente:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email} | <strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                    <tr style="border-bottom:2px solid #000;"><th>Equipo</th><th>Cant.</th><th>Precio</th></tr>
                    ${orden.productos.map(p => `<tr><td>${p.nombre}</td><td>${p.cantidad}</td><td>$${p.precio.toLocaleString('es-CL')}</td></tr>`).join('')}
                </table>
                <h2 style="text-align:right;">TOTAL: $${orden.totalO.toLocaleString('es-CL')}</h2>
            </div>`;
    },

    inicializarFormularioProductos() {
        const form = document.getElementById('addProductForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.crearProducto();
            });
        }
    }
};

// --- FUNCIONES GLOBALES (Para llamadas desde el HTML) ---
async function cambiarEstado(id, nuevoEstado) {
    if (!confirm(`¿Confirmas entrega de la Orden #${id}?`)) return;
    const result = await Admin.apiCall('/api/admin/update-order-status', 'POST', { order_id: id, nuevo_estado: nuevoEstado });
    if (result?.success) {
        alert('✅ Orden marcada como entregada.');
        Admin.cargarOrdenesAdmin();
    }
}

// --- COPIA ESTO AL FINAL DE TU ADMIN.JS ---
// PEGA ESTO AL FINAL DE TODO EN admin.js
window.descargarPDF = function(divId) {
    const element = document.getElementById(divId);
    if (!element) return alert("❌ Error: No se encontró el ticket visual.");

    // Creamos una ventana de impresión limpia
    const ventanaImpresion = window.open('', '_blank');
    
    ventanaImpresion.document.write(`
        <html>
            <head>
                <title>V/ADIVER PRO - Comprobante de Venta</title>
                <style>
                    body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
                    h1 { color: #0056b3; text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th { border-bottom: 2px solid #000; text-align: left; padding: 10px; }
                    td { border-bottom: 1px solid #eee; padding: 10px; }
                    .total-box { text-align: right; margin-top: 30px; font-size: 1.5em; font-weight: bold; }
                    hr { border: 0; border-top: 1px solid #ccc; margin: 20px 0; }
                </style>
            </head>
            <body>
                ${element.innerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function() { window.close(); };
                    }
                </script>
            </body>
        </html>
    `);
    ventanaImpresion.document.close();
};



// --- DISPARADOR DE INICIO ---
document.addEventListener('DOMContentLoaded', () => Admin.init());

