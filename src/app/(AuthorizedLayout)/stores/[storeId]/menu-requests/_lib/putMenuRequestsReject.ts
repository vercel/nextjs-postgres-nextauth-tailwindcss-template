import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'

export const putMenuRequestsReject = async (
  storeId: string,
  selectedIndexes: number[],
  session?: Session | null
) => await clientFetch(
  `/stores/${storeId}/menu-requests/reject`,
  {
    method: 'PUT',
    body: JSON.stringify({
      indexes: selectedIndexes
    })
  },
  session
)
