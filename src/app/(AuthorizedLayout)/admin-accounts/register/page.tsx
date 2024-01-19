import AdminAccountListContainer from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountListContainer'
import { PageProperties } from '@/app/(AuthorizedLayout)/_models/common'
import React from 'react'

const AdminAccountRegisterPage = async ({ pageParameters }: PageProperties) => {
  // @ts-ignore
  return <AdminAccountListContainer pageParameters={pageParameters} />
}

export default AdminAccountRegisterPage;
