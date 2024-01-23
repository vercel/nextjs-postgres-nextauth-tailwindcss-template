import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_models/modify'

export const putStore = async (
  storeId: string,
  request: StoreModifyRequest,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/store/${storeId}/info`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
