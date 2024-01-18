import { QueryClient } from '@tanstack/react-query'

export const invalidateAdminAccountsQueries = async (queryClient: QueryClient) => {
  const queryCache = queryClient.getQueryCache()
  queryCache.getAll()
    .map(cache => cache.queryKey)
    .filter((queryKey) => queryKey[0] === 'admin-accounts')
    .forEach((queryKey) => {
      queryClient.invalidateQueries({
        queryKey: queryKey
      })
    })
}
