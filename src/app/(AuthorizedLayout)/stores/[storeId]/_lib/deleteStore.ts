import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'

export const deleteStore = async (
  storeId: string,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/store/${storeId}`,
  {
    method: 'DELETE',
  },
  session
)
