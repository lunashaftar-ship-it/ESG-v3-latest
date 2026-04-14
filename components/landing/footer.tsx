import Link from 'next/link';

const nav = [
    {
        label: 'Environment',
        links: [
            { title: 'Climate & Emissions', href: '/environment' },
            { title: 'Renewable Energy', href: '/environment#energy' },
            { title: 'Biodiversity', href: '/environment#biodiversity' },
            { title: 'Water & Waste', href: '/environment#water' },
        ],
    },
    {
        label: 'Social',
        links: [
            { title: 'People & Culture', href: '/social' },
            { title: 'Community', href: '/social#community' },
            { title: 'Diversity & Inclusion', href: '/social#diversity' },
            { title: 'Supply Chain', href: '/social#supply-chain' },
        ],
    },
    {
        label: 'Governance',
        links: [
            { title: 'Ethics & Compliance', href: '/governance' },
            { title: 'Board & Leadership', href: '/governance#board' },
            { title: 'Risk Management', href: '/governance#risk' },
            { title: 'Transparency', href: '/governance#transparency' },
        ],
    },
    {
        label: 'Product',
        links: [
            { title: 'Innovation', href: '/product' },
            { title: 'Recyclable Materials', href: '/product#materials' },
            { title: 'Lifecycle Impact', href: '/product#lifecycle' },
            { title: 'Safety & Quality', href: '/product#safety' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'About NordaGroup', href: '/about' },
            { title: 'CEO Statement', href: '/ceo-statement' },
            { title: 'Data Center', href: '/data-center' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-neutral-900 px-6 lg:px-16 pt-16 pb-8">
            <div className="max-w-6xl mx-auto">

                {/* Top row — logo + tagline */}
                <div className="flex flex-col md:flex-row md:items-start gap-6 pb-12 border-b border-neutral-800">
                    <div className="flex flex-col gap-3">
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="w-7 h-7 rounded-md bg-green-600 flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-white tracking-tight">NordaGroup</span>
                        </Link>
                    </div>

                </div>

                {/* Nav columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 border-b border-neutral-800">
                    {nav.map((col) => (
                        <div key={col.label} className="flex flex-col gap-3">
                            <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">
                                {col.label}
                            </p>
                            <ul className="flex flex-col gap-2">
                                {col.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-xs text-neutral-400 hover:text-white transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom — copyright + legal */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-neutral-600">
                        © 2026 NordaGroup. All rights reserved. Impact Report published under GRI Standards.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/legal" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
                            Legal
                        </Link>
                        <Link href="/cookies" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}