"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowRight, Check, X, Download, ChevronLeft, BarChart3 } from "lucide-react";
import { useTranslation } from "@/lib/TranslationsProvider";
import { auditCategories } from "@/data/audit";
import { servicios } from "@/data/services";

type Answers = Record<string, boolean>;

function getScoreLabel(score: number, max: number, t: (k: string) => string) {
  const pct = score / max;
  if (pct < 0.35) return t("auditoria.resultado-label-0");
  if (pct < 0.6) return t("auditoria.resultado-label-1");
  if (pct < 0.85) return t("auditoria.resultado-label-2");
  return t("auditoria.resultado-label-3");
}

function getScoreColor(pct: number) {
  if (pct < 0.35) return "text-red-400";
  if (pct < 0.6) return "text-orange-400";
  if (pct < 0.85) return "text-yellow-400";
  return "text-green-400";
}

function getBarColor(pct: number) {
  if (pct < 0.35) return "bg-red-500";
  if (pct < 0.6) return "bg-orange-500";
  if (pct < 0.85) return "bg-yellow-500";
  return "bg-green-500";
}

async function generatePdf(
  answers: Answers,
  score: number,
  max: number,
  categoryScores: { id: string; pct: number }[],
  t: (k: string, vars?: Record<string, string | number>) => string,
  nombre: string,
  email: string
) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const brand = "#ba112a";
  const accent = "#6ee7b7";
  const dark = "#111827";

  doc.setFillColor(11, 13, 23);
  doc.rect(0, 0, 210, 297, "F");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("INFOCOB", 20, 30);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("Auditoría de sitio web", 20, 38);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...accent.match(/\w\w/g)!.map((h) => parseInt(h, 16)));
  doc.text(`Puntaje: ${score}/${max}`, 20, 55);

  const pct = score / max;
  const label = getScoreLabel(score, max, t);
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(label, 20, 65);

  const barW = 170;
  const barH = 6;
  doc.setFillColor(55, 65, 81);
  doc.roundedRect(20, 72, barW, barH, 2, 2, "F");
  let barColor: [number, number, number] = [239, 68, 68];
  if (pct >= 0.35) barColor = [249, 115, 22];
  if (pct >= 0.6) barColor = [234, 179, 8];
  if (pct >= 0.85) barColor = [34, 197, 94];
  doc.setFillColor(...barColor);
  doc.roundedRect(20, 72, barW * pct, barH, 2, 2, "F");

  let y = 90;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Desglose por categoría", 20, y);
  y += 8;

  for (const cs of categoryScores) {
    const catLabel = t(`cat-${cs.id}`);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text(catLabel, 20, y);

    doc.setFillColor(55, 65, 81);
    doc.roundedRect(80, y - 3, 110, 4, 1, 1, "F");
    let cb: [number, number, number] = [239, 68, 68];
    if (cs.pct >= 0.35) cb = [249, 115, 22];
    if (cs.pct >= 0.6) cb = [234, 179, 8];
    if (cs.pct >= 0.85) cb = [34, 197, 94];
    doc.setFillColor(...cb);
    doc.roundedRect(80, y - 3, 110 * cs.pct, 4, 1, 1, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...cb);
    doc.text(`${Math.round(cs.pct * 100)}%`, 195, y);
    y += 7;
  }

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Áreas de mejora", 20, y);
  y += 8;

  const weak = categoryScores.filter((cs) => cs.pct < 0.6);
  if (weak.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(34, 197, 94);
    doc.text("¡Tu sitio está en excelente estado!", 20, y);
  } else {
    for (const w of weak) {
      const catLabel = t(`cat-${w.id}`);
      const cat = auditCategories.find((c) => c.id === w.id);
      const service = cat ? servicios[cat.serviceIdx] : null;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...brand.match(/\w\w/g)!.map((h) => parseInt(h, 16)));
      doc.text(`• ${catLabel}`, 20, y);
      y += 5;
      if (service) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(200, 200, 200);
        doc.text(`Solución: ${service.title}`, 25, y);
        y += 5;
      }
      y += 2;
    }
  }

  y += 5;
  if (y > 220) { doc.addPage(); y = 20; }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("¿Querés mejorar tu sitio?", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text("Daniel Cobos — INFOCOB Computación", 20, y); y += 5;
  doc.text("WhatsApp: +56 9 8286 4145", 20, y); y += 5;
  doc.text("Email: dcobosm@gmail.com", 20, y); y += 5;
  doc.text("Talca, Chile", 20, y);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("Este diagnóstico es una evaluación general. Para un plan detallado con presupuesto, contactá a Daniel.", 20, 280);

  doc.save("auditoria-infocob.pdf");
}

export default function SiteAudit() {
  const { t } = useTranslation();
  const [step, setStep] = useState<"start" | "quiz" | "result">("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showDownload, setShowDownload] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [pdfStatus, setPdfStatus] = useState<"idle" | "success" | "error">("idle");
  const downloadRef = useRef<HTMLDivElement>(null);

  const allQuestions = auditCategories.flatMap((cat) =>
    cat.questions.map((q) => ({ text: q.text, peso: q.peso, catId: cat.id }))
  );
  const totalPeso = allQuestions.reduce((s, q) => s + q.peso, 0);
  const totalQuestions = allQuestions.length;

  function setAnswer(v: boolean) {
    setAnswers((prev) => ({ ...prev, [`q${currentQ}`]: v }));
  }

  const score = Object.entries(answers).reduce((s, [k, v]) => {
    const idx = parseInt(k.replace("q", ""));
    return s + (v ? allQuestions[idx].peso : 0);
  }, 0);

  const categoryScores = auditCategories.map((cat) => {
    const catQs = allQuestions
      .map((q, i) => ({ ...q, idx: i }))
      .filter((q) => q.catId === cat.id);
    const catTotal = catQs.reduce((s, q) => s + q.peso, 0);
    const catScore = catQs.reduce((s, q) => s + (answers[`q${q.idx}`] ? q.peso : 0), 0);
    return { id: cat.id, pct: catTotal > 0 ? catScore / catTotal : 0 };
  });

  async function handleDownload() {
    try {
      await generatePdf(answers, score, totalPeso, categoryScores, t, downloadName, downloadEmail);
      setPdfStatus("success");
    } catch {
      setPdfStatus("error");
    }
  }

  const currentCat = auditCategories.find((c) => c.id === allQuestions[currentQ]?.catId);
  const isLast = currentQ >= totalQuestions - 1;

  const needsEmail = score < totalPeso * 0.85;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {step === "start" && (
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-text-muted mb-6">
              <BarChart3 size={12} className="text-accent" />
              {t("auditoria.badge")}
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-text mb-4">
              {t("auditoria.title")}
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
              {t("auditoria.subtitle")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mb-10">
              {auditCategories.map((cat) => (
                <div key={cat.id} className="glass-card py-3 px-2 text-center">
                  <div className="text-[10px] text-text-muted">{t(`cat-${cat.id}`)}</div>
                  <div className="text-sm font-bold text-accent mt-1">{cat.questions.length}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep("quiz")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-bg font-semibold hover:brightness-110 transition-all duration-300 shadow-lg shadow-accent/20"
            >
              {t("auditoria.empezar")}
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === "quiz" && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xs text-text-muted">
                {t("auditoria.pregunta", { current: currentQ + 1, total: totalQuestions })}
              </div>
              {currentCat && (
                <div className="text-[10px] text-text-muted/60">
                  {t("auditoria.categoria", { cat: t(`cat-${currentCat.id}`) })}
                </div>
              )}
            </div>

            <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <div className="glass-card p-8 sm:p-10 text-center">
              <p className="text-xl sm:text-2xl font-heading font-semibold text-text mb-8 leading-relaxed">
                {allQuestions[currentQ].text}
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => { setAnswer(true); if (isLast) setStep("result"); else setCurrentQ((p) => p + 1); }}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    answers[`q${currentQ}`] === true
                      ? "bg-green-500/20 text-green-300 border-2 border-green-500/40"
                      : "glass border border-border text-text hover:bg-white/10"
                  }`}
                >
                  <Check size={16} />
                  {t("auditoria.si")}
                </button>
                <button
                  onClick={() => { setAnswer(false); if (isLast) setStep("result"); else setCurrentQ((p) => p + 1); }}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    answers[`q${currentQ}`] === false
                      ? "bg-red-500/20 text-red-300 border-2 border-red-500/40"
                      : "glass border border-border text-text hover:bg-white/10"
                  }`}
                >
                  <X size={16} />
                  {t("auditoria.no")}
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-text-muted hover:text-text disabled:opacity-30 transition"
              >
                <ChevronLeft size={14} />
                {t("auditoria.anterior")}
              </button>
              {!isLast && (
                <button
                  onClick={() => setCurrentQ((p) => p + 1)}
                  disabled={answers[`q${currentQ}`] === undefined}
                  className="px-4 py-2 rounded-lg text-sm text-text-muted hover:text-text disabled:opacity-30 transition"
                >
                  {t("auditoria.siguiente")}
                </button>
              )}
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="animate-fade-up">
            <div className="glass-card p-8 sm:p-10 text-center mb-6">
              <div className={`font-heading text-5xl sm:text-6xl font-extrabold mb-2 ${getScoreColor(score / totalPeso)}`}>
                {score}/{totalPeso}
              </div>
              <div className="text-lg font-semibold text-text mb-4">
                {getScoreLabel(score, totalPeso, t)}
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-8 max-w-sm mx-auto">
                <div
                  className={`h-full rounded-full ${getBarColor(score / totalPeso)}`}
                  style={{ width: `${(score / totalPeso) * 100}%` }}
                />
              </div>

              <h3 className="font-heading font-semibold text-sm text-text mb-4 uppercase tracking-wider">
                {t("auditoria.resultado-detalle")}
              </h3>
              <div className="space-y-3 text-left max-w-md mx-auto">
                {categoryScores.map((cs) => (
                  <div key={cs.id} className="flex items-center gap-3">
                    <span className="text-xs text-text-muted w-32 shrink-0">{t(`cat-${cs.id}`)}</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getBarColor(cs.pct)}`}
                        style={{ width: `${cs.pct * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold w-8 text-right ${getScoreColor(cs.pct)}`}>
                      {Math.round(cs.pct * 100)}%
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-border/30 my-8" />

              <h3 className="font-heading font-semibold text-sm text-text mb-2 uppercase tracking-wider">
                {t("auditoria.resultado-mejora")}
              </h3>
              <p className="text-xs text-text-muted mb-5">
                {t("auditoria.resultado-mejora-desc")}
              </p>
              <div className="space-y-3 text-left max-w-sm mx-auto">
                {categoryScores.filter((cs) => cs.pct < 0.6).map((cs) => {
                  const cat = auditCategories.find((c) => c.id === cs.id);
                  const svc = cat ? servicios[cat.serviceIdx] : null;
                  return (
                    <div key={cs.id} className="p-3 rounded-lg bg-white/[0.03] border border-border/40 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-text">{t(`cat-${cs.id}`)}</div>
                        {svc && <div className="text-[10px] text-brand/70">{svc.title}</div>}
                      </div>
                      <a
                        href={`https://wa.me/56982864145?text=${encodeURIComponent("Hola Daniel, quiero mejorar " + t(`cat-${cs.id}`) + " de mi sitio web")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition whitespace-nowrap"
                      >
                        {t("auditoria.resultado-solucion")}
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/56982864145?text=${encodeURIComponent("Hola Daniel, hice la auditoría de mi sitio. Saqué " + score + "/" + totalPeso + ". ¿Podemos verlo juntos?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition text-sm"
                >
                  {t("auditoria.resultado-whatsapp")}
                </a>
                <button
                  onClick={() => setShowDownload(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text hover:bg-white/10 transition text-sm"
                >
                  <Download size={14} />
                  PDF
                </button>
                <button
                  onClick={() => { setStep("start"); setCurrentQ(0); setAnswers({}); setShowDownload(false); }}
                  className="text-xs text-text-muted hover:text-text underline"
                >
                  {t("auditoria.reiniciar")}
                </button>
              </div>
            </div>

            {showDownload && (
              <div ref={downloadRef} className="glass-card p-6 sm:p-8 animate-fade-up" id="pdf-download">
                {!needsEmail ? (
                  <div className="text-center">
                    <div className="text-green-400 font-heading text-lg font-bold mb-2">{t("auditoria.descargar-exito")}</div>
                    <button
                      onClick={() => { setDownloadName(""); setDownloadEmail(""); handleDownload(); }}
                      className="px-6 py-3 rounded-xl bg-accent text-bg font-medium hover:brightness-110 transition text-sm"
                    >
                      <Download size={14} className="inline mr-2" />
                      {t("auditoria.descargar-btn")}
                    </button>
                  </div>
                ) : pdfStatus === "success" ? (
                  <div className="text-center">
                    <div className="text-green-400 font-heading text-lg font-bold mb-2">{t("auditoria.descargar-exito")}</div>
                    <p className="text-xs text-text-muted mb-4">auditoria-infocob.pdf</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading font-semibold text-text mb-1">{t("auditoria.descargar-title")}</h3>
                    <p className="text-xs text-text-muted mb-4">{t("auditoria.descargar-desc")}</p>
                    <div className="space-y-3 mb-4">
                      <input
                        type="text"
                        value={downloadName}
                        onChange={(e) => setDownloadName(e.target.value)}
                        placeholder={t("auditoria.descargar-nombre")}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-border text-text placeholder:text-text-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                      <input
                        type="email"
                        value={downloadEmail}
                        onChange={(e) => setDownloadEmail(e.target.value)}
                        placeholder={t("auditoria.descargar-email")}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-border text-text placeholder:text-text-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    {pdfStatus === "error" && (
                      <p className="text-[10px] text-red-400 mb-2">{t("auditoria.descargar-reintentar")}</p>
                    )}
                    <button
                      onClick={handleDownload}
                      disabled={!downloadEmail || !downloadName}
                      className="w-full px-4 py-2.5 rounded-xl bg-accent text-bg font-medium hover:brightness-110 disabled:opacity-40 transition text-sm"
                    >
                      <Download size={14} className="inline mr-2" />
                      {t("auditoria.descargar-btn")}
                    </button>
                    <button
                      onClick={() => setShowDownload(false)}
                      className="w-full text-center text-xs text-text-muted hover:text-text mt-2"
                    >
                      {t("auditoria.descargar-saltar")}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
