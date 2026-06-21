"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowRight, Check, X, Download, ChevronLeft, BarChart3 } from "lucide-react";
import { useTranslation } from "@/lib/TranslationsProvider";
import { auditCategories } from "@/data/audit";
import { servicios } from "@/data/services";

function gaTrack(action: string, p?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", action, p);
  }
}

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
  const pct = score / max;
  const label = getScoreLabel(score, max, t);
  const weak = categoryScores.filter((cs) => cs.pct < 0.6);

  const bar = (p: number, color: string) =>
    `<div style="width:100%;height:8px;background:#374151;border-radius:4px;overflow:hidden;margin:4px 0">
      <div style="width:${p * 100}%;height:100%;background:${color};border-radius:4px"></div>
    </div>`;

  const barColor = (p: number) =>
    p < 0.35 ? "#ef4444" : p < 0.6 ? "#f97316" : p < 0.85 ? "#eab308" : "#22c55e";

  const weakHtml = weak.length === 0
    ? `<p style="color:#22c55e">¡Tu sitio está en excelente estado!</p>`
    : weak.map((w) => {
        const cat = auditCategories.find((c) => c.id === w.id);
        const svc = cat ? servicios[cat.serviceIdx] : null;
        return `<div style="margin-bottom:8px">
          <p style="color:#ba112a;font-weight:700;margin:0">• ${t(`cat-${w.id}`)}</p>
          ${svc ? `<p style="color:#9ca3af;font-size:13px;margin:2px 0 0 24px">Solución: ${svc.title}</p>` : ""}
        </div>`;
      }).join("");

  const catRows = categoryScores.map((cs) =>
    `<tr>
      <td style="padding:4px 8px;color:#9ca3af;font-size:13px">${t(`cat-${cs.id}`)}</td>
      <td style="padding:4px 8px;width:60%">${bar(cs.pct, barColor(cs.pct))}</td>
      <td style="padding:4px 8px;color:${barColor(cs.pct)};font-weight:700;font-size:13px;text-align:right">${Math.round(cs.pct * 100)}%</td>
    </tr>`
  ).join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Auditoría INFOCOB</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:Helvetica,Arial,sans-serif;background:#0b0d17;color:#fff;padding:40px;max-width:210mm}
  h1{font-size:28px;margin-bottom:4px}
  h2{font-size:16px;margin-bottom:4px;color:#9ca3af;font-weight:400}
  .score{font-size:22px;font-weight:700;color:#6ee7b7;margin:20px 0 4px}
  .bar-wrap{width:100%;height:10px;background:#374151;border-radius:5px;overflow:hidden;margin:8px 0 24px}
  .bar-fill{height:100%;border-radius:5px}
  table{width:100%;border-collapse:collapse;margin:16px 0 24px}
  .section-title{font-size:15px;font-weight:700;margin:20px 0 8px}
  hr{border:none;border-top:1px solid rgba(255,255,255,.08);margin:24px 0}
  .cta{font-size:15px;font-weight:700;margin:24px 0 8px}
  .footer{color:#9ca3af;font-size:13px;line-height:1.6}
  .disclaimer{color:#6b7280;font-size:10px;margin-top:32px}
</style></head>
<body>
  <h1>INFOCOB</h1>
  <h2>Auditoría de sitio web</h2>
  <div class="score">Puntaje: ${score}/${max}</div>
  <p style="font-size:15px;margin-bottom:4px">${label}</p>
  <div class="bar-wrap"><div class="bar-fill" style="width:${pct * 100}%;background:${barColor(pct)}"></div></div>

  <div class="section-title">Desglose por categoría</div>
  <table>${catRows}</table>

  <hr>
  <div class="section-title">Áreas de mejora</div>
  ${weakHtml}

  <hr>
  <div class="cta">¿Querés mejorar tu sitio?</div>
  <div class="footer">
    Daniel Cobos — INFOCOB Computación<br>
    WhatsApp: +56 9 8286 4145<br>
    Email: dcobosm@gmail.com<br>
    Talca, Chile
  </div>
  <div class="disclaimer">Este diagnóstico es una evaluación general. Para un plan detallado con presupuesto, contactá a Daniel.</div>
</body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "auditoria-infocob.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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

  async function sendLead() {
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key || !downloadEmail) return;
    const catBreakdown = categoryScores
      .map((cs) => `${t(`cat-${cs.id}`)}: ${Math.round(cs.pct * 100)}%`)
      .join("\n");
    const weakAreas = categoryScores
      .filter((cs) => cs.pct < 0.6)
      .map((cs) => t(`cat-${cs.id}`))
      .join(", ");
    const formData = new FormData();
    formData.append("access_key", key);
    formData.append("subject", "Nuevo lead desde Auditoría INFOCOB");
    formData.append("from_name", "Auditoría INFOCOB");
    formData.append("name", downloadName);
    formData.append("email", downloadEmail);
    formData.append("message", `Score: ${score}/${totalPeso} (${Math.round(score / totalPeso * 100)}%)\n\nDesglose:\n${catBreakdown}\n\nÁreas débiles: ${weakAreas}`);
    formData.append("botcheck", "");
    try {
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    } catch {
      // silent — PDF descargado es lo principal
    }
  }

  async function handleDownload() {
    try {
      await generatePdf(answers, score, totalPeso, categoryScores, t, downloadName, downloadEmail);
      await sendLead();
      gaTrack("audit_pdf_download", { score, max: totalPeso, pct: Math.round(score / totalPeso * 100) });
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
              onClick={() => { setStep("quiz"); gaTrack("audit_start"); }}
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
                  onClick={() => gaTrack("audit_whatsapp_cta", { score, max: totalPeso })}
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
                    <p className="text-xs text-text-muted mb-4">auditoria-infocob.html</p>
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
