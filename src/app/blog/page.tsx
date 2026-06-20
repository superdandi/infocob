"use client";

import { useEffect } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { useTranslation } from "@/lib/TranslationsProvider";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function BlogPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("meta.blog");
  }, [t]);

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
              {t("blog.title")}
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              {t("blog.subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <AnimateOnScroll key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="glass-card p-6 sm:p-8 block group transition-all duration-300 hover:translate-y-[-2px] hover:shadow-brand/10"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-brand/10 text-brand/80 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-heading font-bold text-lg text-text group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted/50 text-xs">{post.date}</span>
                  <span className="text-accent text-sm font-medium group-hover:text-brand transition-colors">
                    {t("blog.leer-mas")} &rarr;
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="mt-16 glass-card p-8 text-center">
            <p className="text-text-muted text-sm mb-3">
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
