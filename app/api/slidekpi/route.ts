import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// دالة الجلب (GET) - للتأكد أن الـ API يخدم
export async function GET() {
    try {
        // استخدمي slidekpi بحروف صغيرة كما اقترحت Prisma
        const kpis = await prisma.slidekpi.findMany();
        return NextResponse.json(kpis);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "خطأ في جلب البيانات" }, { status: 500 });
    }
}

// دالة الإضافة (POST) - لو احتجتي تضيفي بيانات مستقبلاً
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { label, value, slideId } = body;

        const newKPI = await prisma.slidekpi.create({
            data: {
                label: label,
                value: value,
                // تحويل slideId لرقم لضمان توافقه مع قاعدة البيانات
                slideId: parseInt(slideId), 
            },
        });
        return NextResponse.json(newKPI);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "خطأ في إضافة الـ KPI" }, { status: 500 });
    }
}