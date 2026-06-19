import { Globe, Brain, Package, Lightbulb, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Brain,
  Package,
  Lightbulb,
  Wrench,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Globe;
}
