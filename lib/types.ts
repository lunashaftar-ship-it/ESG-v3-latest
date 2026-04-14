// ── Primitives ────────────────────────────────────────────────────────────

export type Kpi = {
  value: string
  label: string
}

export type ChartDataPoint = {
  label: string
  value: number
}

export type Chart = {
  type: 'bar' | 'line' | 'pie'
  title: string
  unit?: string
  data: ChartDataPoint[]
}

// ── Page types ────────────────────────────────────────────────────────────

export type CeoPage = {
  slug: 'ceo-statement'
  title: string
  name: string
  role: string
  imgSrc: string
  header: string
  paragraphs: string[]
}

// Generic section page — shared base for all topic sub-pages
export type SectionPage = {
  slug: string
  title: string
  eyebrow?: string
  header: string
  intro?: string
  body?: string[]
  kpis?: Kpi[]
  // any extra fields are passed through as unknown
  [key: string]: unknown
}

export type Page = CeoPage | SectionPage

// ── Brand ─────────────────────────────────────────────────────────────────

export type Topic = {
  id: string
  label: string
  color: string
}

// ── Data root ─────────────────────────────────────────────────────────────

export type ReportData = {
  company: {
    name: string
    logo: string
  }
  pages: Page[]
}

// ── Helpers ───────────────────────────────────────────────────────────────

export const TOPICS: Topic[] = [
  { id: 'environment', label: 'Environment', color: '#16a34a' },
  { id: 'product',     label: 'Product',     color: '#ea580c' },
  { id: 'social',      label: 'Social',      color: '#2563eb' },
  { id: 'governance',  label: 'Governance',  color: '#7c3aed' },
]

export function getTopicForSlug(slug: string): Topic {
  const prefix = slug.split('/')[0]
  return TOPICS.find(t => t.id === prefix) ?? { id: 'other', label: 'Report', color: '#6e6e73' }
}

export function isCeoPage(page: Page): page is CeoPage {
  return page.slug === 'ceo-statement'
}
