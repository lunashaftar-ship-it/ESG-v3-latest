import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// دالة الجلب (GET) - لعرض الرسوم البيانية
export async function GET() {
    try {
        const charts = await prisma.slidechart.findMany();
        return NextResponse.json(charts);
    } catch (error) {
        return NextResponse.json({ error: "فشل جلب الرسوم البيانية" }, { status: 500 });
    }
}

// دالة الإضافة (POST) 
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data, slideId } = body;

        const newChart = await prisma.slidechart.create({
            data: {
                chartType: type, // تأكدي أن الاسم في السكيما هو chartType
                data: data,      // تأكدي أن الاسم في السكيما هو data
                slideId: parseInt(slideId),
            },
        });
        return NextResponse.json(newChart);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "خطأ في إضافة الرسم البياني" }, { status: 500 });
    }
}