import { NextRequest } from 'next/server'
import { serverFetch } from '@/app/api/_lib/fetch'

export const GET = async (
  request: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  return await serverFetch(
    'v1',
    `/stores/${params.storeId}/detail`,
    {}
  )
}
