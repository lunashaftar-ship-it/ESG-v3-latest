import AdminSidebar from '@/components/admin/Sidebar'
import rawData from '@/content/data.json'
import type { ReportData } from '@/lib/types'

const data = rawData as unknown as ReportData

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100dvh',
        overflow: 'hidden',
        fontFamily: '-apple-system, "Helvetica Neue", sans-serif',
      }}
    >
      <AdminSidebar data={data} />
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          background: '#ffffff',
        }}
      >
        {children}
      </div>
    </div>
  )
}
