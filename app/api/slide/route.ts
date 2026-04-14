import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

    const slide = await prisma.slide.findUnique({
      where: { slug },
      include: { paragraphs: true, kpis: true, charts: true },
    });

    if (!slide) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(slide);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}