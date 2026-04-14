'use client'

import { Plus, X } from 'lucide-react'
import type { Kpi } from '@/lib/types'

type KpiRowsProps = {
  kpis: Kpi[]
  onChange: (kpis: Kpi[]) => void
  color?: string
}

export default function KpiRows({ kpis, onChange, color = '#16a34a' }: KpiRowsProps) {
  const update = (i: number, field: keyof Kpi, val: string) => {
    onChange(kpis.map((k, idx) => idx === i ? { ...k, [field]: val } : k))
  }
  const remove = (i: number) => onChange(kpis.filter((_, idx) => idx !== i))
  const add = () => onChange([...kpis, { value: '', label: '' }])

  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
        KPIs
      </label>
      <div style={{ border: '1px solid #e2e2e7', borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
        {kpis.length === 0 && (
          <div style={{ padding: '12px 14px', fontSize: 12, color: '#86868b' }}>No KPIs yet</div>
        )}
        {kpis.map((kpi, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 32px',
              borderBottom: i < kpis.length - 1 ? '1px solid #e2e2e7' : 'none',
              alignItems: 'stretch',
            }}
          >
            <input
              value={kpi.value}
              onChange={e => update(i, 'value', e.target.value)}
              placeholder="40%"
              style={{ padding: '8px 10px', fontSize: 13, fontWeight: 600, border: 'none', borderRight: '1px solid #e2e2e7', outline: 'none', fontFamily: 'inherit', background: 'transparent', color: '#1d1d1f' }}
            />
            <input
              value={kpi.label}
              onChange={e => update(i, 'label', e.target.value)}
              placeholder="reduction since 2019"
              style={{ padding: '8px 10px', fontSize: 13, border: 'none', outline: 'none', fontFamily: 'inherit', background: 'transparent', color: '#1d1d1f' }}
            />
            <button
              onClick={() => remove(i)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#d2d2d7', borderLeft: '1px solid #e2e2e7', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#86868b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#d2d2d7')}
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={add}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <Plus size={13} /> Add KPI
      </button>
    </div>
  )
}
