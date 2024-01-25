import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreManagerModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/manager/_models/request'

export const putStoreManager = async (
  storeId: string,
  request: StoreManagerModifyRequest,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/stores/${storeId}/manager`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
