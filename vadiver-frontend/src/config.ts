export const CONFIG = {
  telefono: "56934114891",
  email: "contacto@diver.cl",
  ubicacion: "Maullín, Región de Los Lagos, Chile",
  googleMapsUrl: "https://google.com",
};

export interface TipItem { icono: string; titulo: string; texto: string; }
export interface Expedicion { id: number; nombre: string; ubicacion: string; iconoUbicacion: string; fotos: string[]; tips: TipItem[]; }
export interface GuiaStaff { id: string; nombre: string; cargo: string; foto: string; certificaciones: string[]; }
export interface PlanInmersion { id: string; badge: string; titulo: string; subtitulo: string; precioAntesIndividual: string; precioIndividual: string; detalleIvaIndividual: string; precioAntesDuo: string; precioDuo: string; detalleIvaDuo: string; destacado?: boolean; icono: string; incluye: string[]; }

const generarFotosSpot = (carpeta: string, cantidad: number): string[] =>
  Array.from({ length: cantidad }, (_, i) => `/img/${carpeta}/${i + 1}.jpg`);

export const EXPEDICIONES_HORIZONTALES: Expedicion[] = [
  { id: 1, nombre: "LAGO CHAPO", ubicacion: "Sector Cordillera, Los Lagos", iconoUbicacion: "fa-location-dot", fotos: generarFotosSpot("chapo", 26), tips: [
    { icono: "fa-water", titulo: "Descripción", texto: "Instrucción técnica y seguridad en cada inmersión rodeado de aguas cristalinas de origen glacial y bosque nativo." },
    { icono: "fa-lightbulb", titulo: "Tips de Inmersión", texto: "Ideal para principiantes y bautismos. Aguas calmas con excelente visibilidad para practicar flotabilidad." },
    { icono: "fa-shield-halved", titulo: "Equipamiento", texto: "Incluye traje de neopreno térmico completo, regulador, chaleco, plomos e instructor guía 1 a 1." }
  ]},
  { id: 2, nombre: "LOS RISCOS", ubicacion: "Lago Llanquihue", iconoUbicacion: "fa-location-dot", fotos: generarFotosSpot("riscos", 24), tips: [
    { icono: "fa-water", titulo: "Descripción", texto: "Tu primera respiración bajo el agua con equipamiento completo incluido frente a los paisajes del Lago Llanquihue." },
    { icono: "fa-lightbulb", titulo: "Tips de Inmersión", texto: "Traer traje de baño, toalla y muda seca. No necesitas saber nadar profesionalmente para realizar tu bautismo." },
    { icono: "fa-camera", titulo: "Registro Subacuático", texto: "Te llevas fotografías de alta definición de tu primera experiencia respirando bajo el lago." }
  ]},
  { id: 3, nombre: "ISLA LAGARTIJA", ubicacion: "Naufragio Vapor Valparaíso", iconoUbicacion: "fa-anchor", fotos: generarFotosSpot("lagartija", 25), tips: [
    { icono: "fa-ship", titulo: "Historia Sumergida", texto: "Expedición histórica hacia los restos sumergidos y la antigua rueda del histórico barco a vapor Valparaíso." },
    { icono: "fa-lightbulb", titulo: "Tips de Inmersión", texto: "Sujeto a condiciones de marea y ventana climática. Se realiza charla histórica y técnica previa al embarque." },
    { icono: "fa-fish", titulo: "Fauna Marina", texto: "Los restos del naufragio funcionan como arrecife artificial lleno de vida marina, esponjas y crustáceos." }
  ]},
  { id: 4, nombre: "LAGO PELLAIFA", ubicacion: "Bosques Sumergidos", iconoUbicacion: "fa-tree", fotos: generarFotosSpot("pellaifa", 30), tips: [
    { icono: "fa-water", titulo: "Descripción", texto: "Inmersión guiada entre árboles milenarios sumergidos que conservan sus troncos intactos bajo el agua." },
    { icono: "fa-lightbulb", titulo: "Tips de Inmersión", texto: "Mantener control de aleteo suave para no levantar sedimento del fondo y disfrutar de una visibilidad mística." },
    { icono: "fa-video", titulo: "Bitácora Visual", texto: "Un escenario único para fotografía submarina de paisaje entre copas y ramas sumergidas." }
  ]},
  { id: 5, nombre: "PIEDRA DEL BARCO", ubicacion: "Maullín, Región de Los Lagos", iconoUbicacion: "fa-location-dot", fotos: generarFotosSpot("maullin", 15), tips: [
    { icono: "fa-compass", titulo: "Descripción", texto: "Exploración submarina de formaciones rocosas emblemáticas en la costa de Maullín con rica biodiversidad." },
    { icono: "fa-lightbulb", titulo: "Tips de Inmersión", texto: "Recomendado desayunar liviano 2 horas antes de la inmersión e hidratarse bien previo al ingreso al agua." },
    { icono: "fa-user-check", titulo: "Seguridad Local", texto: "Operación supervisada por buzos comerciales locales con pleno conocimiento de las corrientes de Maullín." }
  ]}
];

export const STAFF_GUIAS: GuiaStaff[] = [
  {
    id: "guia-1",
    nombre: "Roger Vargas",
    cargo: "Director de Operaciones & Buzo Comercial",
    foto: "/img/guias/roger vargas.png",
    certificaciones: [
      "Supervisor de Buzo Comercial",
      "Buzo Deportivo Avanzado",
      "Primeros Auxilios (DAN)"
    ]
  },
  {
    id: "guia-2",
    nombre: "Johan Villarroel",
    cargo: "Instructor & Guía Submarino",
    foto: "/img/guias/Johan Villarroel.jpg",
    certificaciones: [
      "Buzo Comercial",
      "Buzo Deportivo Avanzado",
      "Rescate y Seguridad Subacuática"
    ]
  },
  {
    id: "guia-3",
    nombre: "José Ojeda Vargas",
    cargo: "Buzo Comercial & Piloto R.O.V.",
    foto: "/img/guias/jose ojeda vargas.png",
    certificaciones: [
      "Buzo Comercial",
      "Operador R.O.V. Subacuático",
      "Buzo Deportivo Avanzado",
      "Enfermero y Relator de Primeros Auxilios ACHS",
      "Logística Marítima y Embarque"
    ]
  },
  {
    id: "guia-4",
    nombre: "Samuel",
    cargo: "Guía Técnico & Apoyo de Superficie",
    foto: "/img/guias/samuel.jpg",
    certificaciones: [
      "Buzo Intermedio",
      "Buzo Deportivo",
      "Operador R.O.V. Subacuático"
    ]
  }
];


export const TARIFAS_INMERSION: PlanInmersion[] = [
  { id: "bautismo", badge: "OFERTA ESPECIAL 2027", titulo: "Bautismo de Buceo V&A Diver", subtitulo: "Tu primera experiencia respirando bajo el agua sin requisitos previos.", precioAntesIndividual: "$119.000", precioIndividual: "$101.150", detalleIvaIndividual: "Neto $85.000 + IVA (19%) • Ya incluye descuento", precioAntesDuo: "$202.300", precioDuo: "$190.000", detalleIvaDuo: "Pack 2 Personas • Ahorras $12.300 (IVA Incluido)", icono: "fa-water", incluye: ["Charla técnica y adaptación en superficie", "Inmersión guiada 1 a 1 con Buzo Comercial", "Equipo completo (Neopreno, regulador, BCD)", "Registro fotográfico subacuático incluido"] },
  { id: "isla-lagartija", badge: "MÁS SOLICITADO • OFERTA 2027", titulo: "Expedición Isla Lagartija", subtitulo: "Ruta histórica al naufragio Vapor Valparaíso y expedición submarina.", precioAntesIndividual: "$140.000", precioIndividual: "$119.000", detalleIvaIndividual: "Neto $100.000 + IVA $19.000 • Valor promocional", precioAntesDuo: "$238.000", precioDuo: "$225.000", detalleIvaDuo: "Pack 2 Personas • Ahorras $13.000 (IVA Incluido)", destacado: true, icono: "fa-anchor", incluye: ["Traslado marítimo y logística de embarque", "Briefing histórico y técnico del naufragio", "Equipamiento térmico completo + seguridad", "Video y fotografía submarina de la ruta"] }
];

export const FOTOS_GALERIA: string[] = [...generarFotosSpot("chapo", 5), ...generarFotosSpot("riscos", 5), ...generarFotosSpot("lagartija", 5), ...generarFotosSpot("pellaifa", 5), ...generarFotosSpot("maullin", 4)];
