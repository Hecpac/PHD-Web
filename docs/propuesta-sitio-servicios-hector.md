# Propuesta Integral — Sitio Web de Servicios de Héctor

> Automatizaciones · Diseño Web · SEO/AEO
> Fecha: 2026-02-19
> Versión: 1.0

---

## 1. Posicionamiento + Propuesta de Valor

### Contexto competitivo

El mercado de servicios digitales B2B está saturado de agencias que dicen lo mismo: "hacemos web, SEO, y branding". La diferenciación no viene de los servicios, sino de **cómo se comunica la capacidad de ejecución**. Basement, Metalab y Reboot ganan proyectos no por listar servicios, sino por demostrar craft y un punto de vista.

Tu ventaja: combinas **automatización técnica** (lo que la mayoría de agencias web no ofrece) con **diseño de alto nivel** y **SEO/AEO estratégico**. Eso es raro. Hay que explotarlo.

### Variante A — "Infraestructura digital que genera ingresos"
> **Tagline:** _Design. Automate. Rank._
> **Propuesta:** "Diseño sitios web que convierten, automatizo lo que te quita tiempo, y posiciono tu negocio donde tus clientes buscan. Un solo operador. Sin overhead de agencia."
> **Tono:** Directo, técnico, seguro. Como un ingeniero que también tiene buen gusto.
> **Ideal si:** Quieres atraer founders, directores de marketing, y dueños de PyMEs que valoran ejecución sobre presentaciones.

### Variante B — "El estudio de uno que opera como diez"
> **Tagline:** _One operator. Full stack._
> **Propuesta:** "Automatizaciones, diseño web, y posicionamiento orgánico — integrados bajo un solo punto de contacto. Sin reuniones innecesarias. Sin capas. Resultados medibles."
> **Tono:** Minimal, confiado, eficiente. Estilo indie-studio.
> **Ideal si:** Quieres posicionarte como alternativa premium a agencias medianas, enfatizando velocidad y cero burocracia.

### Variante C — "El sistema detrás de tu crecimiento digital"
> **Tagline:** _Systems that scale._
> **Propuesta:** "No vendo páginas web. Construyo sistemas digitales: sitios que posicionan, flujos que se ejecutan solos, y estrategias orgánicas que generan demanda 24/7."
> **Tono:** Estratégico, sistémico, premium. Menos "freelancer", más "consultor-ejecutor".
> **Ideal si:** Quieres tickets más altos y clientes que entienden el valor de la infraestructura digital.

### Recomendación

**Variante C como base, con la claridad directa de A.** El sitio debe comunicar "sistema", no "servicios sueltos". Eso justifica precios más altos y atrae mejores clientes.

---

## 2. Arquitectura de Información (Sitemap)

```
/                    → Home (landing principal, conversión)
/services            → Hub de servicios (overview + links a cada uno)
  /services/web      → Diseño & Desarrollo Web
  /services/auto     → Automatizaciones
  /services/seo      → SEO / AEO
/work                → Proyectos seleccionados (case studies)
  /work/[slug]       → Case study individual
/about               → Sobre Héctor (credenciales, enfoque, stack)
/contact             → Contacto / Formulario de intake
/blog                → Artículos (SEO play, autoridad, AEO content)
  /blog/[slug]       → Artículo individual
```

### Notas de arquitectura
- **Máximo 2 niveles de profundidad.** Menos clicks = más conversiones.
- **No** página de pricing pública. Pricing en call/propuesta. El sitio califica leads.
- `/work` como prueba social principal. Cada case study = mini landing.
- `/blog` es el motor de SEO/AEO a mediano plazo. MVP puede lanzar sin él.
- Footer con links a servicios, CTA de contacto, y redes sociales.

---

## 3. Wireframe Textual — Home (sección por sección)

### Sección 1: Hero
**Objetivo:** Capturar atención en <3 segundos. Comunicar qué haces y para quién.

```
┌────────────────────────────────────────────────┐
│ [Nav]  Logo    Services  Work  About   [CTA]   │
├────────────────────────────────────────────────┤
│                                                │
│  DESIGN.                                       │
│  AUTOMATE.                                     │
│  RANK.                                         │
│                                                │
│  Sistemas digitales que generan ingresos:      │
│  sitios web, automatizaciones, y SEO/AEO       │
│  para negocios que no quieren perder tiempo.   │
│                                                │
│  [Ver Servicios →]     [Agendar Call →]        │
│                                                │
│  ─────── ticker: "web · auto · seo · aeo" ──  │
└────────────────────────────────────────────────┘
```

- Tipografía hero XXL (clamp 4rem→8rem), monoespaciada o grotesk bold
- Fondo oscuro o neutro. Sin imágenes. La tipo ES el diseño.
- Dos CTAs: uno exploratorio, uno de conversión directa.
- Ticker/marquee sutil al fondo (estilo Foundry).

### Sección 2: Qué hago (Services Overview)
**Objetivo:** Explicar los 3 pilares en 10 segundos de scroll.

```
┌────────────────────────────────────────────────┐
│  [01]  Diseño Web                              │
│  Sitios que convierten. Next.js, Tailwind,     │
│  performance-first. No templates.              │
│  → Ver más                                     │
│                                                │
│  [02]  Automatizaciones                        │
│  Flujos que eliminan trabajo repetitivo.        │
│  APIs, webhooks, n8n, scripts a medida.        │
│  → Ver más                                     │
│                                                │
│  [03]  SEO / AEO                               │
│  Posicionamiento orgánico + optimización para  │
│  respuestas de IA. Tráfico que no pagas.       │
│  → Ver más                                     │
└────────────────────────────────────────────────┘
```

- Layout: 3 columnas desktop, stack vertical mobile.
- Numeración Swiss (01, 02, 03) como eyebrow.
- Cada card es link a `/services/[slug]`.
- Hover: línea accent que se expande bajo el título.

### Sección 3: Prueba Social / Logos / Métricas
**Objetivo:** Credibilidad instantánea.

```
┌────────────────────────────────────────────────┐
│  "No necesité una agencia de 20 personas.      │
│   Necesité a alguien que ejecutara."           │
│   — Cliente, Empresa X                         │
│                                                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │Logo 1│ │Logo 2│ │Logo 3│ │Logo 4│          │
│  └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                │
│  12+ proyectos    3x ROI promedio   <48h resp  │
└────────────────────────────────────────────────┘
```

- Si no hay logos aún: usar métricas + 1 testimonial fuerte.
- Logos en grayscale, fila horizontal con marquee sutil.
- Números con animación de counter (tabular-nums).

### Sección 4: Trabajo Seleccionado
**Objetivo:** Demostrar capacidad visual y resultados.

```
┌────────────────────────────────────────────────┐
│  WORK                                          │
│                                                │
│  ┌─────────────────┐  ┌─────────────────┐     │
│  │  Proyecto A      │  │  Proyecto B      │    │
│  │  [screenshot]    │  │  [screenshot]    │    │
│  │  Web + SEO       │  │  Automatización  │    │
│  └─────────────────┘  └─────────────────┘     │
│                                                │
│  ┌──────────────────────────────────────┐      │
│  │  Proyecto C (featured, full-width)    │     │
│  │  [screenshot / video]                 │     │
│  └──────────────────────────────────────┘      │
│                                                │
│  [Ver todos los proyectos →]                   │
└────────────────────────────────────────────────┘
```

- Grid asimétrico: 2 columnas + 1 full-width alternas.
- Hover: reveal de datos (nombre, tipo, resultado clave).
- Imágenes con aspect-ratio fijo para evitar CLS.
- Si aún no hay case studies: mockups o "coming soon" con estilo.

### Sección 5: Cómo Trabajo (Process)
**Objetivo:** Reducir fricción de compra mostrando proceso claro.

```
┌────────────────────────────────────────────────┐
│  PROCESS                                       │
│                                                │
│  01 Intake       → Brief + fit check (gratis)  │
│  02 Propuesta    → Scope, timeline, inversión  │
│  03 Ejecución    → Sprints con entregas visibles│
│  04 Lanzamiento  → Deploy + métricas activas   │
│                                                │
│  Sin contratos largos. Sin sorpresas.          │
└────────────────────────────────────────────────┘
```

- 4 pasos, horizontal desktop, vertical mobile.
- Numeración grande, descripción corta.
- Línea conectora entre pasos (estilo timeline).

### Sección 6: CTA Final
**Objetivo:** Conversión. Último empujón.

```
┌────────────────────────────────────────────────┐
│                                                │
│  ¿Listo para dejar de improvisar              │
│  tu presencia digital?                         │
│                                                │
│  [Agendar una llamada →]                       │
│                                                │
│  O escríbeme: hola@hector.dev                  │
└────────────────────────────────────────────────┘
```

- Full-width. Tipografía hero. Fondo accent o contraste fuerte.
- Un solo CTA principal. Email como fallback.
- Sin formulario aquí — el formulario vive en `/contact`.

### Sección 7: Footer
**Objetivo:** Navegación secundaria, credibilidad, contacto.

```
┌────────────────────────────────────────────────┐
│  Logo         Services     Work     Contact    │
│               Blog         About               │
│                                                │
│  Twitter  LinkedIn  GitHub                     │
│                                                │
│  © 2026 Héctor. Todos los derechos reservados. │
└────────────────────────────────────────────────┘
```

---

## 4. Sistema Visual

### Inspiración procesada

| Referencia | Qué tomar | Qué NO copiar |
|---|---|---|
| **Foundry (basement)** | Tipografía como protagonista, dark mode, marquees, espaciado generoso | WebGL 3D (overkill para servicios B2B, mata performance) |
| **Metalab** | Claridad editorial, copywriting confiado, prueba social elegante | Animaciones lentas de scroll que frustran |
| **Reboot** | Grid asimétrico, mezcla serif/sans, uso de color accent mínimo | Exceso de whitespace que hace scrollear de más |
| **Mixpanel/Twingate** | Datos como diseño, ilustraciones técnicas, cards informativas | Estética "SaaS dashboard" no aplica a servicios |
| **Notion** | Simplicidad, modularidad, tipografía clara | Demasiado friendly/playful para B2B de servicios |

### Tipografía

| Uso | Font | Fallback |
|---|---|---|
| **Headlines** | Inter Tight, Satoshi, o Neue Montreal (grotesk geométrica, tight tracking) | "Helvetica Neue", Arial |
| **Body** | Inter, Geist, o DM Sans (legibilidad, neutralidad) | system-ui, sans-serif |
| **Mono/Labels** | JetBrains Mono o Geist Mono (tech feel, eyebrows, etiquetas) | ui-monospace, monospace |

- Escala modular: Major Third (1.25) o Perfect Fourth (1.333).
- Fluid type: `clamp()` para hero (4rem → 8rem), display (2rem → 4rem).
- Tracking: tight en headlines (-0.03em), normal en body.
- `text-wrap: balance` en todos los headings.
- `font-variant-numeric: tabular-nums` en métricas/contadores.

### Color

```
Mode principal: DARK (como Foundry/basement)

--canvas:      #0A0A0A    (negro profundo, no puro #000)
--surface:     #141414    (cards, contenedores)
--surface-2:   #1E1E1E    (hover, elevación)
--ink:         #FAFAFA    (texto principal)
--muted:       #888888    (texto secundario)
--line:        #2A2A2A    (bordes, divisores)
--accent:      #4AFF7F    (verde neón técnico) o #6366F1 (indigo) o #F97316 (naranja)
--on-accent:   #0A0A0A    (texto sobre accent)

Light mode: Opcional para fase 2. Si se implementa:
--canvas:      #FAFAFA
--ink:         #0A0A0A
--accent:      (mismo)
```

**Nota sobre accent color:** El accent debe ser un color que no compita con las capturas de pantalla de proyectos. Verde neón (#4AFF7F) es llamativo y técnico (estilo terminal/código). Indigo (#6366F1) es más seguro y profesional. Naranja (#F97316) es energético. **Elige uno y no cambies.**

### Espaciado y Grid

- Grid: 12 columnas, max-width 1280px, gutters 24px (mobile 16px).
- Spacing scale: múltiplos de 8px (8, 16, 24, 32, 48, 64, 96, 128).
- Secciones: padding vertical 96px desktop, 64px tablet, 48px mobile.
- Cards: border 1px `--line`, radius 8-12px, padding 24-32px.

### Motion

- Entrance: fade-up 24px + opacity, `power2.out`, stagger 0.08s.
- Hover: solo `transform` + `opacity`. Nunca `transition: all`.
- Marquee/ticker: CSS `@keyframes`, `animation-play-state: paused` on hover.
- **Obligatorio:** `prefers-reduced-motion` guard en toda animación.
- **Opcional MVP:** GSAP ScrollTrigger para sticky sections y reveal.
- **NO en MVP:** Lenis smooth scroll, WebGL, parallax complejo.

### Micro-interacciones

- Links: underline reveal de izquierda a derecha.
- Botones: scale 0.97 on press, hover lift -2px + shadow.
- Cards: border-color transition a accent on hover.
- Cursor custom: solo si hay tiempo. No es prioridad.

---

## 5. Copy Inicial

### Hero

**H1:**
```
Design. Automate. Rank.
```

**Subtítulo:**
```
Construyo sistemas digitales que generan ingresos —
sitios web, automatizaciones y SEO/AEO
para negocios que no quieren perder el tiempo.
```

**CTA primario:** `Agendar Llamada`
**CTA secundario:** `Ver Servicios`

### Servicios

**Web Design & Dev:**
> Sitios que convierten, no solo se ven bien. Stack moderno (Next.js, Tailwind, Vercel), performance-first, diseño editorial. Sin templates. Sin WordPress.

**Automatizaciones:**
> Flujos que se ejecutan solos. Conecto tus herramientas, elimino tareas repetitivas, y construyo pipelines que escalan sin que contrates a nadie más.

**SEO / AEO:**
> Posicionamiento orgánico + optimización para respuestas de IA. Estrategia técnica, contenido, y estructura. Tráfico que no pagas y presencia en LLMs.

### CTA final

**H2:**
```
¿Listo para dejar de improvisar
tu presencia digital?
```

**Body:**
```
Agenda una llamada de 20 minutos. Sin compromiso.
Te digo si puedo ayudarte — y si no, te recomiendo a alguien que sí.
```

**CTA:** `Agendar Llamada →`

### Prueba social

**Si hay testimonials:**
> "Héctor entregó en 2 semanas lo que mi agencia anterior no logró en 3 meses."
> — [Nombre], [Empresa]

**Si aún no hay:**
> 12+ proyectos entregados · Respuesta en <48h · Sin contratos largos

**Métricas sugeridas (usar las reales):**
- `X+` proyectos entregados
- `X%` mejora promedio en velocidad de carga
- `Xh` ahorradas al mes por automatización
- `<48h` tiempo de respuesta

---

## 6. Reglas Responsive

### Breakpoints

| Token | Min-width | Target |
|---|---|---|
| `sm` | 640px | Mobile landscape, tablets pequeños |
| `md` | 768px | Tablets portrait |
| `lg` | 1024px | Tablets landscape, laptops |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop grande |

### Comportamiento por breakpoint

#### Mobile (< 640px)
- Nav: hamburger → fullscreen overlay con animación fade/slide.
- Hero: tipografía `clamp(2.5rem, 8vw, 4rem)`. CTAs apilados full-width.
- Services: stack vertical. Cards full-width con spacing 16px.
- Work grid: 1 columna. Imágenes aspect-ratio 16/10.
- Process: vertical timeline.
- Footer: stack vertical, links en columnas de 2.
- Touch targets: mínimo 44×44px en todo elemento interactivo.
- `touch-action: manipulation` global.
- `padding-bottom: env(safe-area-inset-bottom)` en body.
- Sin efectos hover visibles (solo estados focus/active).

#### Tablet (768px – 1023px)
- Nav: puede mostrarse horizontal si cabe, o hamburger.
- Hero: tipografía `clamp(3rem, 6vw, 5rem)`. CTAs en fila.
- Services: 2 columnas (tercero full-width abajo, o 3 columnas tight).
- Work grid: 2 columnas iguales.
- Process: 2×2 grid.
- Footer: 3 columnas.

#### Desktop (≥ 1024px)
- Nav: horizontal completa con CTA visible.
- Hero: tipografía `clamp(4rem, 5vw, 7rem)`.
- Services: 3 columnas iguales.
- Work grid: 2 + 1 alterno (asimétrico editorial).
- Process: 4 columnas horizontal con línea conectora.
- Footer: 4 columnas con logo a la izquierda.
- Cursor custom (opcional).
- Smooth scroll (opcional, solo si no hay issues de performance).

### Reglas transversales
- Nunca `overflow-x: hidden` en body como hack — arreglar el contenido que causa overflow.
- `[id] { scroll-margin-top: 5rem; }` global (sticky header clearance).
- Imágenes: siempre `width` + `height` explícitos. `loading="lazy"` below fold.
- `content-visibility: auto` en secciones below fold.
- `font-display: swap` en todas las fuentes.
- Test obligatorio: iPhone SE (375px), iPad (768px), MacBook (1440px).

---

## 7. Plan de Ejecución por Fases

### Fase 0 — Fundamentos (Días 1-2)
- [ ] Definir nombre/marca/dominio final.
- [ ] Elegir accent color definitivo.
- [ ] Recopilar assets: logo (si existe), screenshots de proyectos, testimonials.
- [ ] Configurar repo: Next.js 15+, Tailwind v4, Vercel deploy.
- [ ] Definir tokens de diseño: colores, tipografía, espaciado, motion.
- [ ] Setup analytics (Vercel Analytics o Plausible).

### Fase 1 — MVP Live (Días 3-9)
**Meta: sitio publicado con home + contacto funcionando.**

- [ ] Layout base: header, footer, container system.
- [ ] Home page completa (7 secciones del wireframe).
- [ ] Página `/contact` con formulario funcional (Resend/webhook).
- [ ] SEO base: metadata, OG, sitemap, robots, structured data.
- [ ] Responsive QA: mobile, tablet, desktop.
- [ ] Accesibilidad base: skip link, focus-visible, aria-labels, reduced-motion.
- [ ] Deploy a producción en dominio final.

**Entregables Fase 1:**
- Sitio live.
- Formulario que envía leads.
- Google Search Console conectado.

### Fase 2 — Contenido + Credibilidad (Días 10-14)
- [ ] `/services/web`, `/services/auto`, `/services/seo` (páginas individuales).
- [ ] `/work` con 2-3 case studies mínimos.
- [ ] `/about` con bio, stack, credenciales.
- [ ] Prueba social: testimonials reales o métricas verificables.
- [ ] Blog setup (estructura, 1 post de lanzamiento).
- [ ] Performance audit: Lighthouse > 90 en los 4 ejes.

### Fase 3 — Growth Engine (Semanas 3-6)
- [ ] Blog con 4-6 artículos SEO (long-tail keywords de servicios).
- [ ] AEO: structured data avanzada (FAQ, HowTo, Service).
- [ ] Animaciones avanzadas: GSAP ScrollTrigger, sticky sections.
- [ ] Dark/light mode toggle.
- [ ] Case studies con datos de resultados (antes/después).
- [ ] A/B test en hero copy y CTA.
- [ ] Schema markup completo para Local Business (si aplica).

### Fase 4 — Escala (Mes 2+)
- [ ] CMS headless para blog y case studies (Sanity, Payload, o MDX).
- [ ] Automatización de lead nurturing (email sequence post-formulario).
- [ ] Integraciones: Cal.com para booking, CRM para seguimiento.
- [ ] Experimentación visual: micro-animaciones, custom cursor, page transitions.
- [ ] Internacionalización (si el mercado lo pide): español/inglés.

---

## 8. Riesgos y Mitigaciones

| Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|
| **Perfeccionismo visual retrasa lanzamiento** | Alto | Alta | MVP feo pero funcional > sitio bonito que nunca sale. Deadline duro de 9 días para Fase 1. Iterar en público. |
| **Sin case studies al lanzar** | Medio | Alta | Usar mockups de proyectos propios, screenshots de PHD u otros, o sección "Work" como "coming soon" con estilo. Agregar en Fase 2. |
| **Copia a Foundry/basement resulta genérica** | Medio | Media | Foundry es la inspiración, no el template. Adaptar: ellos venden fuentes, tú vendes servicios B2B. Más copy, menos arte. Más datos, menos misterio. |
| **Formulario de contacto no convierte** | Alto | Media | CTA múltiples (formulario, Cal.com booking, email, WhatsApp). Medir cuál convierte más. Iterar copy en Fase 3. |
| **SEO tarda en dar resultados** | Medio | Alta (natural) | SEO es una inversión a 3-6 meses. No depender solo de orgánico al inicio. Complementar con LinkedIn, referencias, y outbound. El blog acelera. |
| **Scope creep en animaciones/3D** | Alto | Media | WebGL, Lenis, parallax complejo = Fase 4. MVP solo necesita: fade-up, hover states, y un marquee. Resistir la tentación. |
| **El sitio se siente "freelancer" en vez de "estudio"** | Medio | Media | El copy y el diseño marcan la diferencia. Usar "we" estratégicamente. Mostrar proceso, no solo portfolio. Structured data de Organization, no Person. |

---

## Resumen Ejecutivo

| Elemento | Decisión |
|---|---|
| **Posicionamiento** | "Sistemas digitales que generan ingresos" (Variante C + claridad de A) |
| **Estilo visual** | Dark mode, tipografía protagonista, grotesk + mono, accent mínimo |
| **Tech stack** | Next.js 15+, Tailwind v4, Vercel, Resend (email) |
| **MVP deadline** | 9 días desde inicio |
| **Páginas MVP** | Home + Contact (2 páginas funcionales) |
| **Conversión** | Formulario + Cal.com booking + email fallback |
| **SEO day 1** | Metadata, OG, sitemap, robots, LocalBusiness schema |
| **Riesgo principal** | Perfeccionismo. Mitigación: deadline duro, iterar en público. |

---

_Este documento es el blueprint. El siguiente paso es validar posicionamiento (Variante A/B/C), elegir accent color, y arrancar Fase 0._
