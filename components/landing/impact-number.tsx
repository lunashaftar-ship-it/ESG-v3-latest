'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import rawData from '@/content/data.json';

const { impactNumbers } = (rawData as any).landing;

const PILLAR_COLORS: Record<string, {
    labelColor: string; valueColor: string; unitColor: string;
    descColor: string; bg: string; border: string;
}> = {
    Environment: { labelColor: 'text-green-700',  valueColor: 'text-green-950',  unitColor: 'text-green-600',  descColor: 'text-green-800',  bg: 'bg-green-50',  border: 'border-green-200'  },
    Product:     { labelColor: 'text-orange-600', valueColor: 'text-orange-950', unitColor: 'text-orange-500', descColor: 'text-orange-800', bg: 'bg-orange-50', border: 'border-orange-200' },
    Social:      { labelColor: 'text-blue-700',   valueColor: 'text-blue-950',   unitColor: 'text-blue-500',   descColor: 'text-blue-800',   bg: 'bg-blue-50',   border: 'border-blue-200'   },
    Governance:  { labelColor: 'text-violet-700', valueColor: 'text-violet-950', unitColor: 'text-violet-500', descColor: 'text-violet-800', bg: 'bg-violet-50', border: 'border-violet-200' },
};

function Counter({ value, unit, inView, delay, valueColor, unitColor }: {
    value: number; unit: string; inView: boolean; delay: number;
    valueColor: string; unitColor: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (!inView || !ref.current) return;
        const node = ref.current;
        const controls = animate(0, value, {
            duration: 2, delay,
            ease: [0.22, 1, 0.36, 1] as const,
            onUpdate(v) { node.textContent = Math.round(v).toString(); },
        });
        return () => controls.stop();
    }, [inView, value, delay]);

    return (
        <div className={`text-4xl font-bold tracking-[-0.04em] leading-none ${valueColor}`}>
            <span ref={ref}>0</span>
            <span className={`text-xl font-normal ${unitColor}`}>{unit}</span>
        </div>
    );
}

export default function ImpactNumbers() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: '-80px' });

    return (
        <section id="impact-number" ref={sectionRef} className="bg-neutral-50">
            <div className="container-lg py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                        className="flex flex-col gap-5"
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                            {impactNumbers.eyebrow}
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 leading-tight">
                            {impactNumbers.heading}
                        </h2>
                        {impactNumbers.body.map((para: string, i: number) => (
                            <p key={i} className="text-sm text-neutral-500 leading-relaxed">{para}</p>
                        ))}
                        <div className="mt-1">
                            <a href="#" className="text-sm px-5 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors inline-flex items-center gap-1">
                                {impactNumbers.ctaLabel}
                                <span className="text-neutral-400">→</span>
                            </a>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3">
                        {impactNumbers.stats.map((stat: any, i: number) => {
                            const c = PILLAR_COLORS[stat.pillar] ?? PILLAR_COLORS['Governance'];
                            return (
                                <motion.div
                                    key={stat.pillar}
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                                    className={`rounded-xl p-4 border flex flex-col gap-2 ${c.bg} ${c.border}`}
                                >
                                    <span className={`text-[10px] font-medium uppercase tracking-widest ${c.labelColor}`}>
                                        {stat.pillar}
                                    </span>
                                    <Counter value={stat.value} unit={stat.unit} inView={inView} delay={0.2 + i * 0.1} valueColor={c.valueColor} unitColor={c.unitColor} />
                                    <p className={`text-xs leading-snug ${c.descColor}`}>{stat.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
