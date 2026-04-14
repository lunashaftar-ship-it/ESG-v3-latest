"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "social/supply") as unknown as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    assessments: {
        title: string;
        type: string;
        data: { year: number; total: number; unannounced: number }[];
    };
    compliance: { label: string; current: number; target: number; note?: string }[];
    programs: { title: string; body: string }[];
    footnote: string;
};

export default function SupplyChainSection() {
    return (
        <section
            id="social-supply"
            data-slug="social/supply"
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
                    <p className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-2 lg:mb-2">
                        {page.eyebrow}
                    </p>
                    <h2 className="font-light text-[clamp(1.2rem,1.8vw,2rem)] leading-[1.15] text-[#1d1d1f] mb-3">
                        {page.header}
                    </h2>
                    {page.body.map((para, i) => (
                        <p key={i} className="text-[0.72rem] leading-[1.6] text-[#6e6e73] mb-1.5">{para}</p>
                    ))}

                    {/* KPI 2×2 */}
                    <div className="mt-3 grid grid-cols-2 border-t border-black/[0.08]">
                        {page.kpis.map((k, i) => (
                            <div
                                key={k.label}
                                className={[
                                    "py-2.5",
                                    i % 2 === 0 ? "pr-5" : "pl-5 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <div className="text-[1.2rem] font-light leading-none mb-0.5 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.6rem] text-[#6e6e73] leading-snug">{k.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Programs */}
                    <div className="mt-3 space-y-2 border-t border-black/[0.08] pt-3">
                        {page.programs.map((prog) => (
                            <div key={prog.title} className="flex gap-2.5">
                                <div className="w-1 rounded-full bg-[#1d1d1f] shrink-0 mt-1 self-stretch" />
                                <div>
                                    <p className="text-[0.68rem] font-medium text-[#1d1d1f] mb-0">{prog.title}</p>
                                    <p className="text-[0.62rem] text-[#6e6e73] leading-[1.5]">{prog.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* ── RIGHT ── */}
                <div className="
                    w-full lg:w-[100vw] lg:h-full
                    shrink-0 flex flex-col
                    px-6 sm:px-10 lg:px-[4vw]
                    pt-8 pb-10 lg:py-[6vh]
                    gap-5 lg:gap-6
                ">
                    {/* Bar chart — fixed height on mobile, flex-1 on desktop */}
                    <div className="h-[240px] sm:h-[280px] lg:flex-1 lg:h-auto lg:min-h-0 flex flex-col shrink-0 lg:shrink">
                        <div className="flex justify-between items-end mb-3 shrink-0">
                            <p className="font-light text-[1rem] lg:text-[1.1rem] text-[#1d1d1f]">
                                {page.assessments.title}
                            </p>
                            <p className="text-[0.6rem] text-[#6e6e73] ml-2 shrink-0">
                                no. of assessments
                            </p>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={page.assessments.data}
                                    margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
                                    barCategoryGap="30%"
                                    barGap={3}
                                >
                                    <CartesianGrid vertical={false} stroke="#d2d2d7" strokeWidth={1} />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: "#6e6e73" }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        width={32}
                                        tick={{ fontSize: 10, fill: "#6e6e73" }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.03)" }}
                                        contentStyle={{
                                            background: "white",
                                            border: "1px solid rgba(0,0,0,0.08)",
                                            borderRadius: 12,
                                            fontSize: 11,
                                        }}
                                    />
                                    <Bar dataKey="total" name="Total assessments" fill="#1d1d1f" radius={[3, 3, 0, 0]} maxBarSize={20} />
                                    <Bar dataKey="unannounced" name="Unannounced" fill="#1a7f37" radius={[3, 3, 0, 0]} maxBarSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Compliance progress bars */}
                    <div className="shrink-0">
                        <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4">
                            Audit compliance coverage
                        </p>
                        <div className="space-y-3">
                            {page.compliance.map((c) => {
                                const done = c.current >= c.target;
                                return (
                                    <div key={c.label}>
                                        <div className="flex justify-between items-baseline mb-1.5">
                                            <span className="text-[0.68rem] text-[#1d1d1f] pr-2">{c.label}</span>
                                            <span className="text-[0.63rem] text-[#6e6e73] shrink-0">
                                                {c.current}%{c.note ? ` · ${c.note}` : ""}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-[#f5f5f7] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{ width: `${c.current}%`, background: done ? "#1a7f37" : "#1d1d1f" }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                                <span className="w-3 h-3 rounded-sm bg-[#1d1d1f] shrink-0" />
                                Total assessments
                            </div>
                            <div className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                                <span className="w-3 h-3 rounded-sm bg-[#1a7f37] shrink-0" />
                                Unannounced visits
                            </div>
                        </div>
                    </div>

                    {/* Footnote */}
                    <p className="text-[0.6rem] text-[#6e6e73] leading-relaxed shrink-0">
                        {page.footnote}
                    </p>
                </div>

            </div>
        </section>
    );
}