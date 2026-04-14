'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Check } from 'lucide-react'

import rawData from '@/content/data.json'
import type { ReportData, Page, CeoPage, SectionPage } from '@/lib/types'
import { getTopicForSlug, isCeoPage } from '@/lib/types'

import CeoEditor from '@/components/admin/editors/CeoEditor'
import SectionEditor from '@/components/admin/editors/SectionEditor'
import {
  HeroEditor,
  ImpactNumbersEditor,
  PillarsEditor,
  ReportCtaEditor,
} from '@/components/admin/editors/LandingEditors'
import Toast from '@/components/admin/ui/Toast'

const initialData = rawData as unknown as ReportData & { landing: any }

type ToastState = { message: string; type: 'success' | 'error' } | null

const LANDING_META: Record<string, { title: string; description: string }> = {
  'landing-hero':           { title: 'Hero',            description: 'Main headline, body copy and stat cards' },
  'landing-impact-numbers': { title: 'Impact Numbers',  description: 'Section heading, body text and stat cards' },
  'landing-pillars':        { title: 'Pillars Gallery', description: 'The four E/P/S/G pillar cards' },
  'landing-report-cta':     { title: 'Report CTA',      description: 'Bottom call-to-action section' },
}

export default function AdminSlugPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : (params.slug as string)

  const [data, setData] = useState<any>(initialData)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const save = async (nextData: any) => {
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
    setData((prev: any) => ({
      ...prev,
      pages: prev.pages.map((p: Page) => p.slug === updated.slug ? updated : p),
    }))
  }, [])

  // ── Resolve editor + metadata ────────────────────────────────────────────

  const landingMeta = LANDING_META[slug]
  const page = !landingMeta ? (data as ReportData).pages.find(p => p.slug === slug) : undefined
  const topic = page ? getTopicForSlug(page.slug) : null

  const pageTitle = landingMeta?.title ?? (page ? (page as any).title ?? slug : slug)
  const pageDescription = landingMeta?.description ?? (topic ? topic.label : '')

  // ── Editor ────────────────────────────────────────────────────────────────

  let editorContent: React.ReactNode = null

  if (slug === 'landing-hero') {
    editorContent = (
      <HeroEditor
        hero={data.landing.hero}
        onChange={hero => setData((p: any) => ({ ...p, landing: { ...p.landing, hero } }))}
      />
    )
  } else if (slug === 'landing-impact-numbers') {
    editorContent = (
      <ImpactNumbersEditor
        impactNumbers={data.landing.impactNumbers}
        onChange={impactNumbers => setData((p: any) => ({ ...p, landing: { ...p.landing, impactNumbers } }))}
      />
    )
  } else if (slug === 'landing-pillars') {
    editorContent = (
      <PillarsEditor
        pillars={data.landing.pillars}
        onChange={pillars => setData((p: any) => ({ ...p, landing: { ...p.landing, pillars } }))}
      />
    )
  } else if (slug === 'landing-report-cta') {
    editorContent = (
      <ReportCtaEditor
        reportCta={data.landing.reportCta}
        onChange={reportCta => setData((p: any) => ({ ...p, landing: { ...p.landing, reportCta } }))}
      />
    )
  } else if (!page) {
    editorContent = (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#86868b', fontSize: 14 }}>
        Page &quot;{slug}&quot; not found in data.json.
      </div>
    )
  } else if (isCeoPage(page)) {
    editorContent = <CeoEditor page={page as CeoPage} onChange={updatePage} />
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

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36, paddingBottom: 24, borderBottom: '1px solid #e8e8ed' }}>
        <div>
          {pageDescription && (
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: topic?.color ?? '#888', marginBottom: 4 }}>
              {pageDescription}
            </p>
          )}
          <h1 style={{ fontSize: 22, fontWeight: 300, color: '#1d1d1f', fontFamily: 'Georgia, serif', margin: 0 }}>
            {pageTitle}
          </h1>
        </div>

        <button
          onClick={() => save(data)}
          disabled={saving}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: saving ? '#86868b' : '#1d1d1f', color: '#ffffff', border: 'none', borderRadius: 20, padding: '9px 22px', fontSize: 13, fontWeight: 500, cursor: saving ? 'not-allowed' : 'pointer', transition: 'background 0.15s', flexShrink: 0 }}
        >
          <Check size={13} />
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      {editorContent}

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  )
}
