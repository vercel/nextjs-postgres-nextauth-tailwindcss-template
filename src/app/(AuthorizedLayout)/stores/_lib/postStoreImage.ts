import { clientMultipartFetch } from '@/app/(AuthorizedLayout)/_lib/fetch'
import { Session } from 'next-auth'

export const postStoreImage = async (
  file: File,
  session?: Session | null
) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await clientMultipartFetch(
    `v1`,
    `/store/images`,
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
