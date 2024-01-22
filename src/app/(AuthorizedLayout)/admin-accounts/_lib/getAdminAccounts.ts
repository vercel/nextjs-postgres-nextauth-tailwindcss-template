import { PageParameters } from '@/app/(AuthorizedLayout)/_models/common'
import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getAdminAccounts = async ({ queryKey }: { queryKey: [_1: string, pageParameters: PageParameters]}) => {
  const [_1, pageParameters] = queryKey
  const { page: pageNumber } = pageParameters
  const pageSize = 3
  const response = await fetch(`/api/admin-accounts?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`, {
    next: {
      tags: ['admin-accounts', String(pageNumber)]
    }
  })

  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
