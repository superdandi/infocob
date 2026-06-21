export interface CasoExito {
  id: string;
  client: string;
  rubro: string;
  imagen?: string;
  metricas: { valor: string; label: string }[];
  desafio: string;
  solucion: string;
  resultados: string[];
  testimonio: string;
  testimonioAutor: string;
  testimonioCargo: string;
  sitio: string;
  ano: string;
}

export const casosExito: CasoExito[] = [
  {
    id: "buses-villar",
    client: "Buses Villar",
    rubro: "Transporte de personas",
    imagen: "/images/projects/villar.jpg",
    metricas: [
      { valor: "+95%", label: "Consultas por formulario web" },
      { valor: "24/7", label: "Disponibilidad de servicios" },
      { valor: "Talca", label: "Posicionamiento regional" },
    ],
    desafio: "Una empresa de transporte con años de experiencia necesitaba dar el salto digital: pasar del boca a boca a tener presencia web profesional, con información clara de servicios, recorridos y convenios marco.",
    solucion: "Desarrollamos un sitio corporativo en WordPress con diseño moderno y funcional, optimizado para dispositivos móviles y con formulario de cotización directa. Integramos galería de servicios, información de convenios y mapa de cobertura regional.",
    resultados: [
      "Más del 95% de las consultas llegan ahora a través del formulario web",
      "Presencia orgánica en Google Maps y buscadores locales",
      "Visibilidad 24/7 sin depender de llamadas telefónicas",
    ],
    testimonio: "Trabajamos con INFOCOB para el desarrollo de nuestro sitio corporativo. Profesionalismo, rapidez y excelente comunicación. Totalmente recomendados.",
    testimonioAutor: "Manuel Villar",
    testimonioCargo: "Gerente — Buses Villar",
    sitio: "busesvillar.cl",
    ano: "2018",
  },
  {
    id: "acquamar",
    client: "Acquamar",
    rubro: "Tratamiento de aguas",
    imagen: "/images/projects/acquamar.jpg",
    metricas: [
      { valor: "+40%", label: "Leads calificados vía web" },
      { valor: "B2B", label: "Catálogo industrial completo" },
      { valor: "WooCommerce", label: "Ventas online integradas" },
    ],
    desafio: "Una empresa química industrial necesitaba un sitio que no solo mostrara su catálogo de productos sino que permitiera a clientes corporativos consultar disponibilidad y realizar pedidos online, algo poco común en el rubro B2B.",
    solucion: "Creamos un sitio en WordPress con WooCommerce orientado a ventas B2B, con catálogo completo de productos químicos para tratamiento de aguas, carro de compras y sistema de consultas técnicas integrado.",
    resultados: [
      "Aumento del 40% en leads calificados provenientes del sitio web",
      "Clientes corporativos pueden cotizar y pedir online sin intervención telefónica",
      "Posicionamiento regional como referente en tratamiento de aguas",
    ],
    testimonio: "Daniel entendió exactamente lo que necesitábamos para nuestra tienda online. El resultado superó nuestras expectativas y las ventas online crecieron notablemente.",
    testimonioAutor: "Marcelo Valdez",
    testimonioCargo: "CEO — Acquamar",
    sitio: "acquamar.cl",
    ano: "2020",
  },
  {
    id: "amnesia-growshop",
    client: "Amnesia Growshop",
    rubro: "Grow shop",
    imagen: "/images/projects/amnesia.jpg",
    metricas: [
      { valor: "5+ años", label: "De operación y mantención continua" },
      { valor: "Catálogo", label: "Productos visibles 24/7" },
      { valor: "WordPress", label: "Estable y escalable" },
    ],
    desafio: "Un growshop local necesitaba un sitio e-commerce funcional que le permitiera mostrar su catálogo de productos, gestionar stock y recibir pedidos online, con mantención continua para mantenerlo siempre actualizado.",
    solucion: "Implementamos un e-commerce en WordPress con catálogo de productos, gestión de stock y carro de compras. Desde entonces realizamos mantención periódica del sitio, actualización de productos y soporte técnico continuo.",
    resultados: [
      "Más de 5 años de operación ininterrumpida del sitio",
      "Catálogo de productos actualizado permanentemente",
      "Soporte técnico continuo sin cortes de servicio",
    ],
    testimonio: "Llevamos más de 5 años con INFOCOB manteniendo nuestros sistemas. Siempre atentos, rápidos y con soluciones efectivas. Un socio tecnológico de confianza.",
    testimonioAutor: "Amnesia Growshop",
    testimonioCargo: "Fundador — Amnesia Growshop",
    sitio: "amnesiagrowshop.cl",
    ano: "2015",
  },
];
