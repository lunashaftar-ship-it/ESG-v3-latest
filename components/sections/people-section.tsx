"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "social/people") as unknown as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    workforce: {
        total: number;
        gender: { name: string; value: number; color: string }[];
        ethnicity: { name: string; value: number; color: string }[];
    };
    leadership: { title: string; data: { category: string; value: number }[] };
    payEquity: { ratios: { value: string; label: string; sublabel: string; scope: string }[] };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SmallTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-black/[0.08] rounded-lg px-3 py-2 text-[0.65rem] pointer-events-none shadow-sm">
            <span className="font-medium text-[#1d1d1f]">{payload[0].name}</span>
            <span className="text-[#6e6e73] ml-2">{payload[0].value}%</span>
        </div>
    );
}

export default function PeopleSection() {
    return (
        <section
            id="social-people"
            data-slug="social/people"
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

                    {/* Pay equity 4 ratios */}
                    <div className="mt-6 grid grid-cols-2 border-t border-black/[0.08]">
                        {page.payEquity.ratios.map((pe, i) => (
                            <div
                                key={pe.label}
                                className={[
                                    "py-4",
                                    i % 2 === 0 ? "pr-5" : "pl-5 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <div className="text-[2rem] font-light leading-none text-[#1d1d1f] mb-1">{pe.value}</div>
                                <div className="text-[0.63rem] text-[#6e6e73] leading-snug">{pe.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* KPIs */}
                    <div className="mt-5 flex gap-6 pt-5 border-t border-black/[0.08]">
                        {page.kpis.slice(0, 2).map((k) => (
                            <div key={k.label}>
                                <div className="text-[1.2rem] font-light text-[#1d1d1f] leading-none mb-1">{k.value}</div>
                                <div className="text-[0.63rem] text-[#6e6e73] leading-snug">{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="
                    w-full lg:w-[100vw]
                    h-auto lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    py-10 lg:py-[6vh]
                    gap-6
                    overflow-y-auto lg:overflow-hidden
                ">

                    {/* ── Donuts row — inline, no stretching ── */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 shrink-0">

                        {/* Gender donut */}
                        <div className="flex items-center gap-4 sm:w-[200px] lg:w-[220px] shrink-0">
                            <div className="shrink-0">
                                <PieChart width={100} height={100}>
                                    <Pie
                                        data={page.workforce.gender}
                                        cx={46} cy={46}
                                        innerRadius={28} outerRadius={44}
                                        paddingAngle={2} dataKey="value"
                                    >
                                        {page.workforce.gender.map((e, i) => (
                                            <Cell key={i} fill={e.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<SmallTooltip />} />
                                </PieChart>
                            </div>
                            <div className="min-w-0">
                                <p className="text-[0.68rem] font-medium text-[#1d1d1f] mb-2">Gender</p>
                                {page.workforce.gender.map((e) => (
                                    <div key={e.name} className="flex items-center gap-1.5 mb-1">
                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: e.color }} />
                                        <span className="text-[0.63rem] text-[#6e6e73]">{e.name}</span>
                                        <span className="text-[0.65rem] font-medium text-[#1d1d1f] ml-1">{e.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px self-stretch bg-black/[0.08] shrink-0" />

                        {/* Ethnicity donut — fixed width, legend stays right next to pie */}
                        <div className="flex items-start gap-4">
                            <div className="shrink-0">
                                <PieChart width={100} height={100}>
                                    <Pie
                                        data={page.workforce.ethnicity}
                                        cx={46} cy={46}
                                        innerRadius={28} outerRadius={44}
                                        paddingAngle={2} dataKey="value"
                                    >
                                        {page.workforce.ethnicity.map((e, i) => (
                                            <Cell key={i} fill={e.color === "#f5f5f7" ? "#e5e5ea" : e.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<SmallTooltip />} />
                                </PieChart>
                            </div>

                            {/* Single-column legend, fixed width, no stretching */}
                            <div className="w-[200px] shrink-0">
                                <p className="text-[0.68rem] font-medium text-[#1d1d1f] mb-2">Race & Ethnicity (U.S.)</p>
                                <div className="space-y-1.5">
                                    {page.workforce.ethnicity.map((e) => (
                                        <div key={e.name} className="flex items-center gap-1.5">
                                            <span
                                                className="w-2 h-2 rounded-full shrink-0"
                                                style={{ background: e.color === "#f5f5f7" ? "#e5e5ea" : e.color }}
                                            />
                                            <span className="text-[0.6rem] text-[#6e6e73]">{e.name}</span>
                                            <span className="text-[0.63rem] font-medium text-[#1d1d1f] ml-auto">{e.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leadership horizontal bars */}
                    <div className="flex-1 min-h-0">
                        <p className="font-light text-[1.1rem] text-[#1d1d1f] mb-1">{page.leadership.title}</p>
                        <p className="text-[0.65rem] text-[#6e6e73] mb-4">% of open roles filled</p>
                        <div className="space-y-3">
                            {page.leadership.data.map((item) => (
                                <div key={item.category} className="flex items-center gap-3 lg:gap-4">
                                    <div className="w-28 sm:w-36 lg:w-40 shrink-0 text-[0.65rem] text-[#6e6e73] text-right">
                                        {item.category}
                                    </div>
                                    <div className="flex-1 h-6 bg-[#f5f5f7] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                            style={{
                                                width: `${item.value}%`,
                                                background: item.value >= 50 ? "#1a7f37" : "#1d1d1f",
                                                minWidth: 40,
                                            }}
                                        >
                                            <span className="text-[0.62rem] font-medium text-white">{item.value}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-[0.6rem] text-[#6e6e73] shrink-0">
                        Data: calendar year 2021. URCs = underrepresented communities. Source: Apple 2022 ESG Report.
                    </p>
                </div>
            </div>
        </section>
    );
}