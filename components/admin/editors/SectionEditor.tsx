'use client'

import type { SectionPage, Kpi } from '@/lib/types'
import { FieldInput, FieldTextarea } from '@/components/admin/ui/Fields'
import KpiRows from '@/components/admin/ui/KpiRows'
import ParaRows from '@/components/admin/ui/ParaRows'

type Props = {
  page: SectionPage
  onChange: (page: SectionPage) => void
  topicColor: string
}

export default function SectionEditor({ page, onChange, topicColor }: Props) {
  const set = (key: string, val: unknown) =>
    onChange({ ...page, [key]: val })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Eyebrow + Heading */}
      <div style={{ display: 'grid', gridTemplateColumns: page.eyebrow !== undefined ? '1fr 1fr' : '1fr', gap: 16 }}>
        {page.eyebrow !== undefined && (
          <FieldInput
            label="Eyebrow"
            value={page.eyebrow ?? ''}
            onChange={v => set('eyebrow', v)}
            placeholder="Environment · Carbon"
          />
        )}
        <FieldInput
          label="Heading"
          value={page.header}
          onChange={v => set('header', v)}
          placeholder="Section heading…"
        />
      </div>

      {/* Intro (overview pages) */}
      {page.intro !== undefined && (
        <FieldTextarea
          label="Intro"
          value={page.intro ?? ''}
          onChange={v => set('intro', v)}
          placeholder="Brief section introduction…"
        />
      )}

      {/* Body paragraphs */}
      {Array.isArray(page.body) && (
        <ParaRows
          paragraphs={page.body as string[]}
          onChange={paras => set('body', paras)}
          color={topicColor}
        />
      )}

      {/* KPIs */}
      {Array.isArray(page.kpis) && (
        <KpiRows
          kpis={page.kpis as Kpi[]}
          onChange={kpis => set('kpis', kpis)}
          color={topicColor}
        />
      )}

      {/* Notice about advanced fields */}
      {(() => {
        const advancedKeys = Object.keys(page).filter(k =>
          !['slug', 'title', 'eyebrow', 'header', 'intro', 'body', 'kpis'].includes(k)
        )
        if (advancedKeys.length === 0) return null
        return (
          <div
            style={{
              padding: '12px 16px',
              background: '#fafafa',
              borderRadius: 10,
              border: '1px solid #e2e2e7',
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 500, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Advanced data fields
            </p>
            <p style={{ fontSize: 12, color: '#6e6e73', lineHeight: 1.5 }}>
              This page also has:{' '}
              <span style={{ color: topicColor, fontWeight: 500 }}>
                {advancedKeys.join(', ')}
              </span>
              . Edit these directly in{' '}
              <code style={{ fontSize: 11, background: '#f0f0f5', padding: '1px 5px', borderRadius: 4 }}>
                content/data.json
              </code>
              .
            </p>
          </div>
        )
      })()}
    </div>
  )
}
