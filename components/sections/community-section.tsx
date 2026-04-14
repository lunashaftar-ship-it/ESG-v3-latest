"use client";

import data from "@/content/data.json";

const page = data.pages.find((p) => p.slug === "social/community") as unknown as {
    slug: string;
    eyebrow: string;
    header: string;
    body: string[];
    kpis: { value: string; label: string }[];
    initiatives: { title: string; body: string; stat: string }[];
    donations: { title: string; unit: string; data: { year: string; amount: number }[] };
};

export default function CommunitySection() {
    const maxDonation = Math.max(...page.donations.data.map((d) => d.amount));

    return (
        <section
            id="social-community"
            data-slug="social/community"
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
                                <div className="text-[1.5rem] font-light leading-none mb-1 text-[#1d1d1f]">{k.value}</div>
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
                    {/* initiatives grid — 1 col mobile, 2 col sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/[0.06] border border-black/[0.06] rounded-2xl overflow-hidden lg:flex-1 lg:max-h-[55vh]">
                        {page.initiatives.map((init) => (
                            <div key={init.title} className="bg-white p-5 lg:p-6 flex flex-col gap-2">
                                <div className="text-[1.8rem] font-light text-[#1a7f37] leading-none">{init.stat}</div>
                                <p className="text-[0.75rem] font-medium text-[#1d1d1f]">{init.title}</p>
                                <p className="text-[0.68rem] text-[#6e6e73] leading-relaxed">{init.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* donations bar */}
                    <div className="shrink-0">
                        <div className="flex justify-between items-end mb-4">
                            <p className="text-[0.68rem] font-medium text-[#1d1d1f]">{page.donations.title}</p>
                            <p className="text-[0.63rem] text-[#6e6e73]">{page.donations.unit}</p>
                        </div>
                        <div className="flex items-end gap-4 lg:gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {page.donations.data.map((row) => {
                                const h = Math.round((row.amount / maxDonation) * 80);
                                return (
                                    <div key={row.year} className="flex flex-col items-center gap-2 shrink-0">
                                        <span className="text-[0.68rem] font-medium text-[#1d1d1f]">{row.amount}{page.donations.unit}</span>
                                        <div className="w-12 lg:w-16 rounded-t-md bg-[#1d1d1f] transition-all duration-500" style={{ height: h }} />
                                        <span className="text-[0.63rem] text-[#6e6e73]">{row.year}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}