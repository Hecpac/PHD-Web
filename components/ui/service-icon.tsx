import { resolveIcon } from "@/lib/icons";

type ServiceIconProps = {
  name: string;
  className?: string;
};

export function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = resolveIcon(name);
  if (!Icon) return null;
  return <Icon aria-hidden="true" className={className} />;
}
