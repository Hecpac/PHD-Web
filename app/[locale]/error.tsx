"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-shell">
      <Container swiss className="space-y-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Error</p>
        <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-sm leading-6 text-muted">
          An unexpected error occurred. Try again or return to the homepage.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex text-sm font-medium underline-offset-4 hover:underline"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex text-sm font-medium underline-offset-4 hover:underline">
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}
