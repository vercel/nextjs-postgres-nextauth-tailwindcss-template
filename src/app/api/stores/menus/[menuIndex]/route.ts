import { NextRequest } from 'next/server'
import { serverFetch } from '@/app/api/_lib/fetch'

export const GET = async (
  request: NextRequest,
  { params }: { params: { menuIndex: number } }
) => {
  return await serverFetch(
    `/stores/menus/${params.menuIndex}`,
    {}
  )
}
