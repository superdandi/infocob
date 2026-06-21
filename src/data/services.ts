export interface Service {
  title: string;
  description: string;
  items?: string[];
  icon: string;
}

export const servicios: Service[] = [
  {
    title: "Desarrollo Web",
    description: "Creamos sitios web modernos, rápidos y optimizados para conversión. Desde landing pages hasta aplicaciones web completas.",
    icon: "Globe",
    items: [
      "Landing pages y sitios corporativos",
      "Aplicaciones web con Next.js, React",
      "E-commerce con tecnología moderna",
    ],
  },
  {
    title: "Integración de IA",
    description: "Potenciamos tu negocio con inteligencia artificial: chatbots como el de este sitio, automatización y análisis de datos.",
    icon: "Brain",
    items: [
      "Chatbots con IA (como el asistente de este sitio)",
      "Automatización de procesos con IA",
      "Análisis de datos e informes inteligentes",
    ],
  },
  {
    title: "Productos Digitales",
    description: "Diseñamos y desarrollamos productos digitales a medida: software, plataformas web y herramientas interactivas.",
    icon: "Package",
    items: [
      "Plataformas web interactivas",
      "APIs y servicios backend",
      "Aplicaciones progresivas (PWA)",
    ],
  },
  {
    title: "Consultoría Técnica",
    description: "Asesoría en arquitectura web, tecnologías modernas, migraciones y optimización de rendimiento.",
    icon: "Lightbulb",
    items: [
      "Arquitectura de software",
      "Migración a tecnologías modernas",
      "Optimización de rendimiento web",
    ],
  },
  {
    title: "Soporte Técnico",
    description: "Mantención, soporte y administración de equipos, redes y sitios web para que tu negocio funcione sin interrupciones.",
    icon: "Wrench",
    items: [
      "Mantención de sitios web y hosting",
      "Soporte técnico informático presencial y remoto",
      "Instalación y configuración de software",
    ],
  },
];

export const stats = [
  { value: "17+", label: "años de experiencia" },
  { value: "45+", label: "proyectos realizados" },
  { value: "2008", label: "desde" },
  { value: "Talca", label: "Chile" },
];
