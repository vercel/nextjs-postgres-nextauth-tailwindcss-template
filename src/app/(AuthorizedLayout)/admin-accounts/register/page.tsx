import AdminAccountListContainer from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountListContainer'
import { PageProperties } from '@/models/common'
import React from 'react'

const Page = async ({ pageParameters }: PageProperties) => {
  // @ts-ignore
  return <AdminAccountListContainer pageParameters={pageParameters} />
}

export default Page;
