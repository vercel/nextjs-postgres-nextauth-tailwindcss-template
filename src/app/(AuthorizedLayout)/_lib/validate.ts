import { TextFieldState } from '@/app/_components/BaseTextField'

export const isValidated = (data: Object) => Object.entries(data)
  .filter(([key, value]) => typeof value == 'object')
  .map(([key, value]) => value as TextFieldState)
  .every(value => !value.isError)
