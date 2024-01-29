import { QueryClient } from '@tanstack/react-query'

export const invalidateStoreMenusQueries = async (queryClient: QueryClient) => {
  const queryCache = queryClient.getQueryCache()
  queryCache.getAll()
    .map(cache => cache.queryKey)
    .filter((queryKey) => queryKey[0] === 'stores')
    .forEach((queryKey) => {
      queryClient.invalidateQueries({
        queryKey: queryKey
      })
    })
}
