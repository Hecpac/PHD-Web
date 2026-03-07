import { createElement } from "react";

import { resolveIcon } from "@/lib/icons";

type ServiceIconProps = {
  name: string;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = resolveIcon(name);
  if (!Icon) return null;
  return createElement(Icon, { "aria-hidden": "true", className });
}
