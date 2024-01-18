import { AdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/_models/AdminAccount'
import { clientFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'

export const putAdminAccount = async (
  id: string,
  adminAccount: Omit<AdminAccount, 'id' | 'password' | 'lastUpdatedAt'>,
  session?: Session | null
) => await clientFetch(
  `v1`,
  `/accounts/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify(adminAccount)
  },
  session
)
