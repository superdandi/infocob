export type LocalSeoPage = {
  slug: string;
  keyword: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  heroDesc: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
  faqs: { q: string; a: string }[];
};

export const seoLocalPages: LocalSeoPage[] = [
  {
    slug: "diseno-web-talca",
    keyword: "diseño web Talca",
    h1: "Diseño Web en Talca",
    metaTitle: "Diseño Web Talca | INFOCOB — Sitios web profesionales",
    metaDesc: "Diseño de sitios web en Talca y la Región del Maule. Landing pages, e-commerce y plataformas digitales con IA. Cotiza tu proyecto hoy.",
    heroDesc:
      "Creación de sitios web modernos y funcionales en Talca. Desde landing pages hasta tiendas online completas, con hosting y dominio incluido el primer año.",
    sections: [
      {
        title: "¿Por qué tener un sitio web en Talca?",
        paragraphs: [
          "Talca es el corazón de la Región del Maule. Cada vez más personas buscan servicios y productos en línea, y si tu negocio no aparece en Google, estás perdiendo clientes. Un sitio web profesional te da visibilidad las 24 horas, los 7 días de la semana.",
          "En INFOCOB llevamos más de 17 años desarrollando sitios web para empresas y emprendedores de Talca y toda la región. Sabemos lo que funciona acá: diseños que conectan con el público local, optimizados para aparecer en los buscadores y preparados para crecer con tu negocio.",
        ],
      },
      {
        title: "¿Qué incluye nuestro servicio de diseño web?",
        paragraphs: [
          "Cada proyecto incluye diseño responsive (se ve perfecto en celular, tablet y computador), optimización de velocidad, SEO básico para que te encuentren en Google, formulario de contacto integrado con WhatsApp, y hosting con dominio .cl sin costo el primer año.",
          "Además, podemos agregar funcionalidades extra como blog, panel administrador, chatbot con inteligencia artificial como el de este sitio, y conexión con redes sociales. Todo pensado para que tengas una presencia digital profesional sin complicaciones.",
        ],
      },
    ],
    faqs: [
      { q: "¿Cuánto cuesta un sitio web en Talca?", a: "Nuestros planes parten desde $250.000 para un sitio básico, $450.000 para un sitio profesional con blog y chatbot IA, y desde $700.000 para una tienda online completa. Todos incluyen hosting y dominio .cl el primer año." },
      { q: "¿Cuánto tiempo demora desarrollar un sitio web?", a: "Depende del plan: un sitio básico lo entregamos en 5-7 días, un sitio profesional en 10-14 días, y un e-commerce en 2-4 semanas. Trabajamos con tiempos claros y cumplimos." },
      { q: "¿Necesito conocimientos técnicos para administrar mi sitio?", a: "No. Si elegís un plan con panel administrador, podés modificar textos e imágenes vos mismo. Si no, nos encargamos nosotros de las actualizaciones. También ofrecemos mantención mensual desde $10.000." },
    ],
  },
  {
    slug: "pagina-web-maule",
    keyword: "página web Maule",
    h1: "Páginas Web en la Región del Maule",
    metaTitle: "Página Web Maule | INFOCOB — Sitios web en la Región del Maule",
    metaDesc: "Creación de páginas web en la Región del Maule: Talca, Curicó, Linares, Cauquenes, Constitución. Diseño, desarrollo y mantención de sitios web profesionales.",
    heroDesc:
      "Desarrollamos páginas web para empresas y emprendedores de toda la Región del Maule. Presencia digital profesional con diseños modernos, optimizados para SEO y adaptados a cualquier dispositivo.",
    sections: [
      {
        title: "Presencia digital para el Maule",
        paragraphs: [
          "La Región del Maule está creciendo, y tener una página web ya no es un lujo, es una necesidad. Desde Talca hasta Curicó, pasando por Linares, Cauquenes y Constitución, cada vez más personas buscan negocios en internet antes de comprar o contratar un servicio.",
          "Trabajamos con clientes de toda la región, presencial y remoto. Nuestros sitios web están diseñados para destacar tu negocio en los resultados de búsqueda locales, con contenido optimizado para que los clientes del Maule te encuentren fácilmente.",
        ],
      },
      {
        title: "Servicios web para toda la región",
        paragraphs: [
          "Ofrecemos soluciones completas: diseño y desarrollo de páginas web, integración de inteligencia artificial (chatbots, automatización), productos digitales a medida, consultoría técnica y soporte informático tanto presencial como remoto en toda la Región del Maule.",
          "Todos nuestros planes incluyen hosting y dominio .cl sin costo el primer año, diseño adaptable a celulares, optimización para motores de búsqueda, y soporte directo conmigo. Sin intermediarios, sin vueltas.",
        ],
      },
    ],
    faqs: [
      { q: "¿Hacen páginas web para empresas en Curicó?", a: "Sí. Trabajamos de forma remota con clientes de toda la región, incluyendo Curicó, Linares, Cauquenes y Constitución. Podemos reunirnos presencialmente en Talca o hacer todo online." },
      { q: "¿Ofrecen mantención de sitios web en el Maule?", a: "Sí. Tenemos planes de mantención mensual desde $10.000 que incluyen actualizaciones de contenido, revisiones de seguridad, backups y soporte técnico." },
      { q: "¿Cuánto cuesta una página web profesional en la Región del Maule?", a: "Los precios parten desde $250.000 para un sitio básico y $450.000 para un sitio profesional con blog e IA. Todos incluyen hosting y dominio .cl el primer año sin costo adicional." },
    ],
  },
  {
    slug: "desarrollo-web-talca",
    keyword: "desarrollo web Talca",
    h1: "Desarrollo Web en Talca",
    metaTitle: "Desarrollo Web Talca | INFOCOB — Programación y desarrollo de sitios web",
    metaDesc: "Desarrollo web en Talca: sitios con Next.js, React, e-commerce, APIs, chatbots con IA. Soluciones digitales modernas para tu negocio. Cotiza online.",
    heroDesc:
      "Desarrollo de sitios web y aplicaciones con tecnología moderna. Next.js, React, Node.js, APIs, integración de inteligencia artificial. Soluciones robustas y escalables para tu negocio en Talca.",
    sections: [
      {
        title: "Tecnología moderna para tu negocio",
        paragraphs: [
          "No todos los sitios web son iguales. Un desarrollo profesional con tecnologías modernas como Next.js y React marca la diferencia en velocidad, seguridad y posibilidades de crecimiento. En INFOCOB usamos herramientas actualizadas para que tu sitio no se quede atrás.",
          "Además del desarrollo tradicional, integramos inteligencia artificial en los proyectos: chatbots inteligentes como el que ves funcionando en este sitio, automatización de procesos y análisis de datos. Tu negocio merece tecnología que sí funcione.",
        ],
      },
      {
        title: "¿Qué tecnologías usamos?",
        paragraphs: [
          "Trabajamos con Next.js, React, TypeScript, Node.js, bases de datos modernas y servicios en la nube. Para sitios más simples usamos HTML, CSS y JavaScript puro, sin frameworks pesados innecesarios. Elegimos la tecnología según el proyecto, no al revés.",
          "Ofrecemos también migración de sitios antiguos a tecnologías modernas, optimización de rendimiento, y desarrollo de APIs y servicios backend. Todo el desarrollo se hace pensando en que sea fácil de mantener y escalar en el futuro.",
        ],
      },
    ],
    faqs: [
      { q: "¿Usan plantillas prediseñadas o hacen desarrollo a medida?", a: "Hacemos desarrollo a medida según las necesidades de cada proyecto. No usamos plantillas genéricas. Cada sitio se diseña y programa desde cero pensando en tu negocio y tus objetivos." },
      { q: "¿Pueden migrar mi sitio viejo a tecnología nueva?", a: "Sí. Ofrecemos servicios de migración a tecnologías modernas. Recuperamos el diseño actual o lo renovamos, y lo pasamos a una plataforma más rápida, segura y fácil de mantener." },
      { q: "¿Ofrecen soporte técnico después de entregar el sitio?", a: "Sí, ofrecemos mantención mensual desde $10.000 que incluye actualizaciones, backups, monitoreo de seguridad y soporte técnico. También podés contratar soporte por evento si preferís." },
    ],
  },
  {
    slug: "crear-sitio-web-chile",
    keyword: "crear sitio web Chile",
    h1: "Crear un Sitio Web en Chile",
    metaTitle: "Crear Sitio Web Chile | INFOCOB — Desarrollo web en todo Chile",
    metaDesc: "Creá tu sitio web en Chile con INFOCOB. Diseño, desarrollo, hosting y dominio incluido. Presupuesto online sin compromiso. Atención remota en todo Chile.",
    heroDesc:
      "Creá tu sitio web desde cero con nosotros. Te acompañamos en todo el proceso: diseño, desarrollo, hosting, dominio y mantención. Atención remota en todo Chile con 17 años de experiencia.",
    sections: [
      {
        title: "Tu sitio web, de principio a fin",
        paragraphs: [
          "Crear un sitio web puede parecer complicado, pero con INFOCOB es simple. Te explicamos cada paso, te recomendamos el plan que mejor se ajusta a tu presupuesto y nos encargamos de todo: diseño, programación, hosting, dominio y puesta en marcha.",
          "Trabajamos con clientes de todo Chile de forma remota. Desde Arica hasta Punta Arenas, hemos desarrollado proyectos para emprendedores, PyMEs y grandes empresas. No importa dónde estés, tu sitio web puede estar listo en días.",
        ],
      },
      {
        title: "¿Qué necesitás para empezar?",
        paragraphs: [
          "Solo tu idea. Nosotros nos encargamos del resto. Te pedimos información básica: rubro de tu negocio, objetivos del sitio, páginas que necesitás y si tenés referencias de diseño que te gusten. Con eso armamos una propuesta y te cotizamos sin compromiso.",
          "Una vez aprobado el presupuesto, te mantenemos informado en cada etapa. Te mostramos avances, hacés correcciones, y cuando está todo ok, lo publicamos. Después podés elegir entre mantenerlo vos mismo o contratar nuestra mantención mensual.",
        ],
      },
    ],
    faqs: [
      { q: "¿Venden hosting y dominio?", a: "Sí, todos nuestros planes incluyen hosting y dominio .cl sin costo el primer año. Después de eso, la renovación es de aproximadamente $30.000 anuales." },
      { q: "¿Puedo ver mi sitio antes de publicarlo?", a: "Sí. Te damos un enlace temporal para que veas el avance en vivo. Podés pedir cambios hasta que quede exactamente como querés. Solo publicamos cuando vos das el visto bueno." },
      { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos transferencia bancaria, depósito y efectivo. Para proyectos más grandes podemos coordinar pagos en cuotas. Todo queda documentado con boleta." },
    ],
  },
];
