import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getMenuRequestStore = async ({ queryKey }: {
  queryKey: [_1: string, storeId: string, _2: string]
}) => {
  const [_1, storeId, _2] = queryKey
  const response = await fetch(`/api/stores/${storeId}/menu-requests`, {
    next: {
      tags: [
        'stores',
        storeId,
        'menu-requests',
      ]
    }
  })

  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
