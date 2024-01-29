import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreMenuRegisterRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_models/request'

export const postStoreMenu = async (
  storeId: string,
  request: StoreMenuRegisterRequest,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/stores/${storeId}/menus`,
  {
    method: 'POST',
    body: JSON.stringify(request)
  },
  session
)
