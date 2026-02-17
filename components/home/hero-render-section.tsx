export function HeroRenderSection() {
  return (
    <section
      aria-label="Render 3D"
      className="relative z-40 -mt-[14vh] w-full overflow-hidden border-y border-line bg-black md:-mt-[24vh] lg:-mt-[48vh]"
    >
      <div className="relative h-[58vh] min-h-[340px] w-full sm:h-[62vh] md:h-[66vh] lg:h-[72vh]">
        <video
          className="absolute inset-0 block h-full w-full bg-black object-cover"
          src="/media/render-3d.mp4"
          poster="/media/render-3d-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          Tu navegador no soporta video HTML5.
        </video>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-canvas/80 via-canvas/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/10" />
      </div>
    </section>
  );
}
