import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'
import { MenuRequestStorePageParameters } from '@/app/(AuthorizedLayout)/stores/menu-requests/_models/parameters'

const PAGE_SIZE = 50

export const getMenuRequestStores = async ({
  queryKey
}: { queryKey: [_1: string, _2: string, pageParameters: MenuRequestStorePageParameters]}) => {
  const [_1, _2, pageParameters] = queryKey
  const searchParams = new URLSearchParams(pageParameters as any)
  searchParams.set("pageNumber", String(pageParameters.page))
  searchParams.set("pageSize", String(PAGE_SIZE))
  searchParams.delete("page")

  const response = await fetch(`/api/stores/menu-requests?${searchParams.toString()}`, {
    next: {
      tags: [
        'stores',
        'menu-requests',
        ...Object.values(pageParameters).map((value) => value.toString())
      ]
    }
  })

  console.log("getMenuRequestStores response", response)
  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
