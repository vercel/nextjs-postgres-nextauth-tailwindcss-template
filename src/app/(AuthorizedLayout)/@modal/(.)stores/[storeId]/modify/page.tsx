
const StoreModifyModalPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreModifyModal storeId={params.storeId} />
}

export default StoreModifyModalPage;
