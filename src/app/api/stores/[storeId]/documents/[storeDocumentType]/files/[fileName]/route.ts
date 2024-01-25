import { NextRequest, NextResponse } from 'next/server'
import { serverFileFetch } from '@/app/api/_lib/fetch'
import { StoreDocumentType } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeDocumentType'

export const GET = async (
  request: NextRequest,
  { params }: { params: { storeId: string, storeDocumentType: StoreDocumentType, fileName: string } }
) => {
  const blob = await serverFileFetch(
    'v1',
    `/stores/${params.storeId}/documents/${params.storeDocumentType}/files/${params.fileName}`,
    {}
  )
  const headers = new Headers();
  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
