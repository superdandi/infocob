export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Trabajamos con INFOCOB para el desarrollo de nuestro sitio corporativo. Profesionalismo, rapidez y excelente comunicación. Totalmente recomendados.",
    author: "Claudio Muñoz",
    role: "Gerente — Transportes Villar",
  },
  {
    quote: "Daniel entendió exactamente lo que necesitábamos para nuestra tienda online. El resultado superó nuestras expectativas y las ventas online crecieron notablemente.",
    author: "Andrea Vargas",
    role: "Directora — Clínica Dental Andrea Vargas",
  },
  {
    quote: "Llevamos más de 5 años con INFOCOB manteniendo nuestros sistemas. Siempre atentos, rápidos y con soluciones efectivas. Un socio tecnológico de confianza.",
    author: "Pablo Gutiérrez",
    role: "Administrador — Red de Salud Maule",
  },
];
