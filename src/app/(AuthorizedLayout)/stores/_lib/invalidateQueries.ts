import { QueryClient } from '@tanstack/react-query'

export const invalidateStoresQueries = async (queryClient: QueryClient) => {
  const queryCache = queryClient.getQueryCache()
  queryCache.getAll()
    .map(cache => cache.queryKey)
    .filter((queryKey) => queryKey[0] === 'stores' && queryKey[1] !== 'menus')
    .forEach((queryKey) => {
      queryClient.invalidateQueries({
        queryKey: queryKey
      })
    })
}
