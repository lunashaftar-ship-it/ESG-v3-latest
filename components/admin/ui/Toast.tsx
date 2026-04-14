'use client'

import { Check, X } from 'lucide-react'

type ToastProps = {
  message: string
  type: 'success' | 'error'
  onDismiss: () => void
}

export default function Toast({ message, type, onDismiss }: ToastProps) {
  const bg = type === 'success' ? '#f0fdf4' : '#fef2f2'
  const border = type === 'success' ? '#bbf7d0' : '#fecaca'
  const color = type === 'success' ? '#16a34a' : '#dc2626'
  const Icon = type === 'success' ? Check : X

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 10,
        padding: '12px 16px',
        zIndex: 1000,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        minWidth: 240,
      }}
    >
      <Icon size={15} style={{ color, flexShrink: 0 }} />
      <span style={{ fontSize: 13, color: '#1d1d1f', flex: 1 }}>{message}</span>
      <button
        onClick={onDismiss}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b', padding: 0, display: 'flex' }}
      >
        <X size={13} />
      </button>
    </div>
  )
}
