import { clientFetch, clientMultipartFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'
import { StoreDocumentType } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeDocumentType'

type Props = {
  storeId: string
  storeDocumentType: StoreDocumentType
  file: File
  session?: Session | null
}

export const postStoreDocumentFile = async ({ storeId, storeDocumentType, file, session}: Props) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await clientMultipartFetch(
    `v1`,
    `/store/${storeId}/documents/${storeDocumentType}/files`,
    {
      method: 'POST',
      body: formData
    },
    session
  )

  if(!response.ok) {
    return Promise.reject(new Error())
  }
  return response.json()
}
