# GEO (Generative Engine Optimization) — Option A

Optimizar la visibilidad de Premium Home Design en motores de busqueda generativos (ChatGPT, Perplexity, Gemini, Claude) mediante cambios tecnico-estructurales.

## Scope

4 cambios. Sin refactor de contenido ni IndexNow (fase posterior).

---

## 1. `llms.txt` + `llms-full.txt`

**Archivos:** `public/llms.txt`, `public/llms-full.txt`

Formato Markdown siguiendo la spec de llmstxt.org. Servidos como archivos estaticos en la raiz del dominio.

### `llms.txt` (~30 lineas)

Resumen conciso de la empresa:

- Bloque `# Premium Home Design` con blockquote de elevator pitch
- Seccion `## About` — modelo design-build, decision-gated, open-book, area de servicio
- Seccion `## Services` — lista con URLs absolutas a cada servicio + for-builders
- Seccion `## Key Pages` — portfolio, process, reviews, blog, FAQ, contact
- Seccion `## Contact` — telefono, email, direccion fisica

### `llms-full.txt` (~120 lineas)

Version expandida con:

- Todo lo de `llms.txt`
- Descripcion de 2-3 oraciones por cada servicio
- Lista de proyectos destacados con ubicacion y specs
- FAQs clave (5-8 preguntas con respuesta directa de 50-70 palabras)
- Seccion `## Service Area` con ciudades cubiertas
- Seccion `## Process` con resumen del design-build en pasos

---

## 2. `robots.ts` — Permitir AI bots

**Archivo:** `app/robots.ts`

Agregar reglas explicitas de `allow: "/"` para cada bot de AI antes de la regla wildcard existente.

### Bots a incluir

| User-Agent | Plataforma |
|---|---|
| `OAI-SearchBot` | ChatGPT Search |
| `ChatGPT-User` | ChatGPT browsing |
| `ClaudeBot` | Anthropic/Claude |
| `PerplexityBot` | Perplexity AI |
| `Applebot-Extended` | Apple Intelligence/Siri |
| `Google-Extended` | Gemini |
| `Amazonbot` | Alexa/Amazon |
| `cohere-ai` | Cohere |

La regla wildcard `userAgent: "*"` se mantiene al final como fallback.

---

## 3. Schema `Organization` con `sameAs` expandido

**Archivos:** `lib/config/site.ts`, `lib/seo/schema.ts`, `app/layout.tsx`

### 3a. `siteConfig` — agregar `entityLinks`

Nuevo campo `entityLinks` en `siteConfig` para URLs de entidad que no son redes sociales:

```typescript
entityLinks: [
  "https://www.google.com/maps/place/Premium+Home+Design",
] as const,
```

### 3b. `createOrganizationSchema()`

Nuevo schema en `lib/seo/schema.ts`:

- `@type: "Organization"`
- `name`, `alternateName` ("PHD"), `url`, `logo`, `foundingDate` ("2016")
- `description` desde `siteConfig.description`
- `contactPoint` con `telephone`, `contactType: "customer service"`, `availableLanguage: ["English", "Spanish"]`
- `sameAs` combina `siteConfig.socialLinks` + `siteConfig.entityLinks` + Instagram del fundador
- `founder` referencia al schema Person (inline)

### 3c. `sameAs` en LocalBusiness

Actualizar `createLocalBusinessSchema()` linea 92 para combinar `socialLinks` + `entityLinks`:

```typescript
sameAs: [
  ...siteConfig.socialLinks.map((s) => s.href),
  ...siteConfig.entityLinks,
],
```

---

## 4. Schema `Person` — Fundador

**Archivo:** `lib/seo/schema.ts`

### `createFounderSchema()`

- `@type: "Person"`
- `name: "Hector Pachano"`
- `jobTitle: "Founder"`
- `worksFor` referencia a Organization
- `sameAs: ["https://www.instagram.com/pachanodesign"]`

Se inyecta:
- Como `founder` dentro de `createOrganizationSchema()`
- Como schema standalone via `<JsonLd>` en `app/layout.tsx`

---

## Archivos tocados (resumen)

| Archivo | Cambio |
|---|---|
| `public/llms.txt` | Nuevo — resumen para LLMs |
| `public/llms-full.txt` | Nuevo — version expandida |
| `app/robots.ts` | Modificar — agregar AI bot rules |
| `lib/config/site.ts` | Modificar — agregar `entityLinks` |
| `lib/seo/schema.ts` | Modificar — agregar `createOrganizationSchema()`, `createFounderSchema()`, expandir `sameAs` en LocalBusiness |
| `app/layout.tsx` | Modificar — inyectar Organization + Person schemas |

## Fuera de scope

- IndexNow (fase B)
- OG images dinamicas (fase C)
- Contenido formato "respuesta directa" (estrategia editorial)
- Seeding multiplataforma (marketing)
- Metricas Share of Model (herramientas externas)
