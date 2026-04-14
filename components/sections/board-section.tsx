"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "governance/board") as unknown as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    board: {
        total: number;
        independent: number;
        avgAge: number;
        avgTenure: number;
        gender: { name: string; value: number; color: string }[];
        ethnicity: { name: string; value: number; color: string }[];
    };
    committees: { name: string; members: number; independent: number; esgRole: string }[];
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

export default function BoardSection() {
    return (
        <section
            id="governance-board"
            data-slug="governance/board"
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
                                <div className="text-[1.7rem] font-light leading-none mb-1 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.65rem] text-[#6e6e73] leading-snug">{k.label}</div>
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
                    gap-6 lg:gap-8
                    overflow-y-auto lg:overflow-hidden
                ">
                    {/* Two donuts — stack on mobile */}
                    <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 shrink-0">
                        {/* Gender */}
                        <div className="flex items-center gap-5">
                            <PieChart width={120} height={120}>
                                <Pie data={page.board.gender} cx={56} cy={56} innerRadius={34} outerRadius={52} paddingAngle={2} dataKey="value">
                                    {page.board.gender.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<SmallTooltip />} />
                            </PieChart>
                            <div>
                                <p className="text-[0.68rem] font-medium text-[#1d1d1f] mb-2">Board gender</p>
                                {page.board.gender.map((e) => (
                                    <div key={e.name} className="flex items-center gap-2 mb-1.5">
                                        <span className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                                        <span className="text-[0.63rem] text-[#6e6e73]">{e.name}</span>
                                        <span className="text-[0.68rem] font-medium text-[#1d1d1f] ml-3">{e.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:block w-px self-stretch bg-black/[0.08]" />

                        {/* Ethnicity */}
                        <div className="flex items-center gap-5">
                            <PieChart width={120} height={120}>
                                <Pie data={page.board.ethnicity} cx={56} cy={56} innerRadius={34} outerRadius={52} paddingAngle={2} dataKey="value">
                                    {page.board.ethnicity.map((e, i) => <Cell key={i} fill={e.color === "#f5f5f7" ? "#e5e5ea" : e.color} />)}
                                </Pie>
                                <Tooltip content={<SmallTooltip />} />
                            </PieChart>
                            <div>
                                <p className="text-[0.68rem] font-medium text-[#1d1d1f] mb-2">Board ethnicity</p>
                                {page.board.ethnicity.map((e) => (
                                    <div key={e.name} className="flex items-center gap-2 mb-1.5">
                                        <span className="w-2 h-2 rounded-full" style={{ background: e.color === "#f5f5f7" ? "#e5e5ea" : e.color }} />
                                        <span className="text-[0.63rem] text-[#6e6e73]">{e.name}</span>
                                        <span className="text-[0.68rem] font-medium text-[#1d1d1f] ml-3">{e.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Committees */}
                    <div className="flex-1 min-h-0 flex flex-col justify-center">
                        <p className="text-[0.63rem] font-medium tracking-[0.14em] uppercase text-[#6e6e73] mb-4">
                            Board committees
                        </p>
                        <div className="space-y-3">
                            {page.committees.map((c) => (
                                <div key={c.name} className="flex gap-4 py-4 border-b border-black/[0.06] last:border-0">
                                    <div className="shrink-0 pt-0.5">
                                        <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center">
                                            <span className="text-[0.6rem] font-medium text-white">{c.independent}/{c.members}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[0.75rem] font-medium text-[#1d1d1f] mb-1">{c.name}</p>
                                        <p className="text-[0.65rem] text-[#6e6e73] leading-relaxed">{c.esgRole}</p>
                                    </div>
                                    <div className="ml-auto shrink-0 text-right">
                                        <p className="text-[0.6rem] text-[#6e6e73]">independent</p>
                                        <p className="text-[0.75rem] font-medium text-[#1d1d1f]">{c.independent}/{c.members}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}