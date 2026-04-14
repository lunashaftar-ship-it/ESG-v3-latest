'use client';

import { useState, useEffect } from 'react'
import ReaderHeader from '../../components/reader/reader-header'
import Reader from '../../components/reader/reader'

export default function ReaderPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true) // يبدأ true عشان يمنع البياض المفاجئ

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/sections');
        const result = await response.json();
        
        if (result && Array.isArray(result) && result.length > 0) {
          setData(result);
        } else {
          console.warn("القائمة فارغة أو هناك خطأ في البيانات");
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      } finally {
        // حركة الـ 500ms هادي هي اللي حتخلي الانتقال ناعم وتلغي الرمشة
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }

    fetchData()
  }, [])

  // شاشة التحميل بشكل أنيق
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-neutral-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="text-lg font-medium">جاري تحميل التقارير...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReaderHeader activePageNumber={activeIndex} />
      {/* تأكدي إن المكون Reader يستقبل البيانات بشكل صحيح */}
      {/* @ts-ignore */}
<Reader onPageChange={setActiveIndex} {...{initialData: data} as any} />
    </>
  )
}