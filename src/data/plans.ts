export type PlanFeature = {
  text: string;
  included: boolean;
};

export type Plan = {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  idealFor: string;
  maintenance: number;
  delivery: string;
  features: PlanFeature[];
  popular?: boolean;
};

export const planes: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    priceMin: 250000,
    priceMax: 350000,
    idealFor: "Emprendedores, profesionales independientes",
    maintenance: 10000,
    delivery: "5-7 días",
    features: [
      { text: "Landing page o sitio 1 página", included: true },
      { text: "Diseño responsive (celular + tablet + pc)", included: true },
      { text: "SEO básico (meta tags, velocidad)", included: true },
      { text: "Formulario de contacto + WhatsApp", included: true },
      { text: "Hosting 1 año incluido", included: true },
      { text: "Dominio .cl 1 año incluido", included: true },
      { text: "Blog integrado", included: false },
      { text: "Chatbot con IA", included: false },
      { text: "Panel administrador", included: false },
      { text: "E-commerce / tienda online", included: false },
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    priceMin: 450000,
    priceMax: 600000,
    idealFor: "PyMEs, empresas en crecimiento",
    maintenance: 15000,
    delivery: "10-14 días",
    popular: true,
    features: [
      { text: "Landing page o sitio 1 página", included: true },
      { text: "Diseño responsive (celular + tablet + pc)", included: true },
      { text: "SEO completo (meta, velocidad, sitemap, analytics)", included: true },
      { text: "Formulario de contacto + WhatsApp", included: true },
      { text: "Hosting 1 año incluido", included: true },
      { text: "Dominio .cl 1 año incluido", included: true },
      { text: "Blog integrado", included: true },
      { text: "Chatbot con IA básico", included: true },
      { text: "Panel administrador", included: false },
      { text: "E-commerce / tienda online", included: false },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    priceMin: 700000,
    priceMax: 1200000,
    idealFor: "Tiendas online, catálogos digitales",
    maintenance: 25000,
    delivery: "2-4 semanas",
    features: [
      { text: "Landing page o sitio 1 página", included: true },
      { text: "Diseño responsive (celular + tablet + pc)", included: true },
      { text: "SEO completo (meta, velocidad, sitemap, analytics)", included: true },
      { text: "Formulario de contacto + WhatsApp", included: true },
      { text: "Hosting 1 año incluido", included: true },
      { text: "Dominio .cl 1 año incluido", included: true },
      { text: "Blog integrado", included: true },
      { text: "Chatbot con IA avanzado", included: true },
      { text: "Panel administrador", included: true },
      { text: "E-commerce / tienda online + pasarela de pago", included: true },
    ],
  },
];
