import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getMenu = async ({ queryKey }: {
  queryKey: [_1: string, _2: string, menuId: number]
}) => {
  const [_1, _2, menuId] = queryKey
  const response = await fetch(`/api/menus/${menuId}`, {
    next: {
      tags: [
        'stores',
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
