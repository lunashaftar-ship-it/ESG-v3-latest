import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // المسار الصحيح حسب صورتك الأخيرة

// دالة جلب البيانات (موجودة عندك أصلاً)
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

// --- دالة الحفظ الجديدة (POST) ---
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, cognome } = body;

    const newUser = await prisma.user.create({
      data: {
        nome: nome,    // تأكد أن اسم الحقل في الـ Schema هو name
        cognome: cognome // تأكد أن اسم الحقل في الـ Schema هو email (أو غيرهم حسب جدولك)
      },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}