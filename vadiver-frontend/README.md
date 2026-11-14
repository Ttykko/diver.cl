# 🤿 V/ADIVER — Landing Page & Plataforma de Expediciones Submarinas

Aplicación web comercial desarrollada para **V/ADIVER** (Maullín, Región de Los Lagos, Chile). Diseñada con una estética inmersiva de alto contraste (**HUD / Estilo 2080**) enfocada en la conversión directa hacia reservas de bautismos submarinos y expediciones guiadas.

🌐 **Sitio en producción:** [diver.cl](https://diver.cl)

---

## ✨ Características Principales

* **Visor Dual de Expediciones (HUD 2080):** Tarjetas horizontales interactivas con flujo asincrónico. El panel izquierdo presenta fotografías de los *spots* con efecto *Ken Burns*, mientras que el panel derecho despliega telemetría visual e información técnica de inmersión.
* **Bóveda Fotográfica Inmersiva (Lightbox):** Galerías individuales de hasta 30 capturas reales por destino (*Lago Chapo, Los Riscos, Isla Lagartija, Lago Pellaifa y Piedra del Barco*) con tira de miniaturas navegables.
* **Carrusel Horizontal de Staff Certificado:** Presentación dinámica del equipo de instructores y buzos comerciales con encuadre adaptativo y credenciales verificadas (Armada, DAN, ACHS, Piloto R.O.V.).
* **Tarifario Dinámico (Individual / Pack Dúo):** Selector interactivo de modalidad con desglose transparente de valores Neto + IVA y cotización directa.
* **Conversión Directa a WhatsApp:** Componente unificado (`BotonWhatsApp`) con mensajes prellenados dinámicamente según la expedición, tarifa o consulta seleccionada.
* **Diseño 100% Responsivo:** Adaptado para dispositivos móviles con soporte táctil (*swipe* vertical y horizontal) y pantallas de escritorio.

---

## 🛠️ Stack Tecnológico

* **Core:** [React 18](https://react.dev) + [TypeScript](https://typescriptlang.org)
* **Bundler & Entorno:** [Vite](https://vitejs.dev)
* **Estilos:** [SASS / SCSS](https://sass-lang.com) modularizado por componente + CSS Grid / Flexbox
* **Iconografía:** Font Awesome 6 & Google Fonts (*Orbitron* & *Inter*)
* **Despliegue:** Hostinger (Static Build optimizado)

---

## 📂 Estructura del Proyecto

```text
vadiver-frontend/
├── public/
│   └── img/                  # Recursos visuales organizados por destino y staff
│       ├── chapo/
│       ├── guias/
│       ├── lagartija/
│       ├── maullin/
│       ├── pellaifa/
│       └── riscos/
├── src/
│   ├── components/
│   │   ├── Bautismos/        # Carrusel horizontal del equipo de guías
│   │   ├── Expediciones/     # Visor dual 2080 y bóveda de fotos por spot
│   │   ├── Footer/           # Pie de página con contacto y mapa de Maullín
│   │   ├── Galeria/          # Cuadrícula general y visor modal
│   │   ├── Hero/             # Portada inmersiva principal
│   │   ├── Navbar/           # Barra de navegación fija con CTA directo
│   │   ├── Tarifas/          # Tarjetas de precios con selector Individual/Dúo
│   │   └── BotonWhatsApp.tsx # Componente reutilizable de enlace directo
│   ├── App.tsx               # Composición principal de la landing page
│   ├── config.ts             # Datos centralizados (expediciones, staff, tarifas)
│   └── index.css             # Variables globales y estilos base
├── package.json
└── tsconfig.json
```

---

## 🚀 Instalación y Uso Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com
   cd diver.cl/vadiver-frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre `http://localhost:5173/` en tu navegador.

4. **Compilar para producción (Hostinger):**
   ```bash
   npm run build
   ```
   Esto generará la carpeta optimizada `dist/` lista para subir al directorio `public_html` del servidor.

---

## 📄 Licencia y Autoría

Proyecto desarrollado a medida para **V/ADIVER Chile**. Todos los derechos reservados sobre el material fotográfico y de marca.
