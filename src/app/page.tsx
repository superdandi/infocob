import Hero from "@/components/Hero";
import ServiciosHome from "@/components/ServiciosHome";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function HomePage() {
  return (
    <>
      <AnimateOnScroll><Hero /></AnimateOnScroll>
      <AnimateOnScroll><ServiciosHome /></AnimateOnScroll>
      <AnimateOnScroll><TestimonialsSection /></AnimateOnScroll>
      <AnimateOnScroll><CtaSection /></AnimateOnScroll>
    </>
  );
}