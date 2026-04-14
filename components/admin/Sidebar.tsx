'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TOPICS } from '@/lib/types'
import type { ReportData } from '@/lib/types'

type Props = { data: ReportData }

const LANDING_ITEMS = [
  { slug: 'landing-hero',           label: 'Hero'            },
  { slug: 'landing-impact-numbers', label: 'Impact Numbers'  },
  { slug: 'landing-pillars',        label: 'Pillars Gallery' },
  { slug: 'landing-report-cta',     label: 'Report CTA'      },
]

function topicForSlug(slug: string): string {
  const prefix = slug.split('/')[0]
  return TOPICS.find(t => t.id === prefix)?.id ?? 'other'
}

export default function AdminSidebar({ data }: Props) {
  const pathname = usePathname()
  const isActive = (slug: string) => pathname === `/admin/${slug}`

  const activeSlug = pathname.replace('/admin/', '')
  const activeTopicId = topicForSlug(activeSlug)
  const isLandingActive = LANDING_ITEMS.some(i => isActive(i.slug))

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const init = new Set<string>()
    if (isLandingActive) init.add('landing')
    else init.add(activeTopicId)
    return init
  })

  const toggle = (id: string) =>
    setOpenGroups(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const ceoPage = data.pages.find(p => p.slug === 'ceo-statement')

  const topicGroups = TOPICS.map(topic => ({
    ...topic,
    pages: data.pages.filter(p => p.slug !== 'ceo-statement' && topicForSlug(p.slug) === topic.id),
  })).filter(g => g.pages.length > 0)

  return (
    <aside style={{
      width: 230, flexShrink: 0,
      borderRight: '1px solid #e8e8ed',
      background: '#ffffff',
      height: '100%',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: '-apple-system, "Helvetica Neue", sans-serif',
    }}>

      {/* Header */}
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #e8e8ed', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: 10, color: '#86868b', marginBottom: 2 }}>Content Editor</p>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f' }}>ESG Report</p>
        </div>
        <Link href="/" style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, border: '0.5px solid #d2d2d7', color: '#6e6e73', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          ↗ Preview
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>

        {/* Landing group */}
        <GroupTrigger label="Landing Page" color="#888888" count={LANDING_ITEMS.length} open={openGroups.has('landing')} onToggle={() => toggle('landing')} />
        {openGroups.has('landing') && (
          <div>
            {LANDING_ITEMS.map((item, i) => {
              const active = isActive(item.slug)
              return (
                <Link key={item.slug} href={`/admin/${item.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 12px 5px 28px', background: active ? '#f5f5f7' : 'transparent', textDecoration: 'none' }}>
                  <span style={{ fontSize: 10, color: active ? '#1d1d1f' : '#86868b', minWidth: 18, fontVariantNumeric: 'tabular-nums', fontWeight: active ? 500 : 400 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 12, color: active ? '#1d1d1f' : '#6e6e73', fontWeight: active ? 500 : 400 }}>{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}

        <div style={{ height: 1, background: '#e8e8ed', margin: '4px 0' }} />

        {/* CEO Statement */}
        {ceoPage && (
          <>
            <Link href="/admin/ceo-statement" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 12px 5px 20px', background: isActive('ceo-statement') ? '#f5f5f7' : 'transparent', textDecoration: 'none' }}>
              <span style={{ fontSize: 10, color: isActive('ceo-statement') ? '#1d1d1f' : '#86868b', minWidth: 18, fontWeight: isActive('ceo-statement') ? 500 : 400 }}>01</span>
              <span style={{ fontSize: 12, color: isActive('ceo-statement') ? '#1d1d1f' : '#6e6e73', fontWeight: isActive('ceo-statement') ? 500 : 400 }}>CEO Statement</span>
            </Link>
            <div style={{ height: 1, background: '#e8e8ed', margin: '4px 0' }} />
          </>
        )}

        {/* Topic groups */}
        {topicGroups.map(topic => (
          <div key={topic.id}>
            <GroupTrigger label={topic.label} color={topic.color} count={topic.pages.length} open={openGroups.has(topic.id)} onToggle={() => toggle(topic.id)} />
            {openGroups.has(topic.id) && (
              <div>
                {topic.pages.map((page, i) => {
                  const active = isActive(page.slug)
                  return (
                    <Link key={page.slug} href={`/admin/${page.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 12px 5px 28px', background: active ? '#f5f5f7' : 'transparent', textDecoration: 'none' }}>
                      <span style={{ fontSize: 10, color: active ? '#1d1d1f' : '#86868b', minWidth: 18, fontVariantNumeric: 'tabular-nums', fontWeight: active ? 500 : 400 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: 12, color: active ? '#1d1d1f' : '#6e6e73', fontWeight: active ? 500 : 400 }}>{(page as any).title}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid #e8e8ed', flexShrink: 0 }}>
        <Link href="/reader" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6e6e73', textDecoration: 'none' }}>↗ View report</Link>
      </div>
    </aside>
  )
}

function GroupTrigger({ label, color, count, open, onToggle }: { label: string; color: string; count: number; open: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '7px 14px', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f7')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: '#1d1d1f' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 10, color: '#86868b' }}>{count}</span>
        <span style={{ fontSize: 9, color: '#86868b', display: 'inline-block', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
      </div>
    </button>
  )
}
