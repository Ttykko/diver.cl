/**
 * V/ADIVER PRO 2026 - SISTEMA DE CARRITO & CATÁLOGO (PRO EDITION)
 * Arquitectura de Datos: Sincronizada con diver_db_2026
 */

const CarritoPro = {

    items: JSON.parse(localStorage.getItem('vadiver_cart')) || [],

    async init() {
        console.log("⚓ V/ADIVER CORE INIT");
        if (document.getElementById('catalogContainer')) {
            await this.renderizarCatalogo();
        }
        this.actualizarUI();
        this.eventosGlobales();
        this.initModalEvents();
    },

    formatearPrecio(valor) {
        const numero = Number(valor) || 0;
        return `$${numero.toLocaleString('es-CL')}`;
    },

    escaparHTML(str) {
        if (!str) return "";
        return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    },

    guardar() {
        localStorage.setItem('vadiver_cart', JSON.stringify(this.items));
    },

    async renderizarCatalogo() {
        const container = document.getElementById('catalogContainer');
        if (!container) return;

        try {
            const res = await fetch('/api/products');
            const result = await res.json();

            if (result.success && result.data && result.data.length > 0) {
                // 1. RESTAURADO: Volvemos a los iconos originales del catálogo técnico
                container.innerHTML = result.data.map(p => `
                    <div class="service-item">
                        <div class="btn-service product-card">
                            <span class="tag-tech">SISTEMA DE VIDA</span>
                            <i class="fa-solid ${p.icono || 'fa-microchip'}"></i>
                            <span class="prod-name">${p.nombre}</span>
                            <span class="price-badge">${this.formatearPrecio(p.precio)}</span>
                            <p class="desc-prod">${p.descripcion || 'Hardware de alto rendimiento.'}</p>
                            <button class="btn-main" onclick="CarritoPro.agregar(${p.id}, '${this.escaparHTML(p.nombre)}', ${p.precio})">
                                AÑADIR AL EQUIPO
                            </button>
                        </div>
                    </div>
                `).join('');
            } else {
                container.innerHTML = `<div class="loading-db">NO HAY PRODUCTOS DISPONIBLES</div>`;
            }
        } catch (err) {
            console.error("🔥 Error Catálogo:", err);
            container.innerHTML = `<div class="loading-db">⚠️ ERROR DE CONEXIÓN CON LA DB</div>`;
        }
    },

    agregar(id, nombre, precio) {
        const existente = this.items.find(i => i.id === id);

        if (existente) {
            existente.cantidad = (existente.cantidad || 1) + 1;
        } else {
            this.items.push({
                id,
                nombre,
                precio: Number(precio),
                cantidad: 1
            });
        }

        this.guardar();
        this.notificar(nombre);
        this.actualizarUI();
        this.encenderCarritoEnLlamas(); // Enciende las llamas en el carro al comprar
    },

    eliminar(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.guardar();
        this.actualizarUI();
    },

       actualizarUI() {
        const lista = document.getElementById('cart-items');
        const totalTxt = document.getElementById('total-price');
        const cartFloatBtn = document.querySelector('.cart-float');

        // 🛒 CORRECCIÓN DEFINITIVA: Mantiene el icono fijo y el número independiente
        if (cartFloatBtn) {
            cartFloatBtn.innerHTML = `
                <i class="fa-solid fa-cart-shopping"></i> 
                <span id="cart-count" class="cart-badge" style="${this.items.length > 0 ? 'display:flex;' : 'display:none;'}">${this.items.length}</span>
            `;
        }

        if (!lista) return;

        if (this.items.length === 0) {
            lista.innerHTML = `<div style="text-align:center; opacity:0.3; padding:50px;"><p>CARRITO VACÍO</p></div>`;
        } else {
            lista.innerHTML = this.items.map(i => `
                <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:10px; background:rgba(255,255,255,0.05); padding:10px; border-radius:8px;">
                    <div>
                        <p style="margin:0; font-size:0.85rem; font-weight:bold;">${i.nombre} x${i.cantidad || 1}</p>                        
                        <small style="color:var(--accent);">${this.formatearPrecio(i.precio)}</small>
                    </div>
                    <button onclick="CarritoPro.eliminar(${i.id})" style="background:none; border:none; color:#ff4d4d; cursor:pointer;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `).join('');
        }

        const total = this.items.reduce((acc, i) => acc + (i.precio * (i.cantidad || 1)), 0);        
        if (totalTxt) totalTxt.innerText = this.formatearPrecio(total);
    },


    // 3. NUEVO: Agrega llamas visuales al botón del carro temporalmente tras una compra
    encenderCarritoEnLlamas() {
        const cartFloatBtn = document.querySelector('.cart-float');
        if (!cartFloatBtn) return;

        // Añade la clase CSS de llamas
        cartFloatBtn.classList.add('cart-on-fire');

        // Quita el efecto después de 2 segundos de animación
        setTimeout(() => {
            cartFloatBtn.classList.remove('cart-on-fire');
        }, 2000);
    },

    notificar(nombre) {
        const aviso = document.getElementById('notificacion');
        if (!aviso) return;
        aviso.innerHTML = `✅ AÑADIDO: ${nombre}`;
        aviso.style.display = 'block';
        setTimeout(() => { aviso.style.display = 'none'; }, 2000);
    },

    toggleSidebar() {
        const side = document.getElementById('sidebar');
        if (!side) return;
        side.classList.toggle('active');
        document.body.style.overflow = side.classList.contains('active') ? 'hidden' : 'auto';
    },

    eventosGlobales() {
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const button = document.querySelector('.cart-float');
            
            if (!sidebar) return;

            if (sidebar.classList.contains('active')) {
                const clickEnBoton = button && button.contains(e.target);
                const clickEnMenuUser = e.target.closest('a[onclick*="toggleSidebar"]');

                if (!sidebar.contains(e.target) && !clickEnBoton && !clickEnMenuUser) {
                    sidebar.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    },

    initModalEvents() {
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const customModal = document.getElementById('custom-modal');

        if (modalCloseBtn && customModal) {
            modalCloseBtn.addEventListener('click', () => {
                customModal.classList.remove('active');
                location.reload();
            });
        }
    },

    async finalizarCompra() {
        const carrito = JSON.parse(localStorage.getItem('vadiver_cart')) || [];
        const token = localStorage.getItem('vadiver_token'); 
        const customModal = document.getElementById('custom-modal');

        if (carrito.length === 0) {
            return alert("🛒 Carrito vacío");
        }

        if (!token) {
            return alert("⚠️ Debes iniciar sesión para completar la compra");
        }

        try {
            const response = await fetch('/api/orders/create', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    items: carrito 
                })
            });

            const data = await response.json();

            if (data.success) {
                const side = document.getElementById('sidebar');
                if (side) side.classList.remove('active');
                document.body.style.overflow = 'auto';

                localStorage.removeItem('vadiver_cart');
                this.items = [];
                this.actualizarUI();

                if (customModal) {
                    customModal.classList.add('active');
                } else {
                    alert("🔥 COMPRA REGISTRADA PRO");
                    location.reload();
                }

            } else {
                alert("❌ Error al registrar compra: " + (data.message || "No autorizado"));
            }

        } catch (error) {
            console.error("🔥 ERROR:", error);
            alert("❌ Error de conexión con el servidor");
        }
    },
};

document.addEventListener('DOMContentLoaded', () => CarritoPro.init());
