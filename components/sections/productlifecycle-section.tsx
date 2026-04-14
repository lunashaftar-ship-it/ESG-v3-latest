"use client";

import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "product/lifecycle") as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    features: { title: string; body: string }[];
    productFootprint: { title: string; data: { product: string; value: number }[] };
};

export default function ProductLifecycleSection() {
    const maxVal = Math.max(...page.productFootprint.data.map((d) => d.value));

    return (
        <section
            id="product-lifecycle"
            data-slug="product/lifecycle"
            className="shrink-0 w-full lg:w-[150vw] h-auto lg:h-full"
        >
            <div className="flex flex-col lg:flex-row lg:h-full">

                {/* ── LEFT ── */}
                <div className="
                    w-full lg:w-[50vw] lg:h-full
                    shrink-0 flex flex-col lg:justify-center
                    px-6 sm:px-10 lg:px-[5vw]
                    pt-[calc(52px+1.5rem)] pb-10 lg:py-[5vh]
                    border-b lg:border-b-0 lg:border-r border-black/[0.08]
                    lg:overflow-hidden
                ">
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4">
                        {page.eyebrow}
                    </p>
                    <h2 className="font-light text-[clamp(1.4rem,2.2vw,2.4rem)] leading-[1.18] text-[#1d1d1f] mb-5">
                        {page.header}
                    </h2>
                    {page.body.map((para, i) => (
                        <p key={i} className="text-[0.78rem] leading-[1.55] text-[#6e6e73] mb-1.5">
                            {para}
                        </p>
                    ))}

                    {/* feature cards 2×2 */}
                    <div className="mt-6 grid grid-cols-2 border-t border-black/[0.08]">
                        {page.features.map((f, i) => (
                            <div
                                key={f.title}
                                className={[
                                    "py-4",
                                    i % 2 === 0 ? "pr-5" : "pl-5 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <p className="text-[0.72rem] font-medium text-[#1d1d1f] mb-1">{f.title}</p>
                                <p className="text-[0.65rem] text-[#6e6e73] leading-relaxed">{f.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* KPIs */}
                    <div className="mt-5 grid grid-cols-2 gap-3 pt-5 border-t border-black/[0.08]">
                        {page.kpis.map((k) => (
                            <div key={k.label}>
                                <div className="text-[1.3rem] font-light leading-none mb-1 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.63rem] text-[#6e6e73] leading-snug">{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT — horizontal bar chart ── */}
                <div className="
                    w-full lg:w-[100vw] lg:h-full
                    shrink-0 flex flex-col
                    px-6 sm:px-10 lg:px-[4vw]
                    pt-10 pb-10 lg:py-[6vh]
                ">
                    {/* Chart title — always visible */}
                    <div className="flex justify-between items-end mb-6 shrink-0">
                        <p className="font-light text-[1.1rem] text-[#1d1d1f]">{page.productFootprint.title}</p>
                        <p className="text-[0.65rem] text-[#6e6e73]">kg CO₂e</p>
                    </div>

                    {/* Bar list
                        Mobile: natural height, no scroll
                        Desktop: fills remaining space, scrolls internally
                    */}
                    <div className="w-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-1 lg:min-h-0">
                        <div className="space-y-2.5">
                            {page.productFootprint.data.map((item) => {
                                const pct = (item.value / maxVal) * 100;
                                const isLow = item.value < 100;
                                return (
                                    <div key={item.product} className="flex items-center gap-3 lg:gap-4">
                                        <div className="w-[140px] sm:w-[180px] lg:w-[220px] shrink-0 text-[0.65rem] lg:text-[0.68rem] text-[#6e6e73] text-right">
                                            {item.product}
                                        </div>
                                        <div className="flex-1 h-6 bg-[#f5f5f7] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full flex items-center justify-end pr-2.5 transition-all duration-500"
                                                style={{
                                                    width: `${pct}%`,
                                                    background: isLow ? "#1a7f37" : "#1d1d1f",
                                                    minWidth: 40,
                                                }}
                                            >
                                                <span className="text-[0.6rem] font-medium text-white">{item.value}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Legend — pinned below bars, never clipped */}
                    <div className="mt-6 flex flex-wrap gap-5 shrink-0">
                        <div className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                            <span className="w-3 h-3 rounded-full bg-[#1a7f37] shrink-0" />
                            Under 100 kg CO₂e
                        </div>
                        <div className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                            <span className="w-3 h-3 rounded-full bg-[#1d1d1f] shrink-0" />
                            100 kg CO₂e and above
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}