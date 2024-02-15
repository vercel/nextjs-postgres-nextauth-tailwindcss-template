import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { Suspense } from 'react'
import CustomerIdModifyModal from '@/app/(AuthorizedLayout)/customers/[customerId]/id/_components/CustomerIdModifyModal'

const CustomerIdModifyModalPage = async ({ params }: { params: { customerId: string } }) => {
  const customerId = decodeURIComponent(params.customerId)
  return (
    <Suspense fallback={<Loading />}>
      <CustomerIdModifyModal customerId={customerId} />
    </Suspense>
  )
}

export default CustomerIdModifyModalPage;
