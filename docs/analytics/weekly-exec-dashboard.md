# PHD — Dashboard Ejecutivo Semanal (Ads → Leads → Citas)

## Objetivo
Tener una vista de 1 página para dirección comercial:

1. Inversión Ads
2. Tráfico DFW
3. Intención (scroll 50/75 + CTA visible)
4. Leads calificados
5. Citas agendadas

---

## Fuente de datos (ya implementada)

### Eventos web
- Endpoint: `POST /api/analytics/collect`
- Webhook destino: `ANALYTICS_EVENTS_WEBHOOK_URL`
- Fallback local: `/tmp/phd-analytics-events.ndjson`
- Eventos clave:
  - `scroll_depth` (50/75)
  - `cta_visible`
  - `project_view` (a 50% de scroll)
  - `service_view` (a 50% de scroll)
  - `submit_contact`

### Leads
- Server actions `submitContactForm` / `submitVisionBuilder`
- Payload incluye `utm` (source/medium/campaign/content/term/landingPath)
- Webhook destino: `CONTACT_WEBHOOK_URL` / `VISION_BUILDER_WEBHOOK_URL`

---

## Orquestación recomendada (sin tocar código)

1. **Make/Zapier Flow A (Eventos web)**
   - Trigger: webhook `ANALYTICS_EVENTS_WEBHOOK_URL`
   - Action: Append row en Google Sheet `events_raw`

2. **Make/Zapier Flow B (Leads)**
   - Trigger: webhook de leads
   - Action: Append row en Google Sheet `leads_raw`

3. **Google Sheet**
   - Tabs:
     - `events_raw`
     - `leads_raw`
     - `weekly_summary`

4. **Looker Studio**
   - Data source: Google Sheet
   - Página única con KPIs + funnel semanal

---

## Estructura sugerida de columnas

### `events_raw`
- `receivedAt`
- `event`
- `entityType`
- `slug`
- `depth`
- `ctaId`
- `path`
- `timestamp`
- `utm_source`
- `utm_medium`
- `utm_campaign`

### `leads_raw`
- `submittedAt`
- `source`
- `qualification`
- `lifecycleStage`
- `name`
- `email`
- `targetZone`
- `investmentRange`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_landing_path`

---

## KPIs del tablero

1. **Sessions (DFW)**
2. **Intent users (>=50% scroll en project/service)**
3. **CTA visibility rate** = cta_visible / intent users
4. **Lead capture rate** = submit_contact / intent users
5. **Qualified lead rate** = leads(qualification=qualified) / total leads
6. **Nurture share** = leads(lifecycleStage=nurture) / total leads
7. **Top pages by intent**
8. **Top pages by leads**
9. **Top UTM campaigns by qualified leads**

---

## Definición de éxito semanal (target inicial)

- `Lead capture rate` > 2.5%
- `Qualified lead rate` > 35%
- `CTA visibility rate` > 45%
- `Response SLA` < 15 minutos (operación comercial)

---

## Nota operativa
Si aún no se define `ANALYTICS_EVENTS_WEBHOOK_URL`, los eventos quedan en:
`/tmp/phd-analytics-events.ndjson` para pruebas locales.
