'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import data from '@/content/data.json'

// ── Nav data ──────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 'environment',
    label: 'Environment',
    letter: 'E',
    color: '#4ade80',
    pages: [
      { title: 'Overview',            href: '/reader#environment' },
      { title: 'Climate & Emissions', href: '/reader#environment/emissions' },
      { title: 'Energy & Renewables', href: '/reader#environment/energy' },
      { title: 'Water & Waste',       href: '/reader#environment/water' },
    ],
  },
  {
    id: 'product',
    label: 'Product',
    letter: 'P',
    color: '#fb923c',
    pages: [
      { title: 'Product Lifecycle', href: '/reader#product/lifecycle' },
      { title: 'Material',          href: '/reader#product/material' },
    ],
  },
  {
    id: 'social',
    label: 'Social',
    letter: 'S',
    color: '#60a5fa',
    pages: [
      { title: 'Our People',   href: '/reader#social/people' },
      { title: 'Community',    href: '/reader#social/community' },
      { title: 'Supply Chain', href: '/reader#social/supply' },
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    letter: 'G',
    color: '#a78bfa',
    pages: [
      { title: 'Board & Leadership',    href: '/reader#governance/board' },
      { title: 'Risk & Compliance',     href: '/reader#governance/risk' },
      { title: 'Ethics & Transparency', href: '/reader#governance/ethics' },
    ],
  },
]

// ── Hamburger button ──────────────────────────────────────────────────────

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-neutral-100 transition-colors shrink-0"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block w-4 h-px bg-neutral-800 rounded-full origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        className="block w-4 h-px bg-neutral-800 rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block w-4 h-px bg-neutral-800 rounded-full origin-center"
      />
    </button>
  )
}

// ── Collapsible pillar group ──────────────────────────────────────────────

function PillarGroup({
  pillar,
  onClose,
}: {
  pillar: typeof PILLARS[number]
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
            style={{ background: pillar.color + '22', color: pillar.color }}
          >
            {pillar.letter}
          </div>
          <span className="text-sm font-medium" style={{ color: pillar.color }}>
            {pillar.label}
          </span>
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ color: '#a3a3a3', flexShrink: 0 }}
        >
          <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="flex flex-col gap-0.5 pl-3 pt-0.5 pb-1">
              {pillar.pages.map(page => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: pillar.color, opacity: 0.5 }}
                  />
                  {page.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Sidebar panel ─────────────────────────────────────────────────────────

function HamburgerSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { company } = data

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dark overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0"
            style={{ background: 'rgba(0,0,0,0.45)', zIndex: 300, backdropFilter: 'blur(2px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 h-full flex flex-col"
            style={{
              width: 288,
              background: '#fafafa',
              zIndex: 400,
              borderRight: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '4px 0 40px rgba(0,0,0,0.12)',
            }}
          >
            {/* Header row */}
            <div
              className="flex items-center justify-between px-5 shrink-0"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', height: 'var(--spacing-header)' }}
            >
              <Link href="/" onClick={onClose}>
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={90}
                  height={24}
                  className="object-contain"
                />
              </Link>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Scrollable nav */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">

              {/* Top-level flat links */}
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/reader"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Full Report
              </Link>
              <Link
                href="/progress"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Progress Reports
              </Link>
              <Link
                href="/reader#ceo-statement"
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                CEO Statement
              </Link>

              {/* Divider */}
              <div className="my-2" style={{ height: 1, background: 'rgba(0,0,0,0.06)' }} />

              {/* Collapsible pillar groups */}
              {PILLARS.map(pillar => (
                <PillarGroup key={pillar.id} pillar={pillar} onClose={onClose} />
              ))}

            </nav>

            {/* Footer: Admin CTA */}
            <div
              className="px-4 py-4 shrink-0"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{ background: '#1d1d1f', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#333' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1d1d1f' }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1v1M6.5 11v1M1 6.5h1M11 6.5h1M2.9 2.9l.7.7M9.4 9.4l.7.7M10.1 2.9l-.7.7M3.6 9.4l-.7.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  <circle cx="6.5" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                Admin Panel
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Main export ───────────────────────────────────────────────────────────

export default function GlobalNav() {
  const { company } = data
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      if (current > lastScrollY.current && current > 120) {
        setNavHidden(true)
      } else {
        setNavHidden(false)
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  // Never render on admin pages — the admin has its own chrome
  if (pathname?.startsWith('/admin')) return null

  const isReaderPage = pathname?.startsWith('/reader')

  return (
    <>
      <motion.header
        animate={{ y: navHidden ? -80 : 0, opacity: navHidden ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          className="container-lg flex items-center justify-between"
          style={{ height: 'var(--spacing-header)' }}
        >
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            <HamburgerButton open={sidebarOpen} onClick={() => setSidebarOpen(v => !v)} />
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src={company.logo}
                alt={company.name}
                width={108}
                height={28}
                loading="eager"
                className="object-contain"
              />
            </Link>
          </div>

          {!isReaderPage && (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/progress"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-neutral-200 px-3 py-2 text-xs text-neutral-700 transition-colors hover:bg-neutral-50 sm:px-4 sm:text-sm md:px-5"
              >
                Progress Reports
              </Link>

              <Link
                href="/reader"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-neutral-200 px-3 py-2 text-xs text-neutral-700 transition-colors hover:bg-neutral-50 sm:px-4 sm:text-sm md:px-5"
              >
                Read Report
              </Link>
            </div>
          )}
        </div>
      </motion.header>

      <HamburgerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
