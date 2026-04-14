"use client";

import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

// ── DATA ──────────────────────────────────────────────────────────────────────

type DataPoint = {
    year: number;
    gross: number | null;
    avoided: number | null;
    projected: number | null;
};

const DATA: DataPoint[] = [
    { year: 2015, gross: 38.4, avoided: null, projected: null },
    { year: 2016, gross: 35.2, avoided: 3, projected: null },
    { year: 2017, gross: 31.0, avoided: 8, projected: null },
    { year: 2018, gross: 25.2, avoided: 14, projected: null },
    { year: 2019, gross: 25.1, avoided: 18, projected: null },
    { year: 2020, gross: 22.6, avoided: 22, projected: null },
    { year: 2021, gross: 21.3, avoided: 26, projected: null },
    { year: 2022, gross: 20.6, avoided: 31, projected: null },
    { year: 2023, gross: 15.8, avoided: 37, projected: null },
    { year: 2024, gross: 15.3, avoided: 41, projected: 15.3 },
    { year: 2026, gross: null, avoided: null, projected: 13.2 },
    { year: 2028, gross: null, avoided: null, projected: 11.4 },
    { year: 2030, gross: null, avoided: null, projected: 9.6 },
];

const NET_BY_YEAR: Record<number, string> = { 2024: "14.5" };
const BAR_DATA = DATA.filter((d) => d.gross !== null);

const KPIS = [
    { value: "38.4 Mt", label: "Gross emissions, 2015 baseline" },
    { value: "15.3 Mt", label: "Gross emissions, 2024" },
    { value: "14.5 Mt", label: "Net emissions, 2024 (after 0.7 Mt offsets)" },
    { value: "41 Mt", label: "Total emissions avoided in 2024" },
];

// ── CUSTOM TOOLTIP ────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload || payload.length === 0) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gross = payload.find((p: any) => p.dataKey === "gross")?.value as number | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const avoided = payload.find((p: any) => p.dataKey === "avoided")?.value as number | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proj = payload.find((p: any) => p.dataKey === "projected")?.value as number | undefined;
    const isProj = gross == null && proj != null;
    const net = gross != null ? (NET_BY_YEAR[label as number] ?? String(gross)) : null;

    return (
        <div
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            className="bg-white border border-black/[0.08] rounded-xl px-4 py-3 min-w-[160px] pointer-events-none"
        >
            <p className="text-[0.6rem] font-medium tracking-[0.1em] uppercase text-[#6e6e73] mb-1.5">
                {label}{isProj ? " · projected" : ""}
            </p>
            {gross != null && <p className="text-[1.4rem] font-light leading-none text-[#1d1d1f]">{gross} Mt</p>}
            {isProj && proj != null && <p className="text-[1.4rem] font-light leading-none text-[#1a7f37]">{proj} Mt</p>}
            {gross != null && (
                <>
                    <div className="w-full h-px bg-black/[0.06] my-2" />
                    <div className="flex justify-between gap-5">
                        {avoided != null && avoided > 0 && (
                            <div>
                                <p className="text-[0.75rem] font-medium text-[#1a7f37]">{avoided} Mt</p>
                                <p className="text-[0.6rem] text-[#6e6e73] mt-0.5">avoided</p>
                            </div>
                        )}
                        <div className="text-right ml-auto">
                            <p className="text-[0.75rem] font-medium text-[#1d1d1f]">{net} Mt</p>
                            <p className="text-[0.6rem] text-[#6e6e73] mt-0.5">net emissions</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// ── CUSTOM X-AXIS TICK ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function XTick(props: any) {
    const { x, y, payload } = props;
    const yr = payload.value as number;
    const isProj = yr > 2024;
    const isCurrent = yr === 2024;
    return (
        <text
            x={x} y={y + 12} textAnchor="middle" fontSize={10}
            fontWeight={isCurrent || isProj ? 500 : 400}
            fontStyle={isProj ? "italic" : "normal"}
            fill={isProj ? "#1a7f37" : isCurrent ? "#1d1d1f" : "#6e6e73"}
        >
            {yr}
        </text>
    );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function EmissionsSection() {
    return (
        <section
            id="environment-emissions"
            data-slug="environment/emissions"
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
                        Apple 2030 · Carbon Footprint
                    </p>
                    <h2 className="font-light text-[clamp(1.4rem,2.4vw,2.6rem)] leading-[1.18] text-[#1d1d1f] mb-5">
                        Progress toward<br />carbon neutrality
                    </h2>
                    <p className="text-[0.78rem] leading-[1.75] text-[#6e6e73] mb-3">
                        Apple has reduced its entire carbon footprint by{" "}
                        <strong className="text-[#1d1d1f] font-medium">more than 60 percent</strong>{" "}
                        compared with its 2015 baseline — without offsets. During the same period,
                        revenue grew by more than 65 percent. The goal is a{" "}
                        <strong className="text-[#1d1d1f] font-medium">75 percent reduction in gross emissions by 2030</strong>,
                        after which remaining emissions will be balanced with high-quality carbon removals.
                    </p>
                    <p className="text-[0.78rem] leading-[1.75] text-[#6e6e73]">
                        In 2024 alone, environmental programs{" "}
                        <strong className="text-[#1d1d1f] font-medium">avoided 41 million metric tons</strong>{" "}
                        of emissions — led by supplier clean energy transitions (21.8M mt),
                        direct emissions abatement (8.4M mt), and low-carbon materials (6.2M mt).
                    </p>

                    {/* KPI 2×2 grid */}
                    <div className="mt-6 grid grid-cols-2 border-t border-black/[0.08]">
                        {KPIS.map((k, i) => (
                            <div
                                key={k.value}
                                className={[
                                    "py-4",
                                    i % 2 === 0 ? "pr-6" : "pl-6 border-l border-black/[0.08]",
                                    i < 2 ? "border-b border-black/[0.08]" : "",
                                ].join(" ")}
                            >
                                <div className="text-[1.7rem] font-light leading-none mb-1 text-[#1d1d1f]">{k.value}</div>
                                <div className="text-[0.68rem] text-[#6e6e73]">{k.label}</div>
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
                ">
                    {/* chart header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 lg:mb-8 gap-3">
                        <p className="font-light text-[1.1rem] lg:text-[1.4rem] leading-[1.25] text-[#1d1d1f]">
                            We&apos;ve reduced our entire carbon footprint<br className="hidden sm:block" />
                            by more than 60 percent compared with 2015
                        </p>
                        <p className="text-[0.68rem] text-[#6e6e73] sm:text-right leading-relaxed shrink-0">
                            Million metric tons CO₂e<br />per fiscal year
                        </p>
                    </div>

                    {/* chart */}
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={DATA} margin={{ top: 16, right: 40, bottom: 8, left: 8 }} barCategoryGap="30%">
                                <CartesianGrid vertical={false} stroke="#d2d2d7" strokeWidth={1} />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={XTick} />
                                <YAxis domain={[0, 44]} ticks={[0, 10, 20, 30, 40]} axisLine={false} tickLine={false} width={36} tick={{ fontSize: 11, fill: "#6e6e73" }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                                <Bar dataKey="gross" stackId="stack" isAnimationActive animationDuration={900} animationEasing="ease-out">
                                    {BAR_DATA.map((d) => <Cell key={d.year} fill={d.year === 2024 ? "#1a7f37" : "#1d1d1f"} />)}
                                </Bar>
                                <Bar dataKey="avoided" stackId="stack" fill="#d1fae5" radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900} animationEasing="ease-out" />
                                <Line dataKey="projected" type="monotone" stroke="#1a7f37" strokeWidth={1.8} strokeDasharray="6 5" dot={{ r: 3, fill: "#1a7f37", strokeWidth: 0 }} activeDot={{ r: 5, fill: "#1a7f37", strokeWidth: 0 }} connectNulls isAnimationActive animationDuration={1200} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* legend */}
                    <div className="flex flex-wrap gap-4 lg:gap-6 mt-4">
                        {[
                            { color: "#1d1d1f", label: "Gross emissions (historical)" },
                            { color: "#1a7f37", label: "2024 (latest)" },
                            { color: "#d1fae5", label: "Avoided emissions" },
                        ].map((l) => (
                            <div key={l.label} className="flex items-center gap-2 text-[0.68rem] text-[#6e6e73]">
                                <span className="w-3.5 h-3 rounded-sm shrink-0" style={{ background: l.color }} />
                                {l.label}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-[0.68rem] text-[#6e6e73]">
                            <span className="w-5 shrink-0" style={{ height: "2px", marginTop: "5px", background: "repeating-linear-gradient(90deg,#1a7f37 0,#1a7f37 4px,transparent 4px,transparent 8px)" }} />
                            Projected path to 2030 goal
                        </div>
                    </div>

                    {/* footnote */}
                    <p className="mt-3 text-[0.62rem] text-[#6e6e73] leading-relaxed max-w-2xl">
                        Gross emissions cover scopes 1, 2, and 3. Net emissions = gross minus carbon offsets/removals.
                        Avoided emissions estimated vs. a business-as-usual scenario.
                        Source: Apple Environmental Progress Report, Fiscal Year 2024.
                    </p>
                </div>
            </div>
        </section>
    );
}