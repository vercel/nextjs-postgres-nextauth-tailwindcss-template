
const StoreManagerModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreManagerModifyModal storeId={params.storeId} />
}

export default StoreManagerModifyModalPage;
