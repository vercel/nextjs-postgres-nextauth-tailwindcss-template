import { NextRequest } from 'next/server'
import { serverFetch } from '@/app/api/_lib/fetch'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  console.log('api get', searchParams)
  return await serverFetch(
    'v1',
   `/store?${searchParams}`,
    {}
  )
}
