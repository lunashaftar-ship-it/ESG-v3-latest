'use client'

import { useState, useCallback, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Check } from 'lucide-react'

import type { SectionPage } from '@/lib/types'
import { getTopicForSlug, isCeoPage } from '@/lib/types'
import SectionEditor from '@/components/admin/editors/SectionEditor'
import Toast from '@/components/admin/ui/Toast'

type ToastState = { message: string; type: 'success' | 'error' } | null

export default function AdminCatchAllPage() {
  const params = useParams()
  const slugParts = Array.isArray(params.slug) ? params.slug : [params.slug as string]
  const slug = slugParts.join('/')

  const [page, setPage] = useState<SectionPage | null>(null)
  const [slideId, setSlideId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  // Load from DB
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/slide?slug=${slug}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()

        setSlideId(data.id)
        setPage({
          slug: data.slug,
          title: data.title,
          header: data.header ?? '',
          eyebrow: data.eyebrow ?? undefined,
          body: data.paragraphs.map((p: any) => p.content),
          kpis: data.kpis.map((k: any) => ({ value: k.value, label: k.label })),
        })
      } catch {
        showToast('Page not found in database', 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  // Save to DB
  const save = async () => {
    if (!page || !slideId) return
    setSaving(true)
    try {
      const res = await fetch(`/api/slide/${slideId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: page.title,
          header: page.header,
          eyebrow: page.eyebrow,
          paragraphs: page.body ?? [],
          kpis: page.kpis ?? [],
        }),
      })
      if (!res.ok) throw new Error('Save failed')
      showToast('Changes saved ✓', 'success')
    } catch {
      showToast('Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  const topic = getTopicForSlug(slug)

  if (loading) return (
    <div style={{ padding: '60px 0', textAlign: 'center', color: '#86868b', fontSize: 14 }}>
      Loading…
    </div>
  )

  if (!page) return (
    <div style={{ padding: '60px 0', textAlign: 'center', color: '#86868b', fontSize: 14 }}>
      Page "{slug}" not found in database.
    </div>
  )

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36, paddingBottom: 24, borderBottom: '1px solid #e8e8ed' }}>
        <div>
          <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: topic.color, marginBottom: 4 }}>
            {topic.label}
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 300, color: '#1d1d1f', fontFamily: 'Georgia, serif', margin: 0 }}>
            {page.title}
          </h1>
        </div>

        <button
          onClick={save}
          disabled={saving}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: saving ? '#86868b' : '#1d1d1f', color: '#fff', border: 'none', borderRadius: 20, padding: '9px 22px', fontSize: 13, fontWeight: 500, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          <Check size={13} />
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      <SectionEditor
        page={page}
        onChange={setPage}
        topicColor={topic.color}
      />

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  )
}