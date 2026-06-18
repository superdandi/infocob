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
      "Hosting y dominio incluidos",
    ],
  },
  {
    title: "Integración de IA",
    description: "Potenciamos tu negocio con inteligencia artificial: automatización, chatbots, análisis y generación de contenido.",
    icon: "Brain",
    items: [
      "Chatbots y asistentes virtuales",
      "Automatización de procesos",
      "Análisis de datos con IA",
      "Generación de contenido automatizada",
    ],
  },
  {
    title: "Productos Digitales",
    description: "Diseñamos y desarrollamos productos digitales a medida: software, plataformas web y herramientas interactivas.",
    icon: "Package",
    items: [
      "Plataformas web interactivas",
      "APIs y servicios backend",
      "Sistemas de gestión de contenido",
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
      "SEO técnico y accesibilidad",
    ],
  },
];

export const stats = [
  { value: "17+", label: "años de experiencia" },
  { value: "30+", label: "proyectos realizados" },
  { value: "2008", label: "desde" },
  { value: "Talca", label: "Chile" },
];
