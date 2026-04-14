'use client'

import data from '@/content/data.json'

type HeaderProps = {
  activePageNumber: number
}

// Infer pillar label from slug prefix
function getPillar(slug: string): string {
  if (slug === 'ceo-statement')        return 'Introduction'
  if (slug.startsWith('environment'))  return 'Environment'
  if (slug.startsWith('product'))      return 'Product'
  if (slug.startsWith('social'))       return 'Social'
  if (slug.startsWith('governance'))   return 'Governance'
  return ''
}

export default function ReaderHeader({ activePageNumber }: HeaderProps) {
  const { pages } = data
  const activePage = pages[activePageNumber]

  return (
    // Fixed bar at the same height as GlobalNav — they share the top strip
    <div
      className="fixed top-0 left-0 w-full z-40 pointer-events-none"
      style={{ height: 'var(--spacing-header)' }}
    >
      {/* Centre: pillar · page title — sits between the GlobalNav hamburger+logo and the progress counter */}
      <div className="absolute inset-0 flex items-center justify-center px-48 pointer-events-none">
        <div className="hidden md:flex items-center gap-3 min-w-0">
          <span className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-neutral-400 shrink-0">
            {getPillar(activePage.slug)}
          </span>
          <span className="w-px h-3 bg-black/15 shrink-0" />
          <span className="text-[0.78rem] text-neutral-700 truncate">
            {activePage.title}
          </span>
        </div>
      </div>

      {/* Right: page counter + progress dots */}
      <div className="absolute right-0 top-0 h-full flex items-center gap-2 pr-6 pointer-events-none">
        <div className="hidden sm:flex items-center gap-1">
          {pages.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === activePageNumber ? 16 : 4,
                height:     4,
                background: i === activePageNumber ? '#1d1d1f' : '#d2d2d7',
              }}
            />
          ))}
        </div>
        <span className="text-[0.72rem] text-neutral-400 ml-1 tabular-nums">
          {activePageNumber + 1} / {pages.length}
        </span>
      </div>
    </div>
  )
}
