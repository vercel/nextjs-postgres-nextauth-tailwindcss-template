import { formatPhoneNumber } from '@/app/(AuthorizedLayout)/_lib/phoneNumber'

export const storeIdValidated = (storeId: string) => {
  let errorMessage = '';
  if (storeId === '') {
    errorMessage = '매장 ID를 입력해주세요.'
  } else if (!storeId.match(/[a-zA-Z0-9]{1,50}/)) {
    errorMessage = "매장 ID를 확인해주세요."
  }
  return errorMessage
}
export const nameValidated = (name: string) => {
  let errorMessage = '';
  if (name === '') {
    errorMessage = '매장명을 입력해주세요.'
  } else if (Buffer.byteLength(name) > 120 || name.length > 60) {
    errorMessage = '매장명을 확인해주세요.'
  }
  return errorMessage
}

export const storeTelValidated = (storeTel: string) => {
  let errorMessage = '';
  if (storeTel !== '' && formatPhoneNumber(storeTel) === undefined) {
    errorMessage = '매장 전화번호를 확인해주세요.'
  }
  return errorMessage
}

export const bankValidated = (bank: string) => {
  let errorMessage = '';
  if (bank !== '' && Buffer.byteLength(bank) > 50) {
    errorMessage = '은행을 확인해주세요.'
  }
  return errorMessage
}

export const accountHolderValidated = (accountHolder: string) => {
  let errorMessage = '';
  if (accountHolder !== '' && Buffer.byteLength(accountHolder) > 50) {
    errorMessage = '예금주를 확인해주세요.'
  }
  return errorMessage
}

export const accountNumberValidated = (accountNumber: string) => {
  let errorMessage = '';
  if (accountNumber !== '' && !accountNumber.match(/[0-9-]{1,50}/)) {
    errorMessage = '계좌번호를 확인해주세요.'
  }
  return errorMessage
}

export const businessLocationValidated = (businessLocation: string) => {
  let errorMessage = '';
  if (businessLocation !== '' && Buffer.byteLength(businessLocation) > 255) {
    errorMessage = '영업 소재지를 확인해주세요.'
  }
  return errorMessage
}
