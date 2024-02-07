import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'

export const getMenu = async ({ queryKey }: {
  queryKey: [_1: string, _2: string, menuIndex: number]
}) => {
  const [_1, _2, menuIndex] = queryKey
  const response = await fetch(`/api/menus/${menuIndex}`, {
    next: {
      tags: [
        'stores',
        'menu',
        menuIndex.toString()
      ]
    }
  })

  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
