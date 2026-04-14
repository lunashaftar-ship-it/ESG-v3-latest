import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const slideId = parseInt(id);
    if (isNaN(slideId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const slide = await prisma.slide.findUnique({
      where: { id: slideId },
      include: { paragraphs: true, kpis: true, charts: true },
    });

    if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT({ params, request }: { params: Promise<{ id: string }>; request: Request }) {
  try {
    const { id } = await params;
    const slideId = parseInt(id);
    if (isNaN(slideId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await request.json();
    const { title, header, eyebrow, paragraphs, kpis } = body;

    // Update main slide fields
    await prisma.slide.update({
      where: { id: slideId },
      data: { title, header, eyebrow },
    });

    // Replace paragraphs
    if (Array.isArray(paragraphs)) {
      await prisma.slideparagraph.deleteMany({ where: { slideId } });
      await prisma.slideparagraph.createMany({
        data: paragraphs.map((content: string) => ({ content, slideId })),
      });
    }

    // Replace KPIs
    if (Array.isArray(kpis)) {
      await prisma.slidekpi.deleteMany({ where: { slideId } });
      await prisma.slidekpi.createMany({
        data: kpis.map((k: { value: string; label: string }) => ({ ...k, slideId })),
      });
    }

    const updated = await prisma.slide.findUnique({
      where: { id: slideId },
      include: { paragraphs: true, kpis: true, charts: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}