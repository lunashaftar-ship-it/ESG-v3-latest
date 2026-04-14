import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// دالة الجلب (GET) - لعرض التقارير السنوية
export async function GET() {
    try {
        const reports = await prisma.annual.findMany();
        return NextResponse.json(reports);
    } catch (error) {
        return NextResponse.json({ error: "فشل جلب التقارير السنوية" }, { status: 500 });
    }
}

// دالة الإضافة (POST) - لإضافة تقرير جديد
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // ملاحظة: تأكدي من أسماء الحقول حسب السكيما عندك
        const newReport = await prisma.annual.create({
            data: {
                company_slug: body.company_slug,
                year: parseInt(body.year), // لأنه Int في قاعدة البيانات
                report_type: body.report_type, // 'actual' أو 'projected'
                title: body.title,
                summary: body.summary,
                baseline_emissions_mt: parseFloat(body.baseline_emissions_mt),
                total_emissions_mt: parseFloat(body.total_emissions_mt),
                // أضيفي باقي الحقول هنا بنفس الطريقة
            },
        });
        return NextResponse.json(newReport);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "خطأ في إضافة التقرير السنوي" }, { status: 500 });
    }
}