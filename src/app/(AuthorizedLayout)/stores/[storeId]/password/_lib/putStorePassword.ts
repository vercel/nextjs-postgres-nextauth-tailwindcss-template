import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StorePasswordModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/password/_models/modify'

export const putStorePassword = async (
  storeId: string,
  request: StorePasswordModifyRequest,
  session?: Session | null
) => await clientFetch(
  `/stores/${storeId}/manager-accounts/password`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
