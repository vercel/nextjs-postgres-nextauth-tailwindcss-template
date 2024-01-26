import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'
import { MenuPageParameters } from '@/app/(AuthorizedLayout)/stores/menus/_models/parameters'

const PAGE_SIZE = 50

export const getMenus = async ({ queryKey }: { queryKey: [_1: string, _2: string, pageParameters: MenuPageParameters]}) => {
  const [_1, _2, pageParameters] = queryKey
  const searchParams = new URLSearchParams(pageParameters as any)
  searchParams.set("pageNumber", String(pageParameters.page))
  searchParams.set("pageSize", String(PAGE_SIZE))
  searchParams.delete("page")

  const response = await fetch(`/api/stores/menus?${searchParams.toString()}`, {
    next: {
      tags: [
        'stores',
        'menus',
        ...Object.values(pageParameters)
      ]
    }
  })

  console.log("getMenus response", response)
  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
