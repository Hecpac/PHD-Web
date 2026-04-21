# Plan: PHD — Internacionalización EN/ES

> Source PRD: Cliente solicita traducción completa del sitio a EN/ES con botón de idioma visible

## Architectural decisions

- **Routes**: Prefijo de locale en todas las rutas — `/en/...` y `/es/...`. Locale por defecto: `en`. Redirect de `/` a `/en/`.
- **Librería i18n**: `next-intl` (soporte nativo para App Router, server components, type-safe)
- **Estructura de traducciones**: `messages/en.json` y `messages/es.json` con namespaces por sección (home, about, contact, layout, etc.)
- **Sanity CMS**: Documentos duplicados por idioma con campo `language` (`"en"` | `"es"`). Cada documento existe en ambos idiomas como documentos separados.
- **Persistencia de idioma**: Cookie `NEXT_LOCALE` vía `next-intl` middleware
- **Slugs**: Los slugs de Sanity se mantienen en inglés en ambos idiomas (ej: `/es/services/custom-homes` no `/es/servicios/casas-personalizadas`) para simplificar el mapeo
- **SEO**: `hreflang` alternates en cada página, sitemap con ambos locales, metadata dinámica por idioma

---

## Phase 1: Infraestructura i18n + Home Hero + Header/Footer

**User stories**: Como visitante hispanohablante, quiero ver el sitio en español. Como cualquier visitante, quiero un botón visible para cambiar de idioma.

### What to build

Instalar `next-intl` y configurar el middleware de detección de locale. Crear el route group `[locale]` que envuelve todas las páginas existentes. Mover el layout raíz dentro del route group con `lang` dinámico. Eliminar el redirect `/es → /` de `next.config.ts` y el stub `app/es/page.tsx`. Crear los archivos `messages/en.json` y `messages/es.json` con namespace `layout` (header labels, footer labels, CTAs) y namespace `home.hero` (todas las strings del hero section). Agregar botón toggle EN/ES visible en el site header. Extraer y traducir strings del hero section, site header y site footer como primer corte vertical.

### Acceptance criteria

- [ ] `next-intl` instalado y middleware configurado con locales `["en", "es"]`, default `"en"`
- [ ] Route group `[locale]` activo — todas las rutas existentes funcionan bajo `/en/...`
- [ ] `/es` muestra la home page con hero, header y footer en español
- [ ] `/en` muestra la home page idéntica al sitio actual (no hay regresión visual)
- [ ] Botón de idioma visible en header — al hacer click cambia entre `/en/...` y `/es/...`
- [ ] Cookie `NEXT_LOCALE` se setea al cambiar idioma
- [ ] Redirect de `/` a `/en/` funciona correctamente
- [ ] El redirect legacy `/es → /` fue eliminado de `next.config.ts`
- [ ] Build exitoso sin errores (`next build`)

---

## Phase 2: Home completo + About page

**User stories**: Como visitante en `/es`, quiero ver todo el contenido del home y about page en español.

### What to build

Extraer todas las strings hardcoded de las 13 secciones del home page a namespaces i18n (`home.howWeWork`, `home.trust`, `home.bento`, `home.faq`, `home.dfw`, `home.whyChooseUs`, etc.). Extraer strings del about page (principles, differentiators, values, founder story) a namespace `about`. Crear las traducciones ES correspondientes. Actualizar cada componente para usar `useTranslations()` (client) o `getTranslations()` (server).

### Acceptance criteria

- [ ] Todas las 13 secciones del home renderizan en español en `/es`
- [ ] About page (`/es/about`) completamente traducida
- [ ] `/en` y `/en/about` visualmente idénticos al estado pre-i18n (no regresión)
- [ ] Animaciones GSAP y Framer Motion siguen funcionando en ambos idiomas
- [ ] No hay strings hardcoded en inglés visibles en `/es` para home y about
- [ ] Build exitoso

---

## Phase 3: Páginas estáticas restantes

**User stories**: Como visitante en `/es`, quiero navegar contact, process, for-builders, dallas-fort-worth, reviews y FAQ en español.

### What to build

Extraer strings de cada página estática restante a namespaces i18n dedicados: `contact` (incluyendo todos los labels del multi-step form y validaciones), `process`, `forBuilders`, `dfw`, `reviews`, `faq`. Traducir al español. Actualizar componentes UI compartidos que tengan texto hardcoded (botones, labels de formulario, mensajes de error).

### Acceptance criteria

- [ ] `/es/contact` — formulario multi-step completamente en español (labels, placeholders, validaciones, CTAs)
- [ ] `/es/process` — página de proceso traducida
- [ ] `/es/for-builders` — página para constructores traducida
- [ ] `/es/dallas-fort-worth` — página de área de servicio traducida
- [ ] `/es/reviews` — página de reseñas traducida (labels y UI chrome)
- [ ] `/es/faq` — página de preguntas frecuentes traducida (labels y UI chrome)
- [ ] Componentes UI compartidos (section-heading, cta-link, etc.) usan i18n
- [ ] Todas las páginas en `/en/...` sin regresión
- [ ] Build exitoso

---

## Phase 4: Sanity CMS bilingüe

**User stories**: Como visitante en `/es`, quiero ver proyectos, servicios, blogs, FAQs y reviews con contenido en español desde el CMS.

### What to build

Agregar campo `language` (`"en"` | `"es"`) a todos los document types de Sanity (project, service, serviceDetail, processStep, faq, review, blogPost, homeHero). Duplicar los documentos existentes como versión `"en"` y crear versiones `"es"` vacías para que el cliente las llene. Actualizar todas las GROQ queries en la data layer para filtrar por `language == $locale`. Actualizar las funciones de normalización para pasar el locale. Actualizar `generateStaticParams()` en rutas dinámicas para generar páginas en ambos idiomas. Actualizar fallback data con versiones ES.

### Acceptance criteria

- [ ] Schema de Sanity incluye campo `language` en todos los document types
- [ ] GROQ queries filtran por locale en todas las funciones de fetch
- [ ] `/es/services/[slug]` muestra contenido en español desde Sanity
- [ ] `/es/projects/[slug]` muestra contenido en español desde Sanity
- [ ] `/es/blogs/[slug]` muestra contenido en español desde Sanity
- [ ] FAQs y reviews se muestran en español donde aparecen (home, service detail, etc.)
- [ ] `generateStaticParams()` genera params para ambos locales
- [ ] Fallback data incluye versiones ES
- [ ] Sanity Studio permite filtrar/crear documentos por idioma
- [ ] `/en/...` dinámicas siguen funcionando sin regresión
- [ ] Build exitoso

---

## Phase 5: SEO + Metadata bilingüe

**User stories**: Como motor de búsqueda, necesito descubrir e indexar ambas versiones del sitio correctamente.

### What to build

Actualizar `generateMetadata()` en cada página para generar títulos, descripciones y OpenGraph tags localizados. Agregar `alternates.languages` con hreflang tags (`en` ↔ `es`) en cada página. Actualizar `sitemap.ts` para incluir URLs de ambos locales con hreflang alternates. Actualizar `robots.ts` si es necesario. Localizar los JSON-LD schemas (LocalBusiness, Organization, WebSite) en el root layout.

### Acceptance criteria

- [ ] Cada página tiene `<title>` y `<meta description>` en el idioma correcto
- [ ] Hreflang tags presentes en HTML: `<link rel="alternate" hreflang="en" ...>` y `<link rel="alternate" hreflang="es" ...>`
- [ ] `sitemap.xml` incluye URLs `/en/...` y `/es/...` para todas las páginas
- [ ] OpenGraph tags (og:title, og:description, og:locale) localizados
- [ ] JSON-LD schema localizado (nombre, descripción del negocio en cada idioma)
- [ ] Google Search Console puede validar hreflang (verificación manual)
- [ ] Build exitoso
- [ ] Lighthouse SEO score ≥ 95 en ambos idiomas
