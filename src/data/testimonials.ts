export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  photo?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Trabajamos con INFOCOB para el desarrollo de nuestro sitio corporativo. Profesionalismo, rapidez y excelente comunicación. Totalmente recomendados.",
    author: "Manuel Villar",
    role: "Gerente — Buses Villar",
  },
  {
    quote: "Daniel entendió exactamente lo que necesitábamos para nuestra tienda online. El resultado superó nuestras expectativas y las ventas online crecieron notablemente.",
    author: "Marcelo Valdez",
    role: "CEO — Acquamar",
  },
  {
    quote: "Llevamos más de 5 años con INFOCOB manteniendo nuestros sistemas. Siempre atentos, rápidos y con soluciones efectivas. Un socio tecnológico de confianza.",
    author: "Amnesia Growshop",
    role: "Fundador — Amnesia Growshop",
  },
];
