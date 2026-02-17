import { Container } from "@/components/layout/container";

export function HeroRenderSection() {
  return (
    <section aria-label="Render 3D" className="section-shell section-brand-wash-soft border-t border-line">
      <Container swiss className="space-y-4">
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Featured Render</p>
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Render 3D</h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-line/70 bg-canvas shadow-[0_18px_34px_rgb(0_0_0/0.18)]">
          <video
            className="aspect-video w-full bg-black object-cover"
            src="/media/render-3d.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          >
            Tu navegador no soporta video HTML5.
          </video>
        </div>
      </Container>
    </section>
  );
}
