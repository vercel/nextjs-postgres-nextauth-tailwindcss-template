import ModifyModal from '@/app/(AuthorizedLayout)/admin-accounts/_components/ModifyModal'

export default function AdminAccountModifyPage(
  { params }: { params: { id: string }}
) {
  return (
    <ModifyModal
      id={params.id}
      open={true}
    />
  )
}
