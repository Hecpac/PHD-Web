import { BadgeCheck } from "lucide-react";

const CREDENTIALS = [
  "DFW Permit Experts",
  "5-7 Day Turnaround",
  "AutoCAD & Revit",
  "White-Label Ready",
  "60+ Homes Documented",
] as const;

export function BuilderTrustBar() {
  return (
    <section
      aria-label="Builder credentials"
      className="border-b border-line bg-black py-4"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 md:justify-start md:px-6">
        {CREDENTIALS.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/70"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
