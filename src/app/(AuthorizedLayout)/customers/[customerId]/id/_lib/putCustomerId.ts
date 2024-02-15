import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { CustomerIdModifyRequest } from '@/app/(AuthorizedLayout)/customers/[customerId]/id/_models/request'

export const putCustomerId = async (
  customerId: string,
  request: CustomerIdModifyRequest,
  session?: Session | null
) => await clientFetch(
  `/customers/${customerId}/id`,
  {
    method: 'PUT',
    body: JSON.stringify(request)
  },
  session
)
