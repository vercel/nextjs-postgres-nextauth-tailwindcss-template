import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/[id]/modify/_lib/getAdminAccount'
import AdminAccountModifyModal from '@/app/(AuthorizedLayout)/admin-accounts/[id]/modify/_components/AdminAccountModifyModal'

type Props = {
  id: string;
}

const AdminAccountModifyContainer = async (
  { id }: Props,
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['admin-accounts', id], queryFn: getAdminAccount})
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <AdminAccountModifyModal id={id} />
    </HydrationBoundary>
  )
}

export default AdminAccountModifyContainer
