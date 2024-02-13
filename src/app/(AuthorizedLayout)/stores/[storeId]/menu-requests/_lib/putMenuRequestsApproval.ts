import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'

export const putMenuRequestsApproval = async (
  storeId: string,
  selectedIndexes: number[],
  session?: Session | null
) => await clientFetch(
  `/stores/${storeId}/menu-requests/approval`,
  {
    method: 'PUT',
    body: JSON.stringify({
      indexes: selectedIndexes
    })
  },
  session
)
