import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <section className="section-shell">
      <Container swiss className="space-y-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-sm leading-6 text-muted">
          The page you requested is unavailable. Continue exploring Premium Home Design in Dallas-Fort Worth.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className="inline-flex text-sm font-medium underline-offset-4 hover:underline">
            Back to home
          </Link>
          <Link href="/projects" className="inline-flex text-sm font-medium underline-offset-4 hover:underline">
            Back to projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
