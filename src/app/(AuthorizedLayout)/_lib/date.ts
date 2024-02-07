import { format } from 'date-fns/format'
import { parse } from 'date-fns'

export const formatDate = (date?: Date | null) => {
  if (date === null || date === undefined) {
    return null
  }

  const dateString = format(date, 'yyyy. MM. dd')
  if (dateString === '1970. 01. 01') {
    return null
  }
  return dateString
}

export const parseDate = (date: string) => {
  return parse(date, 'yyyy. MM. dd', new Date())
}
