import { PageParameters } from '@/app/(AuthorizedLayout)/_models/common'
import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'
import { StorePageParameters } from '@/app/(AuthorizedLayout)/stores/_models/Store'

export const getStores = async ({ queryKey }: { queryKey: [_1: string, pageParameters: StorePageParameters]}) => {
  const [_1, pageParameters] = queryKey
  const searchParams = new URLSearchParams(...Object.entries(pageParameters))
  searchParams.set("pageSize", String(3))
  console.log(searchParams)

  const response = await fetch(`/api/stores?${searchParams.toString()}`, {
    next: {
      tags: ['getStores', JSON.stringify(pageParameters)]
    }
  })

  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
