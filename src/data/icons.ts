import { Globe, Brain, Package, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Brain,
  Package,
  Lightbulb,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Globe;
}
