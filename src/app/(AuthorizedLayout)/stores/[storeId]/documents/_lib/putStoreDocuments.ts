import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreDocumentsModifyRequest } from '@/app/(AuthorizedLayout)/stores/[storeId]/documents/_models/request'

export const putStoreDocuments = async (
  storeId: string,
  request: StoreDocumentsModifyRequest,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/stores/${storeId}/documents`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
