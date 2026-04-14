import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

// تحديد category لكل slug
function getCategory(slug) {
  if (slug === 'ceo-statement') return 'INTRODUCTION'
  if (slug.startsWith('environment')) return 'ENVIRONMENT'
  if (slug.startsWith('product')) return 'PRODUCT'
  if (slug.startsWith('social')) return 'SOCIAL'
  if (slug.startsWith('governance')) return 'GOVERNANCE'
  return 'GENERAL'
}

async function main() {
  const rawData = fs.readFileSync('./content/data.json', 'utf8')
  const data = JSON.parse(rawData)

  console.log("🧹 تنظيف قاعدة البيانات...")
  await prisma.slideChart.deleteMany({})
  await prisma.slideKPI.deleteMany({})
  await prisma.slideParagraph.deleteMany({})
  await prisma.slide.deleteMany({})

  console.log("🚀 تعبئة الـ 14 Slides...")

  for (const s of data.pages) {
    const category = getCategory(s.slug)

    // جمع الـ paragraphs من مصادر مختلفة
    const allParagraphs = [
      ...(s.paragraphs || []),
      ...(s.body || []),
      ...(s.intro ? [s.intro] : []),
    ]

    // جمع الـ KPIs
    const allKpis = [
      ...(s.kpis || []),
      ...(s.payEquity?.kpis || []),
    ]

    // جمع الـ Charts
    const allCharts = []
    if (s.chart) allCharts.push({ title: s.chart.yLabel || 'Chart', chartType: s.chart.type, data: s.chart.data })
    if (s.energyTrend) allCharts.push({ title: 'Energy Trend', chartType: s.energyTrend.type, data: s.energyTrend.data })
    if (s.supplierEnergy) allCharts.push({ title: 'Supplier Energy', chartType: s.supplierEnergy.type, data: s.supplierEnergy.data })
    if (s.waterTrend) allCharts.push({ title: 'Water Trend', chartType: s.waterTrend.type, data: s.waterTrend.data })
    if (s.waste) allCharts.push({ title: 'Waste', chartType: s.waste.type, data: s.waste.data })
    if (s.assessments) allCharts.push({ title: s.assessments.title, chartType: s.assessments.type, data: s.assessments.data })
    if (s.donations) allCharts.push({ title: s.donations.title, chartType: 'bar', data: s.donations.data })
    if (s.productFootprint) allCharts.push({ title: s.productFootprint.title, chartType: 'bar', data: s.productFootprint.data })
    if (s.packaging) allCharts.push({ title: s.packaging.title, chartType: 'bar', data: s.packaging.data })

    await prisma.slide.create({
      data: {
        slug: s.slug,
        title: s.title,
        category,
        header: s.header || null,
        eyebrow: s.eyebrow || null,
        paragraphs: {
          create: allParagraphs.map(p => ({ content: p }))
        },
        kpis: {
          create: allKpis.map(k => ({ value: k.value, label: k.label }))
        },
        charts: {
          create: allCharts.map(c => ({
            title: c.title || null,
            chartType: c.chartType || 'bar',
            data: c.data,
          }))
        }
      }
    })

    console.log(`  ✅ [${category}] ${s.slug}`)
  }

  console.log("\n🎉 مبروك! الـ 14 slide في قاعدة البيانات")
  console.log("📊 التوزيع:")

  const counts = await prisma.slide.groupBy({
    by: ['category'],
    _count: { id: true }
  })
  counts.forEach(c => console.log(`   ${c.category}: ${c._count.id} slides`))
}

main()
  .catch(e => console.error("❌ في غلط:", e))
  .finally(() => prisma.$disconnect())