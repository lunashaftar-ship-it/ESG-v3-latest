import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("🧹 تنظيف Landing القديم...")
  await prisma.landing.deleteMany({})

  // 1. HERO
  await prisma.landing.create({
    data: {
      key: "hero",
      data: {
        eyebrow: "NordaGroup — Impact Report 2026",
        headline: "We've reduced our emissions by over 60%",
        highlightWord: "60%",
        body: "This milestone brings us closer than ever to our 2030 commitment — to become carbon neutral across our entire global footprint by using more recycled materials, renewable electricity, and lower-carbon transportation.",
        ctaPrimary: "Explore our progress",
        ctaSecondary: "Report Summary",
        statCards: [
          { pillar: "Environment", value: "84", unit: "%", label: "Renewable electricity" },
          { pillar: "Social",      value: "97", unit: "%", label: "Supplier compliance" }
        ]
      }
    }
  })
  console.log("✅ hero")

  // 2. IMPACT NUMBERS
  await prisma.landing.create({
    data: {
      key: "impact_numbers",
      data: {
        eyebrow: "By the numbers",
        heading: "A decade of measurable progress",
        body: [
          "Since 2015, we have systematically transformed how we operate — from the energy we use to the materials we source and the communities we serve. These numbers represent real change, not targets.",
          "Every metric is independently verified and reported against the GRI Standards framework, ensuring full transparency with our stakeholders."
        ],
        ctaLabel: "Read full methodology",
        stats: [
          { pillar: "Environment", value: "60", unit: "%", description: "Reduction in Scope 1 & 2 emissions since 2015" },
          { pillar: "Product",     value: "84", unit: "%", description: "Products made with recyclable materials" },
          { pillar: "Social",      value: "42", unit: "k", description: "Metric tons of waste diverted from landfill" },
          { pillar: "Governance",  value: "97", unit: "%", description: "Supplier code of conduct compliance" }
        ]
      }
    }
  })
  console.log("✅ impact_numbers")

  // 3. PILLARS
  await prisma.landing.create({
    data: {
      key: "pillars",
      data: {
        eyebrow: "Our Framework",
        heading: "Four pillars.\nOne commitment.",
        items: [
          {
            index: "01", letter: "E", title: "Environment",
            subtitle: "Climate & Planet",
            description: "From renewable energy to biodiversity protection — how we are restoring balance with the natural world.",
            href: "/reader#environment",
            image: "/img/pillars-e.jpg",
            accentColor: "#4ade80"
          },
          {
            index: "02", letter: "P", title: "Product",
            subtitle: "Design & Innovation",
            description: "Building recyclable, durable, responsible products that reduce lifecycle impact at every stage.",
            href: "/reader#product-lifecycle",
            image: "/img/pillars-p.jpg",
            accentColor: "#fb923c"
          },
          {
            index: "03", letter: "S", title: "Social",
            subtitle: "People & Community",
            description: "Investing in our people, protecting human rights across our supply chain, and giving back to communities.",
            href: "/reader#social-people",
            image: "/img/pillars-s.jpg",
            accentColor: "#60a5fa"
          },
          {
            index: "04", letter: "G", title: "Governance",
            subtitle: "Ethics & Transparency",
            description: "How we govern ourselves — board accountability, risk management, and full disclosure to stakeholders.",
            href: "/reader#governance-board",
            image: "/img/pillars-g.jpg",
            accentColor: "#a78bfa"
          }
        ]
      }
    }
  })
  console.log("✅ pillars")

  // 4. CEO TEASER
  await prisma.landing.create({
    data: {
      key: "ceo_teaser",
      data: {
        eyebrow: "CEO Statement",
        quote: "At Apple, we are constantly innovating to make the world's best technology while reducing our impact on the environment.",
        name: "Lisa Jackson",
        role: "VP, Environment, Policy and Social Initiatives",
        image: "/img/ceo-1.jpg",
        cta: { label: "Read full statement →", href: "/reader#ceo-statement" }
      }
    }
  })
  console.log("✅ ceo_teaser")

  // 5. REPORT CTA
  await prisma.landing.create({
    data: {
      key: "report_cta",
      data: {
        eyebrow: "NordaGroup — 2026",
        heading: "Read the full\nImpact Report.",
        body: "Download the complete 2026 report or explore each pillar online — environment, social, governance and product.",
        ctaDownload: "Download PDF",
        ctaExplore: "Explore sections",
        pdfPath: "/docs/report.pdf"
      }
    }
  })
  console.log("✅ report_cta")

  console.log("\n🎉 Landing Page كاملة بالبيانات الصحيحة!")
  const all = await prisma.landing.findMany({ select: { key: true } })
  console.log("📋 الصفوف:", all.map(r => r.key).join(", "))
}

main()
  .catch(e => console.error("❌ في غلط:", e))
  .finally(() => prisma.$disconnect())