import AdminAccountListContainer from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountListContainer'
import React from 'react'
import { PageProperties } from '@/models/common'

const AdminAccountModifyPage = async ({ pageParameters }: PageProperties) => {
  console.log("AdminAccountModifyPage", pageParameters)

  // @ts-ignore
  return <AdminAccountListContainer pageParameters={pageParameters} />
}

export default AdminAccountModifyPage;
