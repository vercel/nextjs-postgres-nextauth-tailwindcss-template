import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getStoreMenuDetails = async ({ queryKey }: { queryKey: [_1: string, storeId: string]}) => {
  const [_1, storeId] = queryKey
  const response = await fetch(`/api/stores/${storeId}/menus`, {
    next: {
      tags: [
        'stores',
        'menus',
        storeId
      ]
    }
  })

  console.log("getStoreMenuDetails response", response)
  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
