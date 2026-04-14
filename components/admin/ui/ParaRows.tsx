'use client'

import { Plus, X } from 'lucide-react'

type ParaRowsProps = {
  paragraphs: string[]
  onChange: (paragraphs: string[]) => void
  label?: string
  color?: string
}

export default function ParaRows({ paragraphs, onChange, label = 'Paragraphs', color = '#1d1d1f' }: ParaRowsProps) {
  const update = (i: number, val: string) =>
    onChange(paragraphs.map((p, idx) => (idx === i ? val : p)))
  const remove = (i: number) => onChange(paragraphs.filter((_, idx) => idx !== i))
  const add = () => onChange([...paragraphs, ''])

  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {paragraphs.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <textarea
              value={p}
              onChange={e => update(i, e.target.value)}
              rows={2}
              placeholder={`Paragraph ${i + 1}`}
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: 13,
                color: '#1d1d1f',
                border: '1px solid #e2e2e7',
                borderRadius: 8,
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: 56,
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#1d1d1f')}
              onBlur={e => (e.currentTarget.style.borderColor = '#e2e2e7')}
            />
            <button
              onClick={() => remove(i)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d2d2d7', padding: '8px 4px', flexShrink: 0, transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#86868b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#d2d2d7')}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={add}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0 0' }}
      >
        <Plus size={13} /> Add paragraph
      </button>
    </div>
  )
}
