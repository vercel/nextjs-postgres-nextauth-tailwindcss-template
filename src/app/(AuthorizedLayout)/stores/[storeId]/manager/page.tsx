import StoreDetailContainer from "../_components/StoreDetailContainer";

const StoreManagerModifyPage = async ({ params }: { params: { storeId: string } }) => {
  // @ts-ignore
  return <StoreDetailContainer storeId={params.storeId} />
}

export default StoreManagerModifyPage;