import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreMenuModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_models/request'

export const putStoreMenu = async (
  menuId: number,
  storeId: string,
  request: StoreMenuModifyRequest,
  session?: Session | null
) => await clientFetch(
  `/stores/${storeId}/menus/${menuId}`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
