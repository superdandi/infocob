"use client";

import { useState } from "react";
import { ExternalLink, Archive, Globe, Search, X } from "lucide-react";
import { projects, categories, type Project, type ProjectCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const statusConfig = {
  active: { label: "En línea", dot: "bg-success", hover: "hover:border-success/30" },
  archived: { label: "Archivado", dot: "bg-text-muted", hover: "hover:border-text-muted/30" },
  unknown: { label: "Sin dominio", dot: "bg-text-muted/40", hover: "hover:border-text-muted/20" },
};

function getInitials(name: string): string {
  return name
    .split(/[\s/&]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];
  const initials = getInitials(project.name);
  const hasArchive = project.waybackTimestamp && project.domain;
  const isActive = project.status === "active" && project.domain;

  return (
    <div
      className={cn(
        "glass-card overflow-hidden group transition-all duration-300",
        "hover:translate-y-[-2px]",
        status.hover
      )}
    >
      {/* Placeholder visual con iniciales */}
      <div className="relative h-40 bg-gradient-to-br from-accent/10 via-accent-secondary/5 to-brand/5 flex items-center justify-center overflow-hidden">
        <span className="font-heading text-5xl font-bold text-text/10 select-none">
          {initials}
        </span>
        {/* Circuit decoration */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 400 160" preserveAspectRatio="none">
          <g stroke="#ba112a" strokeWidth="1" fill="none" strokeLinecap="round">
            <path d="M20 20 L80 20 L80 60 L120 60" />
            <path d="M280 100 L320 100 L320 60 L380 60" />
            <path d="M50 120 L100 120 L100 80 L150 80" />
            <circle cx="20" cy="20" r="3" fill="#ba112a" />
            <circle cx="120" cy="60" r="2.5" fill="#ba112a" />
            <circle cx="280" cy="100" r="2" fill="#ba112a" />
            <circle cx="380" cy="60" r="3" fill="#ba112a" />
          </g>
        </svg>
        {isActive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/15 text-success text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            En línea
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-text group-hover:text-accent transition-colors">
            {project.name}
          </h3>
        </div>
        <p className="text-text-muted text-sm mb-1">{project.rubro}</p>
        {project.description && (
          <p className="text-text-muted/60 text-xs leading-relaxed mb-3 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 rounded-md bg-white/5 text-text-muted text-[10px] font-medium"
            >
              {categories.find((c) => c.value === cat)?.label || cat}
            </span>
          ))}
          {project.stack?.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-medium"
            >
              {s}
            </span>
          ))}
          {project.year && (
            <span className="px-2 py-0.5 rounded-md bg-white/[0.03] text-text-muted/50 text-[10px]">
              {project.year}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {isActive && project.domain && (
            <a
              href={`https://${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-white transition-colors"
            >
              <Globe size={12} />
              Visitar sitio
              <ExternalLink size={10} />
            </a>
          )}
          {hasArchive && (
            <a
              href={`https://web.archive.org/web/${project.waybackTimestamp}/${project.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-text-muted hover:text-text transition-colors"
            >
              <Archive size={12} />
              Ver archivo
              <ExternalLink size={10} />
            </a>
          )}
          {project.status === "unknown" && (
            <span className="text-xs text-text-muted/50 flex items-center gap-1">
              <Archive size={12} />
              Sin archivo disponible
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.category.includes(filter);
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.rubro.toLowerCase().includes(search.toLowerCase()) ||
      p.domain?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCount = projects.filter((p) => p.status === "active").length;
  const archivedCount = projects.filter((p) => p.status === "archived").length;
  const unknownCount = projects.filter((p) => p.status === "unknown").length;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-md mx-auto">
        {[
          { label: "En línea", count: activeCount, color: "text-success" },
          { label: "Archivados", count: archivedCount, color: "text-text-muted" },
          { label: "Recuperando", count: unknownCount, color: "text-text-muted/60" },
        ].map((s) => (
          <div key={s.label} className="glass-card py-3 px-2 text-center">
            <div className={cn("font-heading text-2xl font-bold", s.color)}>{s.count}</div>
            <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/50" />
        <input
          type="text"
          placeholder="Buscar proyecto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-border text-text text-sm placeholder:text-text-muted/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
            filter === "all"
              ? "bg-accent text-bg"
              : "glass text-text-muted hover:text-text hover:bg-white/10"
          )}
        >
          Todos ({projects.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              filter === cat.value
                ? "bg-accent text-bg"
                : "glass text-text-muted hover:text-text hover:bg-white/10"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Search size={40} className="mx-auto text-text-muted/20 mb-4" />
          <p className="text-text-muted">No se encontraron proyectos con ese filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={`${project.name}-${project.domain || "nodomain"}`} project={project} />
          ))}
        </div>
      )}

      {filtered.length < projects.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setFilter("all");
              setSearch("");
            }}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
          >
            <X size={14} />
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
