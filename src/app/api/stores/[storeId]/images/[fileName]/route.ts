import { NextRequest, NextResponse } from 'next/server'
import { serverFileFetch } from '@/app/api/_lib/fetch'

export const GET = async (
  request: NextRequest,
  { params }: { params: { storeId: string, fileName: string } }
) => {
  const blob = await serverFileFetch(
    'v1',
    `/stores/${params.storeId}/images/${params.fileName}`,
    {}
  )
  const headers = new Headers();
  headers.set("Content-Type", "image/*");
  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
