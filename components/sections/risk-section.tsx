"use client";

import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "governance/risk") as unknown as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    riskAreas: { name: string; level: string; trend: string; body: string }[];
};

const LEVEL_STYLE: Record<string, string> = {
    high: "bg-[#1d1d1f] text-white",
    medium: "bg-[#f5f5f7] text-[#6e6e73]",
    low: "bg-[#d1fae5] text-[#1a7f37]",
};

const TREND_ICON: Record<string, string> = {
    active: "↑",
    monitored: "→",
    stable: "—",
};

export default function RiskSection() {
    return (
        <section
            id="governance-risk"
            data-slug="governance/risk"
            className="shrink-0 w-full lg:w-[150vw] h-auto lg:h-full"
        >
            <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT ── */}
                <div className="
                    w-full lg:w-[50vw]
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[5vw]
                    py-10 lg:py-[5vh]
                    border-b lg:border-b-0 lg:border-r border-black/[0.08]
                    overflow-y-auto lg:overflow-hidden
                ">
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4">{page.eyebrow}</p>
                    <h2 className="font-light text-[clamp(1.4rem,2.2vw,2.4rem)] leading-[1.18] text-[#1d1d1f] mb-5">{page.header}</h2>
                    {page.body.map((para, i) => (
                        <p key={i} className="text-[0.78rem] leading-[1.75] text-[#6e6e73] mb-3">{para}</p>
                    ))}

                    {/* KPI 2×2 */}
                    <div className="mt-6 grid grid-cols-2 border-t border-black/[0.08]">
                        {page.kpis.map((k, i) => (
                            <div
                                key={k.label}
                                className={[
                                    "py-4",
                                    i % 2 === 0 ? "pr-5" : "pl-5 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <div className="text-[1.3rem] font-light leading-none mb-1 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.65rem] text-[#6e6e73] leading-snug">{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT — risk cards ── */}
                <div className="
                    w-full lg:w-[100vw]
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    py-10 lg:py-[6vh]
                    overflow-y-auto lg:overflow-hidden
                ">
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-6">
                        Key risk areas
                    </p>

                    <div className="space-y-0 flex-1 flex flex-col justify-center">
                        {page.riskAreas.map((r) => (
                            <div key={r.name} className="flex gap-4 lg:gap-5 py-4 border-b border-black/[0.06] last:border-0 items-start">
                                <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
                                    <span className={[
                                        "text-[0.55rem] font-medium tracking-[0.08em] uppercase px-2.5 py-1 rounded-full",
                                        LEVEL_STYLE[r.level] ?? "bg-[#f5f5f7] text-[#6e6e73]",
                                    ].join(" ")}>
                                        {r.level}
                                    </span>
                                    <span className="text-[0.75rem] text-[#6e6e73]" title={r.trend}>
                                        {TREND_ICON[r.trend] ?? "→"}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[0.75rem] font-medium text-[#1d1d1f] mb-1">{r.name}</p>
                                    <p className="text-[0.68rem] text-[#6e6e73] leading-relaxed">{r.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* legend */}
                    <div className="flex flex-wrap gap-4 lg:gap-6 mt-4 shrink-0">
                        {[
                            { style: LEVEL_STYLE.high, label: "High risk" },
                            { style: LEVEL_STYLE.medium, label: "Medium risk" },
                        ].map((l) => (
                            <div key={l.label} className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                                <span className={`px-2 py-0.5 rounded-full text-[0.55rem] font-medium ${l.style}`}>
                                    {l.label.split(" ")[0].toLowerCase()}
                                </span>
                                {l.label}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                            <span className="text-sm">↑</span> Active / Growing
                        </div>
                        <div className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                            <span className="text-sm">→</span> Monitored
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}