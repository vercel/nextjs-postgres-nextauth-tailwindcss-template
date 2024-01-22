import { format } from 'date-fns/format'

export const formatDate = (date?: Date) => {
  if (date === null || date === undefined) {
    return null
  }

  const dateString = format(date, 'yyyy. MM. dd')
  if (dateString === '1970. 01. 01') {
    return null
  }
  return dateString
}
