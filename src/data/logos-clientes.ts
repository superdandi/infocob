export interface LogoCliente {
  nombre: string;
  rubro: string;
  imagen: string;
}

export const logosClientes: LogoCliente[] = [
  { nombre: "Buses Villar", rubro: "Transporte", imagen: "/images/projects/villar.jpg" },
  { nombre: "Acquamar", rubro: "Tratamiento de aguas", imagen: "/images/projects/acquamar.jpg" },
  { nombre: "Amnesia Growshop", rubro: "Grow shop", imagen: "/images/projects/amnesia.jpg" },
  { nombre: "RCS Propiedades", rubro: "Corretaje", imagen: "/images/projects/rcs.jpg" },
  { nombre: "Huamanciza", rubro: "Seguridad industrial", imagen: "/images/projects/huamanciza.jpg" },
];
