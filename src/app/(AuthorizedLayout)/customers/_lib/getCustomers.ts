import { NO_AUTHORIZED } from '@/app/(AuthorizedLayout)/_lib/session'
import { CustomerPageParameters } from '@/app/(AuthorizedLayout)/customers/_models/props'

const PAGE_SIZE = 50

export const getCustomers = async ({ queryKey }: {
  queryKey: [_1: string, pageParameters: CustomerPageParameters]
}) => {
  const [_1, pageParameters] = queryKey
  const searchParams = new URLSearchParams(pageParameters as any)
  searchParams.set('pageNumber', String(pageParameters.page))
  searchParams.set('pageSize', String(PAGE_SIZE))
  searchParams.delete('page')

  const response = await fetch(`/api/customers?${searchParams.toString()}`, {
    next: {
      tags: [
        'customers',
        ...Object.values(pageParameters).map((value) => value.toString())
      ]
    }
  })

  console.log('getCustomers response', response)
  if (response.status === 401) {
    throw NO_AUTHORIZED
  }
  return response.json()
}
