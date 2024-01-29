const URI = 'https://s3.ap-northeast-2.amazonaws.com/kr.co.dupier.thunder-order'

export const storeMenuDescriptionImageUrl = (storeId: string, fileName: string) => {
  return `${URI}/stores/${storeId}/menus/description/images/${fileName}`
}
