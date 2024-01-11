import AdminAccountModifyView from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountModifyView'

const AdminAccountModifyModalPage = (
  { params }: { params: { id: string }}
) => {
  return (
    <AdminAccountModifyView
      id={params.id}
      open={true}
    />
  )
}

export default AdminAccountModifyModalPage
