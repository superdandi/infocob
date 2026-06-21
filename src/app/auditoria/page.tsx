"use client";

import { useEffect } from "react";
import { useTranslation } from "@/lib/TranslationsProvider";
import SiteAudit from "@/components/SiteAudit";

export default function AuditoriaPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("auditoria.meta-title");
  }, [t]);

  return <SiteAudit />;
}
