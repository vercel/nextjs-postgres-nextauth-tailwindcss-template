import { TextFieldState } from '@/app/_components/BaseTextField'

export const isValidated = (data: Object) => Object.entries(data)
  .filter(([key, value]) => key !== 'isValidated')
  .map(([key, value]) => value as TextFieldState)
  .every(value => !value.isError)
