'use client'

import type { CeoPage } from '@/lib/types'
import { FieldInput, FieldTextarea } from '@/components/admin/ui/Fields'
import ParaRows from '@/components/admin/ui/ParaRows'

type Props = {
  page: CeoPage
  onChange: (page: CeoPage) => void
}

export default function CeoEditor({ page, onChange }: Props) {
  const set = (key: keyof CeoPage, val: unknown) =>
    onChange({ ...page, [key]: val })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FieldInput
          label="Name"
          value={page.name}
          onChange={v => set('name', v)}
          placeholder="Lisa Jackson"
        />
        <FieldInput
          label="Role"
          value={page.role}
          onChange={v => set('role', v)}
          placeholder="VP, Environment, Policy and Social Initiatives"
        />
      </div>

      <FieldInput
        label="Portrait image path"
        value={page.imgSrc}
        onChange={v => set('imgSrc', v)}
        placeholder="/img/ceo-1.jpg"
      />

      <FieldTextarea
        label="Pull quote (header)"
        value={page.header}
        onChange={v => set('header', v)}
        placeholder="Your most important quote…"
      />

      <ParaRows
        paragraphs={page.paragraphs}
        onChange={paras => set('paragraphs', paras)}
      />
    </div>
  )
}
