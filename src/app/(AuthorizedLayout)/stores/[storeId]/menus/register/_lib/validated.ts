export const menuNameValidated = (menuName: string) => {
  if (menuName === '') {
    return '메뉴명를 입력해주세요.'
  } else if (Buffer.byteLength(menuName) > 100) {
    return "메뉴명을 확인해주세요."
  }
  return ''
}

export const menuEnglishNameValidated = (menuEnglishName: string) => {
  if (Buffer.byteLength(menuEnglishName) > 100) {
    return '영문 메뉴명을 확인해주세요.'
  }
  return ''
}

export const priceValidated = (price: string) => {
  if (!price.match(/[0-9]*/)) {
    return '가격을 확인해주세요.'
  }
  return ''
}
