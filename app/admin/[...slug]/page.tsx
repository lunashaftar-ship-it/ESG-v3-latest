'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Check } from 'lucide-react'

import rawData from '@/content/data.json'
import type { ReportData, Page, CeoPage, SectionPage } from '@/lib/types'
import { getTopicForSlug, isCeoPage } from '@/lib/types'

import CeoEditor from '@/components/admin/editors/CeoEditor'
import SectionEditor from '@/components/admin/editors/SectionEditor'
import Toast from '@/components/admin/ui/Toast'

const initialData = rawData as unknown as ReportData

type ToastState = { message: string; type: 'success' | 'error' } | null

export default function AdminCatchAllPage() {
  const params = useParams()
  const slugParts = Array.isArray(params.slug) ? params.slug : [params.slug as string]
  const slug = slugParts.join('/')

  const [data, setData] = useState<ReportData>(initialData)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const save = async (nextData: ReportData) => {
    setSaving(true)
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextData),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Save failed')
      setData(nextData)
      showToast('Changes saved', 'success')
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  const updatePage = useCallback((updated: Page) => {
    setData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.slug === updated.slug ? updated : p),
    }))
  }, [])

  const page = data.pages.find(p => p.slug === slug)
  const topic = page ? getTopicForSlug(page.slug) : null

  let editorContent: React.ReactNode = null

  if (!page) {
    editorContent = (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#86868b', fontSize: 14 }}>
        Page &quot;{slug}&quot; not found in data.json.
      </div>
    )
  } else if (isCeoPage(page)) {
    editorContent = (
      <CeoEditor page={page as CeoPage} onChange={updatePage} />
    )
  } else {
    editorContent = (
      <SectionEditor
        page={page as SectionPage}
        onChange={updatePage}
        topicColor={topic?.color ?? '#6e6e73'}
      />
    )
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 48px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 36,
          paddingBottom: 24,
          borderBottom: '1px solid #e8e8ed',
        }}
      >
        <div>
          {topic && (
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: topic.color, marginBottom: 4 }}>
              {topic.label}
            </p>
          )}
          <h1 style={{ fontSize: 22, fontWeight: 300, color: '#1d1d1f', fontFamily: 'Georgia, serif', margin: 0 }}>
            {page ? (page as any).title ?? slug : slug}
          </h1>
        </div>

        <button
          onClick={() => save(data)}
          disabled={saving}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: saving ? '#86868b' : '#1d1d1f',
            color: '#ffffff',
            border: 'none',
            borderRadius: 20,
            padding: '9px 22px',
            fontSize: 13,
            fontWeight: 500,
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
        >
          <Check size={13} />
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {editorContent}

      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}
    </div>
  )
}
