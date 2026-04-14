"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "environment/energy") as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    supplierEnergy: { type: string; yLabel: string; data: { year: number; operational: number; committed: number }[] };
    donuts: { title: string; data: { name: string; value: number; color: string }[] }[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DonutTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
        <div style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} className="bg-white border border-black/[0.08] rounded-xl px-3 py-2 pointer-events-none">
            <p className="text-[0.65rem] font-medium text-[#1d1d1f]">{d.name}</p>
            <p className="text-[0.75rem] text-[#1a7f37]">{d.value}%</p>
        </div>
    );
}

export default function EnergySection() {
    return (
        <section
            id="environment-energy"
            data-slug="environment/energy"
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

                    {/* KPI grid */}
                    <div className="mt-6 grid grid-cols-2 border-t border-black/[0.08]">
                        {page.kpis.map((k, i) => (
                            <div
                                key={k.label}
                                className={[
                                    "py-4",
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

                {/* ── RIGHT ── */}
                <div className="
                    w-full lg:w-[100vw]
                    h-[70vh] lg:h-full
                    shrink-0 flex flex-col justify-center
                    px-6 sm:px-10 lg:px-[4vw]
                    py-10 lg:py-[6vh]
                    gap-6 lg:gap-8
                ">
                    {/* Supplier capacity bar chart */}
                    <div className="flex-1 min-h-0">
                        <div className="flex justify-between items-end mb-4">
                            <p className="font-light text-[1.1rem] text-[#1d1d1f]">Supplier clean energy capacity</p>
                            <p className="text-[0.65rem] text-[#6e6e73]">GW</p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={page.supplierEnergy.data} margin={{ top: 8, right: 20, bottom: 8, left: 0 }} barCategoryGap="35%">
                                <CartesianGrid vertical={false} stroke="#d2d2d7" strokeWidth={1} />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6e6e73" }} />
                                <YAxis axisLine={false} tickLine={false} width={32} tick={{ fontSize: 10, fill: "#6e6e73" }} />
                                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, fontSize: 11 }} />
                                <Bar dataKey="operational" name="Operational" fill="#1d1d1f" radius={[3, 3, 0, 0]}>
                                    {page.supplierEnergy.data.map((d) => <Cell key={d.year} fill={d.year === 2024 ? "#1a7f37" : "#1d1d1f"} />)}
                                </Bar>
                                <Bar dataKey="committed" name="Committed" fill="#d1fae5" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Two donuts — stack on mobile, side by side on sm+ */}
                    <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 shrink-0">
                        {page.donuts.map((donut) => (
                            <div key={donut.title} className="flex-1 flex items-center gap-4 lg:gap-6">
                                <div className="shrink-0 w-28 h-28 lg:w-32 lg:h-32">
                                    <PieChart width={112} height={112}>
                                        <Pie data={donut.data} cx={52} cy={52} innerRadius={32} outerRadius={48} paddingAngle={2} dataKey="value">
                                            {donut.data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip content={<DonutTooltip />} />
                                    </PieChart>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[0.68rem] font-medium text-[#1d1d1f] mb-2 lg:mb-3">{donut.title}</p>
                                    <div className="space-y-1.5">
                                        {donut.data.map((entry) => (
                                            <div key={entry.name} className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.color === "#f5f5f7" ? "#d2d2d7" : entry.color }} />
                                                    <span className="text-[0.63rem] text-[#6e6e73] truncate">{entry.name}</span>
                                                </div>
                                                <span className="text-[0.68rem] font-medium text-[#1d1d1f] shrink-0">{entry.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}