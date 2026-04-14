'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import data from '@/content/data.json';

const { name, role, imgSrc, header, slug } = data.pages.find(
    (p: any) => p.slug === 'ceo-statement'
)!;

export default function CEOTeaser() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const initials = name!
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <section ref={ref} className="bg-neutral-50">
            <div className="container-lg py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-center">

                    {/* Left — image + name */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                        className="flex flex-col gap-4"
                    >
                        <div className="w-full aspect-square overflow-hidden bg-neutral-100 relative">
                            {imgSrc ? (
                                <Image
                                    src={imgSrc}
                                    alt={name}
                                    fill
                                    className="object-cover object-top"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-neutral-300">
                                    {initials}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-900">{name}</p>
                            <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{role}</p>
                        </div>
                    </motion.div>

                    {/* Right — eyebrow + quote + divider + CTA */}
                    <div className="flex flex-col gap-6">

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                            className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400"
                        >
                            CEO Statement
                        </motion.p>

                        <motion.blockquote
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
                            className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900 leading-[1.4] m-0"
                        >
                            "{header}"
                        </motion.blockquote>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={inView ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                            className="w-10 h-px bg-neutral-200 origin-left"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                            className="flex justify-end"
                        >
                            <Link
                                href={`/reader#${slug}`}
                                className="text-sm px-5 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors inline-flex items-center gap-1.5"
                            >
                                Read full statement
                                <span className="text-neutral-400">↗</span>
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}