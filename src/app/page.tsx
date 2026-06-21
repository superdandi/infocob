import Hero from "@/components/Hero";
import ClientesCarousel from "@/components/ClientesCarousel";
import ServiciosHome from "@/components/ServiciosHome";
import CasosExito from "@/components/CasosExito";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function HomePage() {
  return (
    <>
      <AnimateOnScroll><Hero /></AnimateOnScroll>
      <AnimateOnScroll><ClientesCarousel /></AnimateOnScroll>
      <hr className="section-divider" />
      <AnimateOnScroll><ServiciosHome /></AnimateOnScroll>
      <hr className="section-divider" />
      <AnimateOnScroll><CasosExito /></AnimateOnScroll>
      <hr className="section-divider" />
      <AnimateOnScroll><TestimonialsSection /></AnimateOnScroll>
      <hr className="section-divider" />
      <AnimateOnScroll><CtaSection /></AnimateOnScroll>
    </>
  );
}