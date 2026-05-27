# 🤿 V/ADiver Pro - Real-World Operations & Booking System

### ⚓ Sobre el Proyecto
**V/ADiver Pro** es una plataforma digital de alto rendimiento diseñada para la gestión de **Turismo Aventura**, **Bautismos Submarinos** y **Comercialización de Equipamiento Técnico**. 

A diferencia de proyectos de práctica, este sistema es la evolución técnica de un servicio real que opera bajo el dominio oficial **[diver.cl](https://diver.cl)**, consolidando casi dos años de presencia digital y operaciones en la Región de Los Lagos, Chile.

### 📈 Trayectoria y Evolución Técnica
Este repositorio documenta la refactorización completa de una infraestructura estática hacia un ecosistema **Full-Stack** moderno:
*   **Septiembre 2024:** Adquisición de infraestructura en Hostinger y lanzamiento de la marca.
*   **2024 - 2025:** Operación continua y validación de servicios en terreno (Maullín, Calbuco, Puerto Montt).
*   **Abril 2026 (Actual):** Implementación de arquitectura robusta optimizada para **Node.js v24** y **MySQL 9.0**, integrando persistencia de datos y escalabilidad.

---

### 🛠️ Stack Tecnológico (Production-Ready)
*   **Backend:** Node.js + Express (Arquitectura resiliente y manejo de errores global).
*   **Base de Datos:** MySQL 9.0+ (Seguridad SHA256, Pool de conexiones y optimización de latencia).
*   **Frontend:** HTML5, CSS3 (Glassmorphism UI), JavaScript Vanilla (Carga optimizada).
*   **Infraestructura:** Desplegado en entorno de producción real bajo dominio .cl.

---

### 🚀 Funcionalidades Principales
1.  **Sistema de Reservas (Bookings):** Flujo completo desde el cliente hasta la base de datos para Bautismos y Expediciones de Turismo.
2.  **E-commerce Core:** Catálogo dinámico de equipamiento técnico conectado a MySQL con persistencia transaccional de carritos.
3.  **Seguridad & Performance:** Encriptación de credenciales con `bcryptjs`, protección contra SQL Injection y manejo de rutas para SPAs.
4.  **Galería de Expediciones:** Interfaz visual optimizada para portafolio de servicios de inmersión.

---

### 🔄 Arquitectura Transaccional y Próximo Sprint (Mercado Pago)
El motor de Checkout actual está **completamente integrado con el Backend y la Base de Datos MySQL**. Al presionar "Pagar Equipo", el sistema procesa la orden, valida los inventarios y registra la compra de manera exitosa en el servidor local. 

Para escalar el proyecto a producción comercial, se ha estructurado la arquitectura de pagos en las siguientes fases:

*   **⚡ Fase Actual (Simulación de Control):** Flujo transaccional local cerrado. Al confirmar el carrito, los datos viajan al backend, impactan la base de datos de manera limpia y retornan un estado exitoso (`COMPRA REGISTRADA PRO`), simulando la respuesta positiva de un servicio externo.
*   **⏩ Próximo Sprint:** Sustitución del controlador local por el SDK Oficial de **Mercado Pago (Checkout Pro)** en modo *Sandbox*. Se implementarán *Webhooks* asíncronos para actualizar dinámicamente los estados de la orden (`pending`, `approved`, `rejected`) directamente en el esquema relacional.

---

### 📂 Estructura del Proyecto
```text
├── public/              # Interfaz de Usuario (Frontend)
│   ├── index.html       # Estructura semántica de alto impacto
│   ├── style.css        # Diseño Cyber-Ocean (Glassmorphism)
│   └── script.js        # Lógica de cliente y Fetch API transaccional
├── server.js            # Motor Backend Robusto (Node v24) - API REST & Controladores
├── database.sql         # Esquema de datos profesional (Usuarios, Productos, Compras)
└── .env.example         # Guía de configuración de entorno y API Keys
```
