import AdminAccountListContainer from '@/app/(AuthorizedLayout)/admin-accounts/_components/AdminAccountListContainer'
import React, { Suspense } from 'react'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'

const AdminAccountListPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <AdminAccountListContainer />
    </Suspense>
  )
}

export default AdminAccountListPage;
