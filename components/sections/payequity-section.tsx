"use client";

import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "social/people")!;
const { payEquity } = page as typeof page & {
    payEquity: {
        eyebrow: string;
        header: string;
        intro: string;
        ratios: { value: string; label: string; sublabel: string; scope: string }[];
        methodology: string[];
        programs: { title: string; body: string }[];
        kpis: { value: string; label: string }[];
    };
};

export default function PayEquitySection() {
    return (
        <section
            id="social-pay-equity"
            data-slug="social/people"
            className="shrink-0 w-full lg:w-[150vw] h-auto lg:h-full"
        >
            <div className="flex flex-col lg:flex-row h-full">

                {/* ── LEFT — intro + ratios ── */}
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
                        {payEquity.eyebrow}
                    </p>
                    <h2 className="font-light text-[clamp(1.4rem,2.4vw,2.6rem)] leading-[1.18] text-[#1d1d1f] mb-5">
                        {payEquity.header}
                    </h2>
                    <p className="text-[0.78rem] leading-[1.75] text-[#6e6e73] mb-8">
                        {payEquity.intro}
                    </p>

                    {/* 2×2 ratio cards */}
                    <div className="grid grid-cols-2 border-t border-black/[0.08]">
                        {payEquity.ratios.map((r, i) => (
                            <div
                                key={r.label}
                                className={[
                                    "py-5",
                                    i % 2 === 0 ? "pr-6 border-r border-black/[0.08]" : "pl-6",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <span className={[
                                    "inline-block text-[0.55rem] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded-full mb-3",
                                    r.scope === "global" ? "bg-[#d1fae5] text-[#1a7f37]" : "bg-[#e8e8ed] text-[#6e6e73]",
                                ].join(" ")}>
                                    {r.scope === "global" ? "Global" : "United States"}
                                </span>
                                <div className="text-[2.2rem] lg:text-[2.8rem] font-light leading-none text-[#1d1d1f] mb-2 tracking-tight">
                                    {r.value}
                                </div>
                                <div className="text-[0.72rem] font-medium text-[#1d1d1f] leading-tight mb-1">{r.label}</div>
                                <div className="text-[0.65rem] text-[#6e6e73]">{r.sublabel}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT — methodology + programs + KPIs ── */}
                <div className="
                    w-full lg:w-[100vw]
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    py-10 lg:py-[6vh]
                    overflow-y-auto lg:overflow-hidden
                ">
                    {/* Stack on mobile, side-by-side on lg */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[4vw] lg:h-full lg:items-center">

                        {/* methodology column */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-5">
                                How we verify pay equity
                            </p>
                            <div className="space-y-0">
                                {payEquity.methodology.map((item, i) => (
                                    <div key={i} className="flex gap-4 py-4 border-b border-black/[0.06] last:border-0">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-[#1d1d1f] flex items-center justify-center mt-0.5">
                                            <span className="text-[0.6rem] font-medium text-white">{i + 1}</span>
                                        </div>
                                        <p className="text-[0.75rem] leading-[1.7] text-[#6e6e73]">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* divider — only visible on desktop */}
                        <div className="hidden lg:block w-px self-stretch bg-black/[0.08] shrink-0" />

                        {/* programs + KPIs column */}
                        <div className="flex-1 min-w-0 flex flex-col gap-6">
                            <div>
                                <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-5">
                                    Key programs
                                </p>
                                <div className="space-y-4">
                                    {payEquity.programs.map((prog) => (
                                        <div key={prog.title} className="border-l-2 border-[#1a7f37] pl-4">
                                            <p className="text-[0.75rem] font-medium text-[#1d1d1f] mb-1">{prog.title}</p>
                                            <p className="text-[0.72rem] leading-[1.65] text-[#6e6e73]">{prog.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* KPI mini-grid */}
                            <div className="grid grid-cols-2 gap-px bg-black/[0.08] border border-black/[0.08] rounded-xl overflow-hidden mt-2">
                                {payEquity.kpis.map((k) => (
                                    <div key={k.label} className="bg-white px-4 py-4">
                                        <div className="text-[1.5rem] font-light leading-none text-[#1d1d1f] mb-1">{k.value}</div>
                                        <div className="text-[0.65rem] text-[#6e6e73] leading-snug">{k.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}