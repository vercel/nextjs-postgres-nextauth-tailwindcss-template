import { clientMultipartFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'

type Props = {
  storeId: string
  file: File
  session?: Session | null
}

export const postStoreMenuDescriptionImage = async ({ storeId, file, session}: Props) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await clientMultipartFetch(
    `/stores/${storeId}/menus/description/images`,
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
