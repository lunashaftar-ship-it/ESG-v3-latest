'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import rawData from '@/content/data.json';

const pillars: Array<{
    index: string; letter: string; title: string; subtitle: string;
    description: string; href: string; image: string; accentColor: string;
}> = (rawData as any).landing.pillars;

const CARD_GAP = 16;
const PEEK = 80;

export default function PillarsGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(640);

    useEffect(() => {
        const update = () => setCardWidth(window.innerWidth < 640 ? window.innerWidth - 48 : 640);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ['0px', `-${pillars.length * (cardWidth + CARD_GAP) - 600}px`]
    );

    return (
        <section
            id="pillars-gallery"
            ref={sectionRef}
            className="relative"
            style={{ height: `${pillars.length * 100 + 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

                <div className="px-6 lg:px-16 mb-10 flex items-end justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400 mb-2">
                            Our framework
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 leading-tight">
                            Four pillars.<br />One commitment.
                        </h2>
                    </div>
                    <p className="hidden md:block text-sm text-neutral-400 mb-1">Scroll to explore →</p>
                </div>

                <div className="pl-6 lg:pl-16">
                    <motion.div style={{ x }} className="flex gap-4 will-change-transform">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={pillar.index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                                className="relative shrink-0 rounded-2xl overflow-hidden"
                                style={{ width: cardWidth, height: 420 }}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-neutral-900"
                                    style={{ backgroundImage: `url(${pillar.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                <div
                                    className="absolute right-4 top-4 text-[120px] font-bold leading-none select-none pointer-events-none"
                                    style={{ color: pillar.accentColor, opacity: 0.08 }}
                                >
                                    {pillar.letter}
                                </div>
                                <div className="relative h-full flex flex-col justify-between p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold tabular-nums" style={{ color: pillar.accentColor }}>
                                            {pillar.index}
                                        </span>
                                        <Link
                                            href={pillar.href}
                                            className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                                        >↗</Link>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-widest text-white/50 mb-1">{pillar.subtitle}</p>
                                            <h3 className="text-2xl font-semibold tracking-tight text-white leading-tight">{pillar.title}</h3>
                                        </div>
                                        <p className="text-sm text-white/70 leading-relaxed">{pillar.description}</p>
                                        <Link
                                            href={pillar.href}
                                            className="text-sm font-medium flex items-center gap-1.5 mt-1 transition-opacity hover:opacity-70"
                                            style={{ color: pillar.accentColor }}
                                        >
                                            Explore {pillar.title} <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        <div style={{ minWidth: PEEK }} />
                    </motion.div>
                </div>

                <div className="px-6 lg:px-16 mt-8 flex gap-2">
                    {pillars.map((_, i) => (
                        <motion.div key={i} className="h-0.5 rounded-full bg-neutral-200 overflow-hidden" style={{ width: 32 }}>
                            <motion.div
                                className="h-full bg-neutral-900 rounded-full origin-left"
                                style={{
                                    scaleX: useTransform(
                                        scrollYProgress,
                                        [i / pillars.length, (i + 1) / pillars.length],
                                        [0, 1]
                                    ),
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
