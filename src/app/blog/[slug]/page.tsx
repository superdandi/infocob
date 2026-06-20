"use client";

import { useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { useTranslation } from "@/lib/TranslationsProvider";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { ContentBlock } from "@/data/blog";

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="font-heading text-2xl font-bold text-text mt-10 mb-4"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="font-heading text-xl font-semibold text-text mt-8 mb-3"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          key={index}
          className="text-text-muted leading-relaxed mb-4"
        >
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={index} className="space-y-2 mb-5">
          {block.items.map((item, i) => (
            <li key={i} className="text-text-muted text-sm flex items-start gap-2">
              <span className="text-brand/60 mt-1.5 shrink-0">&#x2022;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <div key={index} className="mt-10 mb-6 glass-card p-6 text-center border-t-2 border-t-brand/20">
          <p className="text-text font-semibold mb-3">
            {index > 0 ? "¿Quieres saber más?" : "¿Te gusta lo que lees?"}
          </p>
          <a
            href="https://wa.me/56982864145"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition-all duration-300 text-sm"
          >
            <MessageCircle size={16} />
            Escríbeme al WhatsApp
          </a>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { t } = useTranslation();

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) document.title = `${post.title} — INFOCOB Blog`;
  }, [post]);

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-text mb-3">
          Artículo no encontrado
        </h1>
        <Link
          href="/blog"
          className="text-accent hover:text-brand transition-colors"
        >
          &larr; Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            {t("blog.volver")}
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-brand/10 text-brand/80 text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-3">
            {post.title}
          </h1>

          <p className="text-text-muted/50 text-sm mb-8">{post.date}</p>
        </AnimateOnScroll>

        <article>
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        <AnimateOnScroll>
          <hr className="section-divider my-12" />
          <div className="text-center">
            <p className="text-text-muted text-sm mb-4">
              {t("blog.old-blog-text")}
            </p>
            <a
              href="https://infocob.blogspot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-brand transition-colors"
            >
              infocob.blogspot.com &rarr;
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
