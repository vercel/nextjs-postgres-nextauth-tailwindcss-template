import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreBusinessModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/business/_models/request'

export const putStoreBusiness = async (
  storeId: string,
  request: StoreBusinessModifyRequest,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/store/${storeId}/business`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
