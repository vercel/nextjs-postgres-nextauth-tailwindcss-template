import { AdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/_models/AdminAccount'
import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreRegisterRequest } from '@/app/(AuthorizedLayout)/stores/register/_models/register'

export const postStore = async (
  request: StoreRegisterRequest,
  session?: Session | null
) => await clientFetch(
  `/stores`,
  {
    method: 'POST',
    body: JSON.stringify(request)
  },
  session
)
