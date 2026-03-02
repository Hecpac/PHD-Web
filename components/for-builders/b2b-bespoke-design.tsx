"use client";

import { Container } from "@/components/layout/container";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { SectionHeading } from "@/components/ui/section-heading";

export function B2BBespokeDesign() {
  return (
    <section id="bespoke-design" className="section-shell relative z-10 border-t border-line bg-black">
      <Container swiss className="relative z-10 space-y-16">
        <div className="max-w-3xl">
           <h2 className="type-heading text-[#d4af37] mb-6">
              Custom Home Plans
           </h2>
           <p className="text-2xl md:text-3xl font-light text-white leading-relaxed tracking-tight">
             Bespoke Architectural Designs Tailored to Your Lifestyle.
           </p>
           <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
             Working with our team to realize your dream home is a collaborative journey. 
             We transform initial ideas into detailed concept plans and bring them to life 
             with realistic 3D visualizations, ensuring every detail is refined before construction begins.
           </p>
        </div>

        {/* Before and After Interactive Experience */}
        <div className="w-full">
           <BeforeAfterSlider 
             beforeImage="/blueprint-kitchen.jpeg" 
             afterImage="/hero-home.jpeg"
             beforeLabel="Blueprint & Planning"
             afterLabel="Photorealistic Render"
             className="shadow-2xl shadow-black/50"
           />
        </div>

        {/* Value Pillars */}
        <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-3">
           <div className="space-y-3">
              <div className="text-[#d4af37]">
                 {/* Icon placeholder for Architectural Precision */}
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Tailored Floor Plans</h3>
              <p className="text-white/60">Architectural Precision</p>
           </div>

           <div className="space-y-3">
              <div className="text-[#d4af37]">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-white">3D Visualizations</h3>
              <p className="text-white/60">Realistic Rendering</p>
           </div>

           <div className="space-y-3">
              <div className="text-[#d4af37]">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Smart Space Planning</h3>
              <p className="text-white/60">Modern Custom Features</p>
           </div>
        </div>
      </Container>
    </section>
  );
}
