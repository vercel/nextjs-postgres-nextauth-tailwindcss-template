import { formatPhoneNumber } from '@/utils/phoneNumber'

export const idValidated = (id: string) => {
  let errorMessage = '';

  // TODO ID 입력값 유효성 체크 로직 추가 필요
  if (id === '') {
    errorMessage = '이름을 입력해주세요.'
  }
  return errorMessage
}

export const passwordValidated = (password: string) => {
  let errorMessage = ''

  // TODO 비밀번호 입력값 유효성 체크 로직 추가 필요
  if (password === '') {
    errorMessage = '비밀번호를 입력해주세요.'
  }

  return errorMessage
}

export const nameValidated = (name: string) => {
  let errorMessage = ''

  // TODO 이름 입력값 유효성 체크 로직 추가 필요
  if (name === '') {
    errorMessage = '이름을 입력해주세요.'
  }

  return errorMessage
}

export const phoneNumberValidated = (phoneNumber: string) => {
  let errorMessage = ''

  // TODO 연락처 입력값 유효성 체크 로직 추가 필요
  if (phoneNumber === '') {
    errorMessage = '연락처를 입력해주세요'
  }
  else if (formatPhoneNumber(phoneNumber) === undefined) {
    errorMessage = '잘못된 연락처를 입력하였습니다'
  }

  return errorMessage
}
