import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// دالة الجلب (GET) - للتأكد أن البيانات تظهر
export async function GET() {
    try {
        const paragraphs = await prisma.slideparagraph.findMany();
        return NextResponse.json(paragraphs);
    } catch (error) {
        return NextResponse.json({ error: "فشل جلب الفقرات" }, { status: 500 });
    }
}

// دالة الإضافة (POST) - الكود الذي كنتِ تكتبين فيه
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { content, slideId } = body;

        const newParagraph = await prisma.slideparagraph.create({
            data: {
                content: content,
                slideId: parseInt(slideId),
            },
        });
        return NextResponse.json(newParagraph);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "خطأ في إضافة الفقرة" }, { status: 500 });
    }
}