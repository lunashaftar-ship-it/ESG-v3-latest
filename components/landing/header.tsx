"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import data from "@/content/data.json";

export default function Header() {
    const { company } = data;

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (current > previous && current > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.header
            className="fixed top-0 left-0 z-50 w-full border-b border-black/6 bg-white/90 backdrop-blur-sm"
            animate={{
                y: hidden ? -140 : 0,
                opacity: hidden ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <nav className="container-lg flex min-h-header items-center justify-between gap-3 py-3">
                <Link href="/" className="flex min-w-0 shrink-0 items-center">
                    <Image
                        src={company.logo}
                        alt={company.name}
                        width={120}
                        height={30}
                        loading="eager"
                        className="h-7 w-auto object-contain sm:h-8"
                    />
                </Link>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
            </nav>
        </motion.header>
    );
}