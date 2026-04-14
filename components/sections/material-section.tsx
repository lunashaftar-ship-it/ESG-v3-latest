"use client";

import data from "@/content/data.json";

// Type definition remains the same
const page = data.pages.find((p) => p.slug === "product/material") as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    materials: { name: string; current: number; target: number; targetYear: number }[];
    packaging: {
        title: string;
        data: { year: number; recycledFiber: number; virginFiber: number; plastic: number }[];
    };
    footnote: string;
};

export default function MaterialSection() {
    return (
        <section
            id="product-material"
            data-slug="product/material"
            className="shrink-0 w-full lg:w-[160vw] min-h-screen lg:h-screen bg-white"
        >
            <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT SECTION: Text & KPIs ── */}
                <div className="
                    w-full lg:w-[40vw] 
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    py-12 lg:py-0
                    border-b lg:border-b-0 lg:border-r border-black/[0.08]
                ">
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4">
                        {page.eyebrow}
                    </p>
                    <h2 className="font-light text-[clamp(1.4rem,2.2vw,2.4rem)] leading-[1.18] text-[#1d1d1f] mb-5">
                        {page.header}
                    </h2>
                    {page.body.map((para, i) => (
                        <p key={i} className="text-[0.78rem] leading-[1.75] text-[#6e6e73] mb-3">{para}</p>
                    ))}

                    <div className="mt-8 grid grid-cols-2 border-t border-black/[0.08]">
                        {page.kpis.map((k, i) => (
                            <div
                                key={k.label}
                                className={[
                                    "py-5",
                                    i % 2 === 0 ? "pr-6" : "pl-6 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <div className="text-[1.5rem] font-light leading-none mb-1 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.65rem] text-[#6e6e73] leading-snug">{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT SECTION: Charts ── */}
                <div className="
                    w-full lg:w-[120vw]
                    h-auto lg:h-full
                    flex flex-col lg:flex-row
                    px-6 sm:px-10 lg:px-0
                    py-12 lg:py-0
                    gap-12 lg:gap-0
                ">
                    {/* CHART 1: Recycled Content */}
                    <div className="flex-1 lg:px-[4vw] flex flex-col justify-center lg:border-r lg:border-black/[0.05]">
                        <p className="font-light text-[1.1rem] text-[#1d1d1f] mb-8">
                            Recycled content by material — FY2024
                        </p>
                        <div className="space-y-6">
                            {page.materials.map((m) => {
                                const done = m.current >= m.target;
                                return (
                                    <div key={m.name} className="w-full">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-[0.75rem] font-medium text-[#1d1d1f]">{m.name}</span>
                                            <span className="text-[0.65rem] text-[#6e6e73]">Target: {m.target}% by {m.targetYear}</span>
                                        </div>
                                        <div className="relative h-8 bg-[#f5f5f7] rounded-full overflow-hidden">
                                            <div className="absolute top-0 h-full border-r border-dashed border-[#d2d2d7] z-10" style={{ left: `${m.target}%` }} />
                                            <div
                                                className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
                                                style={{ width: `${m.current}%`, background: done ? "#1a7f37" : "#1d1d1f", minWidth: 45 }}
                                            >
                                                <span className="text-[0.65rem] font-medium text-white">{m.current}%</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CHART 2: Packaging Trend */}
                    <div className="flex-1 lg:px-[4vw] flex flex-col justify-center bg-[#fbfbfd] lg:bg-transparent py-10 lg:py-0 rounded-2xl lg:rounded-none">
                        <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-6">
                            {page.packaging.title}
                        </p>
                        <div className="space-y-4 mb-8">
                            {page.packaging.data.map((row) => (
                                <div key={row.year} className="flex items-center gap-4">
                                    <span className="text-[0.7rem] font-medium text-[#1d1d1f] w-8 shrink-0">{row.year}</span>
                                    <div className="flex-1 flex h-5 rounded-full overflow-hidden">
                                        <div style={{ width: `${row.recycledFiber}%`, background: "#1d1d1f" }} />
                                        <div style={{ width: `${row.virginFiber}%`, background: "#6e6e73" }} />
                                        <div style={{ width: `${row.plastic}%`, background: "#d2d2d7" }} />
                                    </div>
                                    <span className="text-[0.65rem] font-semibold text-[#1a7f37] w-14 shrink-0 text-right">{row.plastic}% plastic</span>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
                            {[
                                { color: "#1d1d1f", label: "Recycled fiber" },
                                { color: "#6e6e73", label: "Virgin fiber (responsible)" },
                                { color: "#d2d2d7", label: "Plastic" },
                            ].map((l) => (
                                <div key={l.label} className="flex items-center gap-2 text-[0.65rem] text-[#6e6e73]">
                                    <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: l.color }} />
                                    {l.label}
                                </div>
                            ))}
                        </div>

                        <p className="text-[0.65rem] text-[#86868b] leading-relaxed italic border-t border-black/[0.05] pt-4">
                            {page.footnote}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}