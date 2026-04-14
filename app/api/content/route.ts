import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // 1. استخراج البيانات من body (حسب الفورم اللي عندك)
    // ملاحظة: الـ body لازم يحتوي على id السلايد اللي تعدل فيه
    const { id, title, eyebrow, paragraphs, kpis } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing Slide ID' }, { status: 400 })
    }

    // 2. تحديث جدول الـ Slide في قاعدة البيانات
    const updatedSlide = await prisma.slide.update({
      where: { id: Number(id) },
      data: {
        title: title,
        eyebrow: eyebrow,
        // تحديث الفقرات (Paragraphs)
        paragraphs: {
          deleteMany: {}, // نمسح القديم
          create: paragraphs.map((p: any) => ({
            content: p.content
          }))
        },
        // تحديث الـ KPIs
        kpis: {
          deleteMany: {}, // نمسح القديم
          create: kpis.map((k: any) => ({
            value: k.value,
            label: k.label
          }))
        }
      }
    })

    return NextResponse.json({ ok: true, data: updatedSlide })

  } catch (err) {
    console.error("Prisma Error:", err)
    return NextResponse.json({ 
      error: 'Failed to update Database', 
      details: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}