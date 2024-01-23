import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_models/request'
import { StoreManagerModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/manager/_models/request'

export const putStoreManager = async (
  storeId: string,
  request: StoreManagerModifyRequest,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/store/${storeId}/manager`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
