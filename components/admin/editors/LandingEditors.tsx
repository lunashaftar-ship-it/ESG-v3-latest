'use client'

import { FieldInput, FieldTextarea } from '@/components/admin/ui/Fields'
import ParaRows from '@/components/admin/ui/ParaRows'
import KpiRows from '@/components/admin/ui/KpiRows'
import { Plus, X } from 'lucide-react'

// ── Hero editor ───────────────────────────────────────────────────────────

export function HeroEditor({ hero, onChange }: { hero: any; onChange: (v: any) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FieldInput label="Eyebrow" value={hero.eyebrow} onChange={v => onChange({ ...hero, eyebrow: v })} placeholder="NordaGroup — Impact Report 2026" />
      <FieldTextarea label="Headline" value={hero.headline} onChange={v => onChange({ ...hero, headline: v })} placeholder="We've reduced our emissions by over 60%" />
      <FieldInput label="Highlight word (exact match)" value={hero.highlightWord} onChange={v => onChange({ ...hero, highlightWord: v })} placeholder="60%" />
      <FieldTextarea label="Body paragraph" value={hero.body} onChange={v => onChange({ ...hero, body: v })} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FieldInput label="Primary CTA" value={hero.ctaPrimary} onChange={v => onChange({ ...hero, ctaPrimary: v })} placeholder="Explore our progress" />
        <FieldInput label="Secondary CTA" value={hero.ctaSecondary} onChange={v => onChange({ ...hero, ctaSecondary: v })} placeholder="Report Summary" />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
          Stat cards (left / right)
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {hero.statCards.map((card: any, i: number) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 1fr', gap: 8, padding: '12px', background: '#f5f5f7', borderRadius: 8 }}>
              <FieldInput label="Pillar" value={card.pillar} onChange={v => { const next = [...hero.statCards]; next[i] = { ...card, pillar: v }; onChange({ ...hero, statCards: next }) }} />
              <FieldInput label="Value" value={card.value} onChange={v => { const next = [...hero.statCards]; next[i] = { ...card, value: v }; onChange({ ...hero, statCards: next }) }} />
              <FieldInput label="Unit" value={card.unit} onChange={v => { const next = [...hero.statCards]; next[i] = { ...card, unit: v }; onChange({ ...hero, statCards: next }) }} />
              <FieldInput label="Label" value={card.label} onChange={v => { const next = [...hero.statCards]; next[i] = { ...card, label: v }; onChange({ ...hero, statCards: next }) }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Impact numbers editor ─────────────────────────────────────────────────

export function ImpactNumbersEditor({ impactNumbers, onChange }: { impactNumbers: any; onChange: (v: any) => void }) {
  const updateStat = (i: number, field: string, val: string | number) => {
    const next = impactNumbers.stats.map((s: any, idx: number) => idx === i ? { ...s, [field]: val } : s)
    onChange({ ...impactNumbers, stats: next })
  }
  const removeStat = (i: number) => onChange({ ...impactNumbers, stats: impactNumbers.stats.filter((_: any, idx: number) => idx !== i) })
  const addStat = () => onChange({ ...impactNumbers, stats: [...impactNumbers.stats, { pillar: '', value: 0, unit: '%', description: '' }] })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FieldInput label="Eyebrow" value={impactNumbers.eyebrow} onChange={v => onChange({ ...impactNumbers, eyebrow: v })} />
        <FieldInput label="Heading" value={impactNumbers.heading} onChange={v => onChange({ ...impactNumbers, heading: v })} />
      </div>
      <ParaRows paragraphs={impactNumbers.body} onChange={body => onChange({ ...impactNumbers, body })} label="Body paragraphs" />
      <FieldInput label="CTA label" value={impactNumbers.ctaLabel} onChange={v => onChange({ ...impactNumbers, ctaLabel: v })} />

      <div>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Stat cards</label>
        <div style={{ border: '1px solid #e2e2e7', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
          {impactNumbers.stats.map((stat: any, i: number) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 70px 50px 1fr 32px', borderBottom: i < impactNumbers.stats.length - 1 ? '1px solid #e2e2e7' : 'none', alignItems: 'stretch' }}>
              <input value={stat.pillar} onChange={e => updateStat(i, 'pillar', e.target.value)} placeholder="Environment" style={{ padding: '8px 10px', fontSize: 13, border: 'none', borderRight: '1px solid #e2e2e7', outline: 'none', fontFamily: 'inherit' }} />
              <input type="number" value={stat.value} onChange={e => updateStat(i, 'value', parseFloat(e.target.value) || 0)} style={{ padding: '8px 10px', fontSize: 13, fontWeight: 600, border: 'none', borderRight: '1px solid #e2e2e7', outline: 'none', fontFamily: 'inherit' }} />
              <input value={stat.unit} onChange={e => updateStat(i, 'unit', e.target.value)} placeholder="%" style={{ padding: '8px 10px', fontSize: 13, border: 'none', borderRight: '1px solid #e2e2e7', outline: 'none', fontFamily: 'inherit', textAlign: 'center' }} />
              <input value={stat.description} onChange={e => updateStat(i, 'description', e.target.value)} placeholder="Description" style={{ padding: '8px 10px', fontSize: 13, border: 'none', outline: 'none', fontFamily: 'inherit' }} />
              <button onClick={() => removeStat(i)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#d2d2d7', borderLeft: '1px solid #e2e2e7' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#86868b')} onMouseLeave={e => (e.currentTarget.style.color = '#d2d2d7')}><X size={13} /></button>
            </div>
          ))}
        </div>
        <button onClick={addStat} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#16a34a', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Plus size={13} /> Add stat
        </button>
      </div>
    </div>
  )
}

// ── Pillars editor ────────────────────────────────────────────────────────

export function PillarsEditor({ pillars, onChange }: { pillars: any[]; onChange: (v: any[]) => void }) {
  const update = (i: number, field: string, val: string) => {
    onChange(pillars.map((p, idx) => idx === i ? { ...p, [field]: val } : p))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {pillars.map((pillar, i) => (
        <div key={i} style={{ padding: '16px', background: '#f5f5f7', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: pillar.accentColor }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1d1d1f' }}>{pillar.index} — {pillar.title}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FieldInput label="Title" value={pillar.title} onChange={v => update(i, 'title', v)} />
            <FieldInput label="Subtitle" value={pillar.subtitle} onChange={v => update(i, 'subtitle', v)} />
          </div>
          <FieldTextarea label="Description" value={pillar.description} onChange={v => update(i, 'description', v)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FieldInput label="Link href" value={pillar.href} onChange={v => update(i, 'href', v)} />
            <FieldInput label="Image path" value={pillar.image} onChange={v => update(i, 'image', v)} />
          </div>
          <FieldInput label="Accent color (hex)" value={pillar.accentColor} onChange={v => update(i, 'accentColor', v)} />
        </div>
      ))}
    </div>
  )
}

// ── Report CTA editor ─────────────────────────────────────────────────────

export function ReportCtaEditor({ reportCta, onChange }: { reportCta: any; onChange: (v: any) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FieldInput label="Eyebrow" value={reportCta.eyebrow} onChange={v => onChange({ ...reportCta, eyebrow: v })} />
      <FieldTextarea label="Heading (use \\n for line break)" value={reportCta.heading} onChange={v => onChange({ ...reportCta, heading: v })} />
      <FieldTextarea label="Body" value={reportCta.body} onChange={v => onChange({ ...reportCta, body: v })} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FieldInput label="Download CTA label" value={reportCta.ctaDownload} onChange={v => onChange({ ...reportCta, ctaDownload: v })} />
        <FieldInput label="Explore CTA label" value={reportCta.ctaExplore} onChange={v => onChange({ ...reportCta, ctaExplore: v })} />
      </div>
      <FieldInput label="PDF path" value={reportCta.pdfPath} onChange={v => onChange({ ...reportCta, pdfPath: v })} placeholder="/docs/report.pdf" />
    </div>
  )
}
