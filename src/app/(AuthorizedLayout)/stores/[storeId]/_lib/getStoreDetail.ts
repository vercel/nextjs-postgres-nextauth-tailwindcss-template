import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getStoreDetail = async ({ queryKey }: {
  queryKey: [_1: string, _2: string, storeId: string]
}) => {
  const [_1, _2, storeId] = queryKey
  const response = await fetch(`/api/stores/${storeId}`, {
    next: {
      tags: [
        'stores',
        'detail',
        storeId
      ]
    }
  })

  console.log("getStoreDetail response", response)
  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
