export type AuditCategory = {
  id: string;
  questions: { text: string; peso: number }[];
  serviceIdx: number;
};

export const auditCategories: AuditCategory[] = [
  {
    id: "diseno",
    serviceIdx: 0,
    questions: [
      { text: "Tu sitio se ve profesional y actualizado", peso: 4 },
      { text: "Los colores y tipografía son consistentes en todas las páginas", peso: 3 },
      { text: "Tiene un logo y una identidad visual clara", peso: 4 },
      { text: "Las imágenes se ven bien y no están pixeladas", peso: 4 },
    ],
  },
  {
    id: "velocidad",
    serviceIdx: 3,
    questions: [
      { text: "Tu sitio carga en menos de 3 segundos", peso: 5 },
      { text: "Las imágenes están optimizadas (no pesan demasiado)", peso: 4 },
      { text: "No notas demoras al navegar entre páginas", peso: 3 },
      { text: "Tu sitio funciona bien incluso con internet lento", peso: 3 },
    ],
  },
  {
    id: "seo",
    serviceIdx: 3,
    questions: [
      { text: "Tu sitio aparece en Google cuando buscan tu negocio", peso: 5 },
      { text: "Tienes un título y descripción distintos en cada página", peso: 4 },
      { text: "Las URLs de tu sitio son limpias y descriptivas", peso: 3 },
      { text: "Tienes Google Analytics o similar instalado", peso: 4 },
      { text: "Tu sitio está indexado en Google Search Console", peso: 4 },
    ],
  },
  {
    id: "conversion",
    serviceIdx: 0,
    questions: [
      { text: "Tu sitio tiene un botón o número de contacto visible", peso: 5 },
      { text: "Es fácil para un cliente pedir un presupuesto o cotizar", peso: 5 },
      { text: "Tienes un call-to-action claro en cada página", peso: 4 },
      { text: "Tu sitio funciona como canal de ventas (no solo informativo)", peso: 4 },
      { text: "Sabes cuántas personas contactan desde tu web al mes", peso: 2 },
    ],
  },
  {
    id: "mobile",
    serviceIdx: 0,
    questions: [
      { text: "Tu sitio se ve bien en celular", peso: 5 },
      { text: "Los botones y enlaces son fáciles de tocar con el dedo", peso: 4 },
      { text: "El texto se lee sin hacer zoom", peso: 3 },
      { text: "Las imágenes y videos se adaptan al tamaño de pantalla", peso: 3 },
    ],
  },
  {
    id: "contenido",
    serviceIdx: 2,
    questions: [
      { text: "Tu sitio explica claramente qué haces", peso: 4 },
      { text: "Tienes información de contacto completa", peso: 4 },
      { text: "El contenido se actualiza al menos cada 3 meses", peso: 3 },
      { text: "Tienes testimonios o casos de éxito visibles", peso: 4 },
    ],
  },
  {
    id: "tecnologia",
    serviceIdx: 4,
    questions: [
      { text: "Tu sitio usa HTTPS (candado verde en el navegador)", peso: 5 },
      { text: "No has visto mensajes de error o páginas rotas", peso: 4 },
      { text: "Tu dominio y hosting están al día (sin vencimientos)", peso: 3 },
      { text: "Sabes quién y cómo hace mantención de tu sitio", peso: 3 },
    ],
  },
];
