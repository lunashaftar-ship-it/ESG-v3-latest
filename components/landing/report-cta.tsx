'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import rawData from '@/content/data.json';

const { reportCta } = (rawData as any).landing;

export default function ReportCTA() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} className="bg-neutral-950 px-6 lg:px-16 py-28">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                    className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500"
                >
                    {reportCta.eyebrow}
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                    className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]"
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {reportCta.heading}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                    className="text-sm text-neutral-400 leading-relaxed max-w-md"
                >
                    {reportCta.body}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    <a
                        href={reportCta.pdfPath}
                        download="Impact Report"
                        className="text-sm px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-500 text-white transition-colors inline-flex items-center gap-2"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {reportCta.ctaDownload}
                    </a>
                    <Link
                        href="/reader"
                        className="text-sm px-6 py-2.5 rounded-full border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                        {reportCta.ctaExplore} <span>→</span>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
