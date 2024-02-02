import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_models/request'

export const putStore = async (
  storeId: string,
  request: StoreModifyRequest,
  session?: Session | null
) => await clientFetch(
  `/stores/${storeId}`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
