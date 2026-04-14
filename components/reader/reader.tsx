'use client'
import { useEffect, useRef } from 'react';

import data from '@/content/data.json';

// ── Sections ──────────────────────────────────────────────────────────────────
import CeoStatement from '../sections/ceo-statement';
import EnvironmentOverview from '../sections/environment-overview';
import EmissionsSection from '../sections/emissions-section';
import EnergySection from '../sections/energy-section';
import WaterWasteSection from '../sections/waterwaste-section';
import ProductLifecycleSection from '../sections/productlifecycle-section';
import MaterialSection from '../sections/material-section';
import PeopleSection from '../sections/people-section';
import PayEquitySection from '../sections/payequity-section';
import CommunitySection from '../sections/community-section';
import SupplyChainSection from '../sections/supplychain-section';
import BoardSection from '../sections/board-section';
import RiskSection from '../sections/risk-section';
import EthicsSection from '../sections/ethics-section';

type ReaderProps = {
    onPageChange: (index: number) => void
}

export default function Reader({ onPageChange }: ReaderProps) {
    const scrollRef = useRef<HTMLElement>(null)

    // ── horizontal scroll via wheel (desktop only) ───────────────────────────
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const onWheel = (e: WheelEvent) => {
            if (window.innerWidth < 1024) return
            e.preventDefault()
            el.scrollLeft += e.deltaY
        }

        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [])

    // ── active page detection — horizontal on desktop, vertical on mobile ────
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const onScroll = () => {
            const sections = Array.from(
                el.querySelectorAll<HTMLElement>('[data-slug]')
            )
            if (sections.length === 0) return

            const isMobile = window.innerWidth < 1024

            const scrollMid = isMobile
                ? el.scrollTop + el.clientHeight / 2
                : el.scrollLeft + el.clientWidth / 2

            let closest = 0
            let closestDist = Infinity

            sections.forEach((section, i) => {
                const sectionMid = isMobile
                    ? section.offsetTop + section.clientHeight / 2
                    : section.offsetLeft + section.clientWidth / 2
                const dist = Math.abs(scrollMid - sectionMid)
                if (dist < closestDist) {
                    closestDist = dist
                    closest = i
                }
            })

            const slug = sections[closest].dataset.slug
            if (!slug) return
            const index = data.pages.findIndex(p => p.slug === slug)
            if (index !== -1) onPageChange(index)
        }

        // fire once on mount to set initial state
        onScroll()

        el.addEventListener('scroll', onScroll, { passive: true })
        return () => el.removeEventListener('scroll', onScroll)
    }, [onPageChange])

    return (
        <main
            ref={scrollRef}
            className="
                mt-[var(--spacing-header)]
                flex flex-col lg:flex-row
                overflow-y-auto lg:overflow-y-hidden
                overflow-x-hidden lg:overflow-x-auto
                h-[calc(100vh-var(--spacing-header))]
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
        >
            {/* ── Introduction ─────────────────────────────────────── */}
            <CeoStatement />

            {/* ── Environment ──────────────────────────────────────── */}
            <EnvironmentOverview />
            <EmissionsSection />
            <EnergySection />
            <WaterWasteSection />

            {/* ── Product ──────────────────────────────────────────── */}
            <ProductLifecycleSection />
            <MaterialSection />

            {/* ── Social ───────────────────────────────────────────── */}
            <PeopleSection />
            <PayEquitySection />
            <CommunitySection />
            <SupplyChainSection />

            {/* ── Governance ───────────────────────────────────────── */}
            <BoardSection />
            <RiskSection />
            <EthicsSection />
        </main>
    )
}