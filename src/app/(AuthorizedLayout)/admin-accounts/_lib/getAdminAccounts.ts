import { PageParameters } from '@/models/common'

export const getAdminAccounts = async ({ queryKey }: { queryKey: [_1: string, pageParameters: PageParameters]}) => {
  const [_1, pageParameters] = queryKey
  const { page: pageNumber } = pageParameters
  const pageSize = 50
  const response = await fetch(`/api/admin-accounts?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
    next: {
      tags: ['admin-accounts', String(pageNumber)]
    }
  })
  return response.json()
}
