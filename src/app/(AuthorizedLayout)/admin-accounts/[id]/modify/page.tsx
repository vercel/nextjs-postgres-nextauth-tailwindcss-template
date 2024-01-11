import AdminAccountModifyView from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountModifyView'

export default function AdminAccountModifyPage(
  { params }: { params: { id: string }}
) {
  return (
    <AdminAccountModifyView
      id={params.id}
      open={true}
    />
  )
}
