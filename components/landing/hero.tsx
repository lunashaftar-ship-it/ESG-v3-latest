'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import rawData from '@/content/data.json';

const { hero } = (rawData as any).landing;

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
};

export default function Hero() {
    const heroRef = useRef(null);

    // Split headline into words, flagging the highlight word
    const words = hero.headline.split(' ').map((w: string) => ({
        text: w,
        highlight: w === hero.highlightWord,
    }));

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-4 pt-16 pb-24"
        >
            <div className="container-lg">
                {/* Mobile stat card */}
                {hero.statCards[0] && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="block mx-auto lg:hidden w-32 h-32 relative mb-8 shrink-0"
                    >
                        <StatCard card={hero.statCards[0]} />
                    </motion.div>
                )}

                {/* Desktop left stat card */}
                {hero.statCards[0] && (
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden lg:block absolute left-32 top-1/2 translate-y-8 w-32"
                    >
                        <StatCard card={hero.statCards[0]} />
                    </motion.div>
                )}

                {/* Desktop right stat card */}
                {hero.statCards[1] && (
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2"
                    >
                        <StatCard card={hero.statCards[1]} />
                    </motion.div>
                )}

                {/* Centre content */}
                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl xl:max-w-4xl mx-auto gap-6 lg:px-40 xl:px-48">

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xs font-semibold tracking-[0.16em] uppercase text-neutral-500"
                    >
                        {hero.eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-[-0.03em] leading-[1.08] text-neutral-950 flex flex-wrap justify-center items-center gap-x-[0.2em] gap-y-1"
                    >
                        {words.map((w: { text: string; highlight: boolean }, i: number) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                                className={
                                    w.highlight
                                        ? 'inline-flex items-center bg-green-500 text-white px-3 py-0.5 rounded-lg'
                                        : ''
                                }
                            >
                                {w.text}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        className="text-base md:text-lg text-neutral-500 leading-relaxed font-light max-w-xl"
                    >
                        {hero.body}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-wrap items-center justify-center gap-3 mt-2"
                    >
                        <Link
                            href="#impact-number"
                            className="text-sm px-6 py-2.5 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
                        >
                            {hero.ctaPrimary}
                        </Link>
                        <Link
                            href="#pillars-gallery"
                            className="text-sm px-6 py-2.5 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
                        >
                            {hero.ctaSecondary}
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function StatCard({ card }: { card: { pillar: string; value: string; unit: string; label: string } }) {
    const colorMap: Record<string, string> = {
        Environment: 'text-green-700',
        Product: 'text-orange-600',
        Social: 'text-blue-700',
        Governance: 'text-violet-700',
    };
    const labelColor = colorMap[card.pillar] ?? 'text-neutral-500';
    return (
        <div className="bg-white border border-neutral-200 rounded-xl p-3 w-32 flex flex-col gap-1.5 shadow-sm">
            <span className={`text-[10px] font-medium uppercase tracking-widest ${labelColor}`}>{card.pillar}</span>
            <div className="text-2xl font-semibold tracking-tight text-neutral-950 leading-none">
                {card.value}<span className="text-sm font-normal text-neutral-400">{card.unit}</span>
            </div>
            <span className="text-[11px] text-neutral-500 leading-snug">{card.label}</span>
        </div>
    );
}
