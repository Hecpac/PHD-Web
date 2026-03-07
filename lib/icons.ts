import {
  Box,
  ClipboardList,
  Compass,
  Hammer,
  MessageCircle,
  Palette,
  Ruler,
  Search,
  TreePine,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Ruler,
  Hammer,
  Palette,
  MessageCircle,
  ClipboardList,
  TreePine,
  Box,
  Search,
};

export function resolveIcon(name: string): LucideIcon | undefined {
  return iconMap[name];
}
