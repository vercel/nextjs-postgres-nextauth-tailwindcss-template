import { NextRequest } from 'next/server'
import { serverFetch } from '@/app/api/_lib/fetch'

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  return await serverFetch(
    'v1',
    `/accounts/${params.id}`,
    {}
  )
}
