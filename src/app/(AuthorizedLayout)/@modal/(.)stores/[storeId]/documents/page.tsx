import StoreDocumentsModifyContainer
  from '@/app/(AuthorizedLayout)/stores/[storeId]/documents/_components/StoreDocumentsModifyContainer'

const StoreDocumentModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreDocumentsModifyContainer storeId={params.storeId} />
}

export default StoreDocumentModifyModalPage;
