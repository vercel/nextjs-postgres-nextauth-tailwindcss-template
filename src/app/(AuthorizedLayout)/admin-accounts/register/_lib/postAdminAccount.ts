import { AdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/_models/AdminAccount'
import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'

export const postAdminAccount = async (
  adminAccount: AdminAccount,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/accounts`,
  {
    method: 'POST',
    body: JSON.stringify(adminAccount)
  },
  session
)
