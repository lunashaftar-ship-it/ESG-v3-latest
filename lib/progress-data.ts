// ─── Types ───────────────────────────────────────────────────────────────────

export type ReportType = 'actual' | 'projected'

export interface Milestone {
  label: string
  text: string
}

export interface ActualReport {
  type: 'actual'
  year: number
  title: string
  summary: string
  totalEmissionsMt: number
  avoidedEmissionsMt: number
  reductionVs2015Pct: number
  scopeBreakdown: { name: string; valueMt: number; pct: number }[]
  published: boolean
}

export interface ProjectedReport {
  type: 'projected'
  year: number
  title: string
  summary: string
  projectedEmissionsMt: number
  reductionVs2015: string
  reductionVs2015Pct: number
  plannedActions: string[]
  milestones: Milestone[]
  published: boolean
}

export type ProgressReport = ActualReport | ProjectedReport

export interface ChartDataPoint {
  year: number
  gross: number | null
  avoided: number | null
  projected: number | null
}

// ─── Actual annual reports ────────────────────────────────────────────────────

export const actualReports: ActualReport[] = [
  {
    type: 'actual',
    year: 2020,
    title: '2020 Annual Progress',
    summary: 'Initial reductions and supply chain transition progress.',
    totalEmissionsMt: 22.6,
    avoidedEmissionsMt: 22,
    reductionVs2015Pct: 41,
    scopeBreakdown: [
      { name: 'Scope 1', valueMt: 0.072, pct: 10.1 },
      { name: 'Scope 2 (market)', valueMt: 0.004, pct: 0.5 },
      { name: 'Scope 3', valueMt: 22.524, pct: 89.4 },
    ],
    published: true,
  },
  {
    type: 'actual',
    year: 2021,
    title: '2021 Annual Progress',
    summary: 'Further emissions reduction through operational improvements.',
    totalEmissionsMt: 21.3,
    avoidedEmissionsMt: 26,
    reductionVs2015Pct: 45,
    scopeBreakdown: [
      { name: 'Scope 1', valueMt: 0.066, pct: 9.8 },
      { name: 'Scope 2 (market)', valueMt: 0.003, pct: 0.4 },
      { name: 'Scope 3', valueMt: 21.231, pct: 89.8 },
    ],
    published: true,
  },
  {
    type: 'actual',
    year: 2022,
    title: '2022 Annual Progress',
    summary: 'Continued reduction in gross emissions and supplier energy adoption.',
    totalEmissionsMt: 20.6,
    avoidedEmissionsMt: 31,
    reductionVs2015Pct: 46,
    scopeBreakdown: [
      { name: 'Scope 1', valueMt: 0.061, pct: 9.4 },
      { name: 'Scope 2 (market)', valueMt: 0.003, pct: 0.4 },
      { name: 'Scope 3', valueMt: 20.536, pct: 90.2 },
    ],
    published: true,
  },
  {
    type: 'actual',
    year: 2023,
    title: '2023 Annual Progress',
    summary: 'Strong avoided emissions growth and lower footprint.',
    totalEmissionsMt: 15.8,
    avoidedEmissionsMt: 37,
    reductionVs2015Pct: 59,
    scopeBreakdown: [
      { name: 'Scope 1', valueMt: 0.058, pct: 9.1 },
      { name: 'Scope 2 (market)', valueMt: 0.004, pct: 0.6 },
      { name: 'Scope 3', valueMt: 15.738, pct: 90.3 },
    ],
    published: true,
  },
  {
    type: 'actual',
    year: 2024,
    title: '2024 Annual Progress',
    summary: 'Deep-dive into scope emissions and avoided impact.',
    totalEmissionsMt: 15.3,
    avoidedEmissionsMt: 41,
    reductionVs2015Pct: 60,
    scopeBreakdown: [
      { name: 'Scope 1', valueMt: 0.0552, pct: 8.3 },
      { name: 'Scope 2 (market)', valueMt: 0.0033, pct: 0.5 },
      { name: 'Scope 3', valueMt: 15.2415, pct: 91.2 },
    ],
    published: true,
  },
]

// ─── Projected pathway reports ────────────────────────────────────────────────

export const projectedReports: ProjectedReport[] = [
  {
    type: 'projected',
    year: 2026,
    title: '2026 Projected Pathway',
    summary: 'Planned acceleration of supplier transitions and materials innovation.',
    projectedEmissionsMt: 13.2,
    reductionVs2015: '66%',
    reductionVs2015Pct: 66,
    plannedActions: [
      'Expand supplier clean energy program to 200 additional manufacturers',
      'Introduce recycled aluminum at scale across the MacBook product line',
      'Phase out fossil-fuel freight for all intra-region logistics routes',
    ],
    milestones: [
      { label: 'Q1 2026', text: 'Supplier energy audit completion — 95% coverage target' },
      { label: 'Q3 2026', text: 'Recycled content threshold: 30% across all new product launches' },
      { label: 'Q4 2026', text: 'Carbon offset portfolio review and quality upgrade' },
    ],
    published: true,
  },
  {
    type: 'projected',
    year: 2028,
    title: '2028 Projected Pathway',
    summary: 'Deep decarbonization in manufacturing and logistics ahead of 2030 goal.',
    projectedEmissionsMt: 11.4,
    reductionVs2015: '70%',
    reductionVs2015Pct: 70,
    plannedActions: [
      'Complete transition of top 200 suppliers to renewable-only electricity',
      'Achieve zero landfill at all tier-2 supplier facilities globally',
      'Launch second-generation carbon removal partnerships',
    ],
    milestones: [
      { label: 'Q2 2028', text: 'Gross emissions below 12 Mt — 70% reduction vs 2015 baseline' },
      { label: 'Q3 2028', text: 'Full supplier renewable electricity transition milestone reached' },
      { label: 'Q4 2028', text: 'Net-zero carbon for all NordaGroup-operated facilities worldwide' },
    ],
    published: true,
  },
  {
    type: 'projected',
    year: 2030,
    title: '2030 Target — Carbon Neutral',
    summary: 'Full carbon neutrality across entire global footprint including supply chain.',
    projectedEmissionsMt: 9.6,
    reductionVs2015: '75%+',
    reductionVs2015Pct: 75,
    plannedActions: [
      'Achieve 75% gross emissions reduction vs 2015 baseline without offsets',
      'Balance remaining emissions with high-quality, independently verified carbon removals',
      'Publish third-party verified carbon neutral certification',
    ],
    milestones: [
      { label: 'H1 2030', text: 'Gross emissions ≤9.6 Mt — final 75% reduction milestone reached' },
      { label: 'H1 2030', text: 'High-quality carbon removals verified to cover remaining footprint' },
      { label: '2030', text: 'Apple 2030: full carbon neutrality declared and independently certified' },
    ],
    published: true,
  },
]

// ─── Combined chart data ──────────────────────────────────────────────────────

export const emissionsChartData: ChartDataPoint[] = [
  { year: 2015, gross: 38.4, avoided: null, projected: null },
  { year: 2016, gross: 35.2, avoided: 3, projected: null },
  { year: 2017, gross: 31.0, avoided: 8, projected: null },
  { year: 2018, gross: 25.2, avoided: 14, projected: null },
  { year: 2019, gross: 25.1, avoided: 18, projected: null },
  { year: 2020, gross: 22.6, avoided: 22, projected: null },
  { year: 2021, gross: 21.3, avoided: 26, projected: null },
  { year: 2022, gross: 20.6, avoided: 31, projected: null },
  { year: 2023, gross: 15.8, avoided: 37, projected: null },
  { year: 2024, gross: 15.3, avoided: 41, projected: 15.3 },
  { year: 2026, gross: null, avoided: null, projected: 13.2 },
  { year: 2028, gross: null, avoided: null, projected: 11.4 },
  { year: 2030, gross: null, avoided: null, projected: 9.6 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const BASELINE_EMISSIONS = 38.4 // 2015 Mt

export const ACTUAL_YEARS = actualReports.map((r) => r.year)
export const PROJECTED_YEARS = projectedReports.map((r) => r.year)
export const ALL_YEARS = [...ACTUAL_YEARS, ...PROJECTED_YEARS]

export function getReport(year: number): ProgressReport | undefined {
  return (
    actualReports.find((r) => r.year === year) ??
    projectedReports.find((r) => r.year === year)
  )
}

export function isProjectedYear(year: number): boolean {
  return PROJECTED_YEARS.includes(year)
}
