"use client";

import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "ceo-statement") as unknown as {
    slug: string;
    title: string;
    name: string;
    role: string;
    imgSrc: string;
    header: string;
    paragraphs: string[];
};

export default function CeoStatement() {
    return (
        <section
            id="ceo-statement"
            data-slug="ceo-statement"
            className="shrink-0 w-full lg:w-[150vw] h-auto lg:h-full"
        >
            <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT — photo + signature ── */}
                <div className="
                    w-full lg:w-[50vw]
                    h-[45vh] lg:h-full
                    shrink-0 relative overflow-hidden
                    border-b lg:border-b-0 lg:border-r border-black/[0.08]
                    lg:pt-0
                ">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={page.imgSrc}
                        alt={page.name}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    {/* overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* name + role */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                        <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-white/60 mb-0">
                            {page.title}
                        </p>
                        <p className="text-white text-xl lg:text-[1.4rem] font-light leading-tight">
                            {page.name}
                        </p>
                        <p className="text-white/60 text-[0.75rem] mt-1">
                            {page.role}
                        </p>
                    </div>
                </div>

                {/* ── RIGHT — header + paragraphs ── */}
                <div className="
                    w-full lg:w-[100vw]
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[6vw]
                    pt-16 pb-10 lg:py-[7vh]
                    overflow-y-auto lg:overflow-hidden
                ">
                    {/* eyebrow */}
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4 lg:mb-4">
                        A message from leadership
                    </p>

                    {/* header quote */}
                    <h2 className="font-light text-[clamp(1.2rem,3vw,2.4rem)] leading-[1.22] text-[#1d1d1f] mb-4 lg:mb-3 max-w-2xl">
                        &ldquo;{page.header}&rdquo;
                    </h2>

                    {/* divider */}
                    <div className="w-12 h-px bg-[#1a7f37] mb-6 lg:mb-8" />

                    {/* paragraphs — 1 col mobile, 2 col desktop */}
                    <div className="columns-1 sm:columns-2 gap-[4vw] max-w-4xl">
                        {page.paragraphs.map((para, i) => (
                            <p
                                key={i}
                                className="text-[0.76rem] leading-[1.8] text-[#6e6e73] mb-4 break-inside-avoid"
                            >
                                {para}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}