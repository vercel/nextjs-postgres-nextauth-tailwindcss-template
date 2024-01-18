import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getAdminAccount = async ({ queryKey }: { queryKey: [string, string]}) => {
  const [_1, id] = queryKey
  const response = await fetch(`/api/admin-accounts/${id}`, {
    next: {
      tags: ['admin-accounts', id]
    }
  })

  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
