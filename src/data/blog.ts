export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cta" };

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "guia-crear-pagina-web-profesional-talca",
    title: "Guía para crear una página web profesional en Talca",
    date: "2026-06-15",
    excerpt:
      "Todo lo que necesitas saber para dar el salto digital: dominio, hosting, diseño y por qué importa tener un sitio hecho como corresponde.",
    tags: ["diseño web", "Talca", "emprendedores"],
    content: [
      {
        type: "p",
        text: "Hace unos días me llamó un cliente de Talca. Tenía un negocio de muebles, bien puesto en redes sociales, pero me decía: «Daniel, la gente me pregunta si tengo página web y yo les paso el link de Instagram. ¿Está bien eso?». La respuesta corta es no, no está bien. Y acá voy a explicar por qué y cómo solucionarlo.",
      },
      {
        type: "h2",
        text: "¿Por qué necesitas una página web si ya tienes redes sociales?",
      },
      {
        type: "p",
        text: "Las redes sociales son como arrendar un local en un mall. Funciona mientras el mall esté abierto y mientras a los dueños del mall les convenga tenerte ahí. Tu página web es como tener tu propio local, con tu propia dirección, abierto 24/7, sin que nadie te cambie las reglas de la noche a la mañana.",
      },
      {
        type: "p",
        text: "Además, un sitio web bien hecho te da credibilidad. Hoy día, si alguien busca un servicio o producto en Talca y no encuentra tu página, probablemente termine llamando a la competencia. Así de simple.",
      },
      {
        type: "h2",
        text: "Los 3 pilares de una página web profesional",
      },
      {
        type: "h3",
        text: "1. Dominio propio",
      },
      {
        type: "p",
        text: "Nada de «minegocio.wordpress.com» o «marcasitio.wixsite.com». Un dominio propio (.cl, .com, lo que corresponda) cuesta entre $10.000 y $15.000 al año y es la dirección de tu negocio en internet. Es lo primero que debes tener.",
      },
      {
        type: "h3",
        text: "2. Hosting confiable",
      },
      {
        type: "p",
        text: "El hosting es donde vive tu página. Si el hosting es malo, tu sitio va a cargar lento, se va a caer seguido y Google lo va a castigar en los resultados de búsqueda. No necesita ser el más caro, pero sí confiable. En INFOCOB incluimos hosting con cada sitio web justamente para evitar estos dolores de cabeza.",
      },
      {
        type: "h3",
        text: "3. Diseño pensado en conversión",
      },
      {
        type: "p",
        text: "No se trata solo de que se vea bonito. Un sitio web profesional está diseñado para que el visitante encuentre rápido lo que busca y termine haciendo lo que tú quieres: contactarte, comprar, pedir una cotización. Eso se logra con una estructura clara, llamados a la acción visibles y un diseño que funcione bien en celular (que es donde la mayoría de la gente navega hoy).",
      },
      {
        type: "h2",
        text: "¿Y cuánto tiempo toma tenerlo listo?",
      },
      {
        type: "p",
        text: "Un sitio web sencillo ( landing page o sitio corporativo de 4 a 6 páginas ) puede estar listo en una semana, dependiendo de qué tan claro tengas el contenido. Si partes de cero y hay que definir textos, fotos y estructura, puede tomar dos o tres semanas. Pero créeme, una vez que lo tienes, dejas de depender de las redes sociales y empiezas a construir algo tuyo.",
      },
      {
        type: "p",
        text: "Si estás en Talca o la Región del Maule y quieres conversar sobre tu proyecto, escríbeme. No importa si todavía no tienes claro qué necesitas —a veces una conversación aclara más que dar vueltas solo.",
      },
      {
        type: "cta",
      },
    ],
  },
  {
    slug: "sitio-web-vs-redes-sociales",
    title: "Sitio web vs Redes Sociales: ¿qué necesita tu negocio?",
    date: "2026-06-12",
    excerpt:
      "¿Es suficiente con Facebook e Instagram o vale la pena invertir en un sitio web? Analizamos los pros y contras de cada opción.",
    tags: ["redes sociales", "sitio web", "marketing digital"],
    content: [
      {
        type: "p",
        text: "Me ha pasado muchas veces: un cliente llega diciendo que con el Facebook y el Instagram le basta, que para qué quiere una página web si ahí ya publica sus fotos y la gente le escribe. Y en parte tiene razón, pero solo en parte. Vamos por partes.",
      },
      {
        type: "h2",
        text: "Lo bueno de las redes sociales",
      },
      {
        type: "p",
        text: "Son gratuitas (en dinero), fáciles de usar y te permiten llegar mucha gente rápido si sabes usar los algoritmos. Además, la gente ya está ahí, no tiene que hacer un esfuerzo extra para encontrarte. Para un negocio que recién parte, tener presencia en redes sociales es mejor que no tener nada. Eso es indiscutible.",
      },
      {
        type: "h2",
        text: "Lo malo de depender solo de redes sociales",
      },
      {
        type: "list",
        items: [
          "No eres dueño de nada: si Facebook cambia el algoritmo, tu alcance se desploma. Si te cierran la cuenta, pierdes todo. Pasa más seguido de lo que crees.",
          "Tu contenido compite con entretenimiento: la gente abre Instagram para distraerse, no para buscar servicios. Tu publicación sobre tu taller mecánico compite con memes, videos de gatitos y recetas de cocina.",
          "No hay personalización: una página web puedes adaptarla completamente a tu negocio, mostrar tus productos como tú quieras, contar tu historia a tu manera. En redes sociales todos tenemos la misma cajita cuadrada.",
          "El SEO no existe en redes: cuando alguien busca \"mecánico Talca\" en Google, tu perfil de Instagram no va a aparecer. Tu página web sí, si está bien hecha.",
        ],
      },
      {
        type: "h2",
        text: "¿Entonces qué conviene más?",
      },
      {
        type: "p",
        text: "Las dos cosas. No es una guerra. Las redes sociales son excelentes para mantener contacto con tus clientes, mostrar el día a día, promocionar ofertas. El sitio web es tu base, tu casa digital, el lugar al que llegas desde Google y desde donde la gente te conoce en serio.",
      },
      {
        type: "p",
        text: "Un buen flujo es: la gente te encuentra por Google gracias a tu sitio web → visita tu página → ve tus servicios → te escribe por WhatsApp o te sigue en redes para estar al tanto. O al revés: te siguen en redes → quieren saber más → entran a tu sitio web → te contactan.",
      },
      {
        type: "p",
        text: "Una cosa alimenta a la otra. Pero si solo tienes redes sociales, estás dejando fuera a todos los que buscan en Google. Y créeme, son muchos.",
      },
      {
        type: "cta",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-crear-pagina-web-chile",
    title: "¿Cuánto cuesta crear una página web en Chile?",
    date: "2026-06-10",
    excerpt:
      "Una mirada realista a los precios del desarrollo web en Chile: desde lo básico hasta lo profesional, sin letra chica y con ejemplos concretos.",
    tags: ["precios", "desarrollo web", "Chile"],
    content: [
      {
        type: "p",
        text: "Esta es probablemente la pregunta que más recibo. Y es lógico: nadie quiere pagar de más ni tampoco salir con un sitio que no sirve. El problema es que el mundo del desarrollo web está lleno de opciones y los precios varían tanto que uno no sabe por dónde empezar. Acá te doy una mirada honesta de lo que cuestan las cosas hoy en Chile.",
      },
      {
        type: "h2",
        text: "La categoría \"gratis\" (no recomendada)",
      },
      {
        type: "p",
        text: "Existen plataformas como Wix, WordPress.com gratuito o Blogger donde puedes tener un sitio sin pagar un peso. ¿El problema? Tu sitio tendrá publicidad de ellos, la dirección será algo como «tumarca.wixsite.com» (poco profesional) y las opciones de personalización serán limitadas. Sirve para probar, pero no para un negocio en serio.",
      },
      {
        type: "h2",
        text: "Sitio web básico: desde $250.000",
      },
      {
        type: "p",
        text: "Esto incluye un diseño simple, entre 3 y 5 páginas (inicio, servicios, contacto, sobre nosotros, etc.), optimización para celulares y formulario de contacto. Es ideal para un emprendimiento que recién parte o un profesional independiente que quiere tener presencia en internet sin demasiada complejidad.",
      },
      {
        type: "h2",
        text: "Sitio web profesional: desde $500.000",
      },
      {
        type: "p",
        text: "Acá entramos en terreno más serio. El diseño es a medida, la navegación está pensada para convertir visitantes en clientes, se optimiza la velocidad de carga, el SEO (posicionamiento en Google) y se integran herramientas como WhatsApp, Google Maps, formularios avanzados y más páginas según lo que necesites. Esto es lo que ofrezco en INFOCOB, y la mayoría de mis clientes elige esta opción porque nota la diferencia.",
      },
      {
        type: "h2",
        text: "Tienda online / e-commerce: desde $800.000",
      },
      {
        type: "p",
        text: "Si quieres vender por internet, necesitas un carro de compras, pasarela de pago, stock de productos, etc. Es más complejo y por lo tanto más caro. Pero también te abre un canal de ventas completamente nuevo.",
      },
      {
        type: "h2",
        text: "¿Y los gastos mensuales?",
      },
      {
        type: "p",
        text: "Además del desarrollo inicial, un sitio web tiene costos mensuales o anuales: hosting (entre $3.000 y $15.000 mensuales), dominio ($10.000 a $15.000 anuales) y, si contratas mantención, un extra para mantenerlo actualizado y seguro. En INFOCOB incluyo hosting y dominio el primer año con cada proyecto, justo para que no tengas que preocuparte de esos detalles mientras ves resultados.",
      },
      {
        type: "h2",
        text: "¿Conclusión?",
      },
      {
        type: "p",
        text: "Un sitio web barato sale caro. He visto decenas de casos de clientes que gastaron $100.000 en un sitio hecho rápido y a los pocos meses estaban pagando mucho más para arreglar problemas de rendimiento, seguridad o simplemente porque el diseño no convertía. Invertir bien desde el principio te ahorra plata, tiempo y dolores de cabeza.",
      },
      {
        type: "cta",
      },
    ],
  },
  {
    slug: "chatbot-automatizar-ventas-whatsapp",
    title: "Cómo un chatbot puede automatizar tus ventas en WhatsApp",
    date: "2026-06-08",
    excerpt:
      "Aprende cómo un asistente inteligente puede responder clientes, calificar leads y cerrar ventas mientras tú te dedicas a lo importante.",
    tags: ["chatbot", "WhatsApp", "automatización", "IA"],
    content: [
      {
        type: "p",
        text: "Hace unas semanas un cliente me dijo: «Daniel, estoy harto de contestar el mismo mensaje veinte veces al día. ¿Cuánto cuesta el servicio?, ¿tienen stock?, ¿hacen envíos?». Y ahí pensé: esto es exactamente para lo que sirve un chatbot. No para reemplazar a las personas, sino para liberarlas de lo repetitivo.",
      },
      {
        type: "h2",
        text: "¿Qué es un chatbot y por qué debería importarte?",
      },
      {
        type: "p",
        text: "Un chatbot es un programa que conversa con tus clientes por ti. Puede responder preguntas frecuentes, tomar pedidos, agendar horas e incluso calificar si un cliente es un lead calificado o no. Hoy en día, con la inteligencia artificial, los chatbots son mucho más inteligentes que antes: entienden lo que el cliente pregunta aunque esté mal escrito y pueden mantener una conversación natural.",
      },
      {
        type: "h2",
        text: "¿Qué puede hacer un chatbot en tu negocio?",
      },
      {
        type: "list",
        items: [
          "Responder al instante: mientras tú duermes, comes o atiendes a otro cliente, el chatbot sigue contestando. La gente odia esperar, y un chatbot responde en segundos.",
          "Calificar leads: el chatbot puede preguntar qué necesita el cliente, de dónde es, cuál es su presupuesto, y si cumple con tus criterios, te pasa el contacto directamente a ti para que cierres la venta.",
          "Agendar reuniones: integrado con un calendario, el chatbot puede agendar llamadas o visitas sin que tengas que estar coordinando de ida y vuelta.",
          "Mostrar catálogo: el chatbot puede enviar fotos, precios y disponibilidad de productos al instante. El cliente no tiene que esperar a que le respondas.",
        ],
      },
      {
        type: "h2",
        text: "¿Es difícil implementarlo?",
      },
      {
        type: "p",
        text: "Para el usuario final es tan simple como escribir un WhatsApp. Del lado técnico, hoy en día configurar un chatbot básico toma un par de días, no semanas ni meses. Y lo mejor es que se puede empezar con algo simple e ir agregando funciones con el tiempo. No necesitas tener todo resuelto desde el día uno.",
      },
      {
        type: "h2",
        text: "El mejor argumento de venta",
      },
      {
        type: "p",
        text: "Si me preguntas a mí, la mejor forma de entender un chatbot es usarlo. Por eso en INFOCOB tengo un chatbot funcionando en mi propio sitio web. Así los clientes pueden ver cómo funciona antes siquiera de preguntar por él. Si te interesa, escríbeme y te muestro cómo podría funcionar uno para tu negocio.",
      },
      {
        type: "cta",
      },
    ],
  },
];
