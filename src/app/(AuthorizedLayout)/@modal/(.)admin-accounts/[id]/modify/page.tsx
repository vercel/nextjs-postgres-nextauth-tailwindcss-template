'use client'

import ModifyModal from '@/app/(AuthorizedLayout)/admin-accounts/_components/ModifyModal'

const AdminAccountModifyModalPage = (
  { params }: { params: { id: string }}
) => {
  return (
    <ModifyModal
      id={params.id}
      open={true}
    />
  )
}

export default AdminAccountModifyModalPage
