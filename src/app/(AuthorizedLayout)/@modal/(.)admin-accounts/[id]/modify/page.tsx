'use client'

import AdminAccountModifyContainer
  from '@/app/(AuthorizedLayout)/admin-accounts/[id]/modify/_components/AdminAccountModifyContainer'

const AdminAccountModifyModalPage = (
  { params }: { params: { id: string } }
) => {
  // @ts-ignore
  return <AdminAccountModifyContainer id={params.id} />
}

export default AdminAccountModifyModalPage
