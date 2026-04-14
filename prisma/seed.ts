import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // البيانات اللي بعتيهالي (الـ 14 سلايد)
  const data = [
    {
      slug: "ceo-statement",
      title: "CEO Statement",
      name: "Lisa Jackson",
      role: "VP, Environment, Policy and Social Initiatives",
      header: "At Apple, we are constantly innovating...",
      paragraphs: [
        "Every year, teams across our company find new and innovative ways...",
        "Thanks to these efforts, I'm proud to share that Apple has now cut..."
      ]
    },
    // ... باقي الـ 14 سلايد يضافوا هنا بنفس الطريقة
  ]

  console.log("Start seeding...")

  for (const s of data) {
    const slide = await prisma.slide.create({
      data: {
        slug: s.slug,
        title: s.title,
        header: s.header,
        name: s.name,
        role: s.role,
        paragraphs: {
          create: s.paragraphs?.map(p => ({ content: p })) || []
        }
      }
    })
  }

  console.log("✅ Seeding finished! All 14 slides are in the DB.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })