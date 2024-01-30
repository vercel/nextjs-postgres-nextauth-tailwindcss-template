import { NextRequest } from 'next/server'
import { serverFetch } from '@/app/api/_lib/fetch'

export const GET = async (
  request: NextRequest,
  { params }: { params: { menuId: number } }
) => {
  return await serverFetch(
    'v1',
    `/menus/${params.menuId}`,
    {}
  )
}
