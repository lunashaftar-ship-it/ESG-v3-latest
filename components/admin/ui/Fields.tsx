'use client'

type FieldProps = {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function FieldInput({ label, value, onChange, placeholder }: FieldProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px 12px',
          fontSize: 13,
          color: '#1d1d1f',
          background: '#fff',
          border: '1px solid #e2e2e7',
          borderRadius: 8,
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = '#1d1d1f')}
        onBlur={e => (e.currentTarget.style.borderColor = '#e2e2e7')}
      />
    </div>
  )
}

export function FieldTextarea({ label, value, onChange, placeholder }: FieldProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#86868b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px 12px',
          fontSize: 13,
          color: '#1d1d1f',
          background: '#fff',
          border: '1px solid #e2e2e7',
          borderRadius: 8,
          outline: 'none',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          resize: 'vertical',
          minHeight: 72,
          transition: 'border-color 0.15s',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = '#1d1d1f')}
        onBlur={e => (e.currentTarget.style.borderColor = '#e2e2e7')}
      />
    </div>
  )
}
