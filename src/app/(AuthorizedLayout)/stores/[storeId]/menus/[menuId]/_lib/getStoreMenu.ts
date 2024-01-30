import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getStoreMenu = async ({ queryKey }: {
  queryKey: [_1: string, storeId: string, _2: string, menuId: number]
}) => {
  const [_1, storeId, _2, menuId] = queryKey
  const response = await fetch(`/api/stores/${storeId}/menus/${menuId}`, {
    next: {
      tags: [
        'stores',
        storeId,
        'menu',
        menuId.toString()
      ]
    }
  })

  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
