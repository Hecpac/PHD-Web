import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  swiss?: boolean;
};

export function Container({ children, className, swiss = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        swiss ? "container-swiss" : "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
