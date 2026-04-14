"use client";

import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "environment") as {
    slug: string;
    header: string;
    intro: string;
    kpis: { value: string; label: string }[];
    pillars: { icon: string; title: string; body: string }[];
};

const ICONS: Record<string, string> = {
    emissions: "↓",
    energy: "⚡",
    materials: "♻",
    water: "◈",
};

export default function EnvironmentOverview() {
    return (
        <section
            id="environment"
            data-slug="environment"
            className="shrink-0 w-full lg:w-[150vw] h-auto lg:h-full"
        >
            <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT — header + KPIs ── */}
                <div className="
                    w-full lg:w-[50vw]
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[5vw]
                    py-10 lg:py-[5vh]
                    border-b lg:border-b-0 lg:border-r border-black/[0.08]
                    overflow-y-auto lg:overflow-hidden
                ">
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4">
                        Environmental Initiatives · Overview
                    </p>

                    <h2 className="font-light text-[clamp(1.4rem,2.4vw,2.6rem)] leading-[1.18] text-[#1d1d1f] mb-5">
                        {page.header}
                    </h2>

                    <p className="text-[0.78rem] leading-[1.75] text-[#6e6e73] mb-8 max-w-prose">
                        {page.intro}
                    </p>

                    {/* KPI 2×2 */}
                    <div className="grid grid-cols-2 border-t border-black/[0.08]">
                        {page.kpis.map((k, i) => (
                            <div
                                key={k.label}
                                className={[
                                    "py-4",
                                    i % 2 === 0 ? "pr-6" : "pl-6 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <div className="text-[1.7rem] font-light leading-none mb-1 text-[#1d1d1f]">
                                    {k.value}
                                </div>
                                <div className="text-[0.68rem] text-[#6e6e73]">{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT — 4 pillars ── */}
                <div className="
                    w-full lg:w-[100vw]
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    py-10 lg:py-[6vh]
                    overflow-y-auto lg:overflow-hidden
                ">
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-6 lg:mb-8">
                        Four focus areas
                    </p>

                    <div className="
                        grid grid-cols-1 sm:grid-cols-2
                        gap-px bg-black/[0.06]
                        border border-black/[0.06]
                        rounded-2xl overflow-hidden
                        lg:flex-1 lg:max-h-[72vh]
                    ">
                        {page.pillars.map((pillar) => (
                            <div
                                key={pillar.title}
                                className="bg-white flex flex-col justify-between p-6 lg:p-8"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-full bg-[#1d1d1f] flex items-center justify-center mb-4 lg:mb-5 text-white text-[1rem]">
                                        {ICONS[pillar.icon] ?? "·"}
                                    </div>
                                    <h3 className="font-medium text-[1rem] text-[#1d1d1f] mb-3">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-[0.75rem] leading-[1.7] text-[#6e6e73]">
                                        {pillar.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}