import { seoLocalPages } from "@/data/seo-local";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalSeoClient from "./LocalSeoClient";

export function generateStaticParams() {
  return seoLocalPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = seoLocalPages.find((p) => p.slug === params.slug);
  if (!page) return { title: "INFOCOB" };
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
    },
  };
}

export default function ZonaPage({ params }: { params: { slug: string } }) {
  const page = seoLocalPages.find((p) => p.slug === params.slug);
  if (!page) return notFound();

  return <LocalSeoClient page={page} />;
}
