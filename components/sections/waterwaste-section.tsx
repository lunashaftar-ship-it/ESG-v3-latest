"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "environment/water") as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    goals: { label: string; current: number; target: number; targetYear: number; unit: string }[];
    waterTrend: { data: { year: number; freshwater: number; recycled: number; other: number }[] };
    waste: { data: { year: number; recycled: number; composted: number; landfilled: number }[] };
    footnote: string;
};

export default function WaterWasteSection() {
    return (
        <section
            id="environment-water"
            data-slug="environment/water"
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
                    <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4">
                        {page.eyebrow}
                    </p>
                    <h2 className="font-light text-[clamp(1.4rem,2.2vw,2.4rem)] leading-[1.18] text-[#1d1d1f] mb-5">
                        {page.header}
                    </h2>
                    {page.body.map((para, i) => (
                        <p key={i} className="text-[0.78rem] leading-[1.75] text-[#6e6e73] mb-3">{para}</p>
                    ))}

                    {/* Progress goals */}
                    <div className="mt-6 space-y-4">
                        {page.goals.map((g) => {
                            const pct = Math.min((g.current / g.target) * 100, 100);
                            const done = g.current >= g.target;
                            return (
                                <div key={g.label}>
                                    <div className="flex justify-between items-baseline mb-1.5">
                                        <span className="text-[0.68rem] text-[#1d1d1f]">{g.label}</span>
                                        <span className="text-[0.65rem] text-[#6e6e73] shrink-0 ml-3">
                                            {g.current}{g.unit} / {g.target}{g.unit} by {g.targetYear}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-[#f5f5f7] rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: done ? "#1a7f37" : "#1d1d1f" }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* KPI row */}
                    <div className="mt-6 grid grid-cols-2 border-t border-black/[0.08] pt-5 gap-y-4">
                        {page.kpis.map((k) => (
                            <div key={k.label}>
                                <div className="text-[1.3rem] font-light leading-none mb-1 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.63rem] text-[#6e6e73] leading-snug pr-4">{k.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="
                    w-full lg:w-[100vw]
                    h-[80vh] lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    py-10 lg:py-[6vh]
                    gap-6
                ">
                    {/* Water trend */}
                    <div className="flex-1 min-h-0">
                        <div className="flex justify-between items-end mb-4">
                            <p className="font-light text-[1.1rem] text-[#1d1d1f]">Corporate water use</p>
                            <p className="text-[0.65rem] text-[#6e6e73]">Million gallons</p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={page.waterTrend.data} margin={{ top: 8, right: 20, bottom: 8, left: 0 }} barCategoryGap="35%">
                                <CartesianGrid vertical={false} stroke="#d2d2d7" strokeWidth={1} />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6e6e73" }} />
                                <YAxis axisLine={false} tickLine={false} width={40} tick={{ fontSize: 10, fill: "#6e6e73" }} />
                                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, fontSize: 11 }} />
                                <Bar dataKey="freshwater" name="Freshwater" stackId="a" fill="#1d1d1f" />
                                <Bar dataKey="recycled" name="Recycled" stackId="a" fill="#6e6e73" />
                                <Bar dataKey="other" name="Other alt." stackId="a" fill="#d2d2d7" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Waste trend */}
                    <div className="flex-1 min-h-0">
                        <div className="flex justify-between items-end mb-4">
                            <p className="font-light text-[1.1rem] text-[#1d1d1f]">Corporate waste diversion</p>
                            <p className="text-[0.65rem] text-[#6e6e73]">Millions of pounds</p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={page.waste.data} margin={{ top: 8, right: 20, bottom: 8, left: 0 }} barCategoryGap="35%">
                                <CartesianGrid vertical={false} stroke="#d2d2d7" strokeWidth={1} />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6e6e73" }} />
                                <YAxis axisLine={false} tickLine={false} width={40} tick={{ fontSize: 10, fill: "#6e6e73" }} />
                                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, fontSize: 11 }} />
                                <Bar dataKey="recycled" name="Recycled" stackId="b" fill="#1d1d1f" />
                                <Bar dataKey="composted" name="Composted" stackId="b" fill="#6e6e73" />
                                <Bar dataKey="landfilled" name="Landfilled" stackId="b" fill="#d2d2d7" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* legend */}
                    <div className="flex flex-wrap gap-4 lg:gap-6 shrink-0">
                        {[
                            { color: "#1d1d1f", label: "Recycled / Freshwater" },
                            { color: "#6e6e73", label: "Composted / Recycled water" },
                            { color: "#d2d2d7", label: "Landfilled / Other" },
                        ].map((l) => (
                            <div key={l.label} className="flex items-center gap-2 text-[0.63rem] text-[#6e6e73]">
                                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: l.color }} />
                                {l.label}
                            </div>
                        ))}
                    </div>

                    <p className="text-[0.6rem] text-[#6e6e73] leading-relaxed shrink-0">{page.footnote}</p>
                </div>
            </div>
        </section>
    );
}