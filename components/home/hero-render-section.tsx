export function HeroRenderSection() {
  return (
    <section aria-label="Render 3D" className="relative w-full border-t border-line">
      <video
        className="block aspect-video w-full bg-black object-cover"
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
    </section>
  );
}
