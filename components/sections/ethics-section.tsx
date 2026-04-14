"use client";

import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "governance/ethics") as unknown as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    frameworks: { name: string; status: string; since: string }[];
    bonds: {
        total: string;
        label: string;
        issuances: { year: number; amount: string; label: string }[];
        allocationCategories: { name: string; pct: number }[];
    };
    mandatoryTraining: string[];
    footnote: string;
};

export default function EthicsSection() {
    return (
        <section
            id="governance-ethics"
            data-slug="governance/ethics"
            className="shrink-0 w-full lg:w-[150vw] h-auto lg:h-full"
        >
            <div className="flex flex-col lg:flex-row lg:h-full">

                {/* ── LEFT ── */}
                <div className="
                    w-full lg:w-[50vw] lg:h-full
                    shrink-0 flex flex-col lg:justify-center
                    px-6 sm:px-10 lg:px-[5vw]
                    pt-[calc(52px+1.5rem)] pb-10 lg:py-[4vh]
                    border-b lg:border-b-0 lg:border-r border-black/[0.08]
                    overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                ">
                    <p className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-1.5">
                        {page.eyebrow}
                    </p>
                    <h2 className="font-light text-[clamp(1.1rem,1.7vw,1.9rem)] leading-[1.15] text-[#1d1d1f] mb-2">
                        {page.header}
                    </h2>
                    {page.body.map((para, i) => (
                        <p key={i} className="text-[0.72rem] leading-[1.55] text-[#6e6e73] mb-1.5">{para}</p>
                    ))}

                    {/* KPI 2x2 */}
                    <div className="mt-3 grid grid-cols-2 border-t border-black/[0.08]">
                        {page.kpis.map((k, i) => (
                            <div
                                key={k.label}
                                className={[
                                    "py-2",
                                    i % 2 === 0 ? "pr-5" : "pl-5 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <div className="text-[1.15rem] font-light leading-none mb-0.5 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.6rem] text-[#6e6e73] leading-snug">{k.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* mandatory training list */}
                    <div className="mt-3 pt-3 border-t border-black/[0.08]">
                        <p className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-[#6e6e73] mb-1.5">
                            Mandatory annual training
                        </p>
                        <ul className="space-y-1">
                            {page.mandatoryTraining.map((item, i) => (
                                <li key={i} className="flex gap-2 text-[0.62rem] text-[#6e6e73] leading-snug">
                                    <span className="text-[#1d1d1f] shrink-0">·</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* ── RIGHT ── */}
                <div className="
                    w-full lg:w-[100vw]
                    shrink-0 flex flex-col lg:justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    pt-10 pb-10 lg:pt-[6vh] lg:pb-[6vh]
                    gap-6 lg:gap-8
                ">

                    {/* Frameworks table */}
                    <div className="shrink-0">
                        <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-1">
                            Reporting frameworks & standards
                        </p>
                        <div className="w-full overflow-x-auto rounded-xl border border-black/[0.08]">
                            <div className="grid grid-cols-3 bg-[#f5f5f7] px-4 py-2.5 min-w-[360px]">
                                <span className="text-[0.6rem] font-medium text-[#6e6e73] uppercase tracking-[0.08em]">Framework</span>
                                <span className="text-[0.6rem] font-medium text-[#6e6e73] uppercase tracking-[0.08em]">Status</span>
                                <span className="text-[0.6rem] font-medium text-[#6e6e73] uppercase tracking-[0.08em]">Since</span>
                            </div>
                            {page.frameworks.map((f, i) => (
                                <div
                                    key={f.name}
                                    className={[
                                        "grid grid-cols-3 px-4 py-3 min-w-[360px]",
                                        i < page.frameworks.length - 1 ? "border-b border-black/[0.06]" : "",
                                    ].join(" ")}
                                >
                                    <span className="text-[0.72rem] text-[#1d1d1f]">{f.name}</span>
                                    <span>
                                        <span className="inline-block text-[0.6rem] font-medium px-2 py-0.5 rounded-full bg-[#d1fae5] text-[#1a7f37]">
                                            {f.status}
                                        </span>
                                    </span>
                                    <span className="text-[0.68rem] text-[#6e6e73]">{f.since}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Green bonds */}
                    <div className="shrink-0">
                        <div className="flex justify-between items-baseline mb-4">
                            <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73]">
                                {page.bonds.label}
                            </p>
                            <span className="text-[1.4rem] font-light text-[#1d1d1f]">{page.bonds.total}</span>
                        </div>

                        {/* issuances timeline */}
                        <div className="flex items-end gap-3 lg:gap-4 mb-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {page.bonds.issuances.map((b) => (
                                <div key={b.year} className="flex-1 min-w-[90px] border-l-2 border-[#1d1d1f] pl-3">
                                    <p className="text-[0.65rem] text-[#6e6e73]">{b.year}</p>
                                    <p className="text-[0.75rem] font-medium text-[#1d1d1f]">{b.amount}</p>
                                    <p className="text-[0.6rem] text-[#6e6e73]">{b.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* allocation categories */}
                        <div className="space-y-2">
                            {page.bonds.allocationCategories.map((cat) => (
                                <div key={cat.name} className="flex items-center gap-2 lg:gap-3">
                                    <div className="w-[110px] sm:w-[150px] lg:w-[180px] shrink-0 text-[0.6rem] lg:text-[0.63rem] text-[#6e6e73] text-right leading-snug">
                                        {cat.name}
                                    </div>
                                    <div className="flex-1 h-3 lg:h-4 bg-[#f5f5f7] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#1d1d1f] rounded-full transition-all duration-500"
                                            style={{ width: `${cat.pct}%` }}
                                        />
                                    </div>
                                    <span className="text-[0.63rem] lg:text-[0.65rem] font-medium text-[#1d1d1f] w-7 lg:w-8 shrink-0">
                                        {cat.pct}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* footnote */}
                    <p className="text-[0.6rem] text-[#6e6e73] leading-relaxed shrink-0">
                        {page.footnote}
                    </p>
                </div>
            </div>
        </section>
    );
}