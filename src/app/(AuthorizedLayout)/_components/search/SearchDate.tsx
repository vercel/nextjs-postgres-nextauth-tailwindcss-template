import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from './searchDate.module.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ko } from 'date-fns/locale/ko'
import { formatDate, parseDate } from '@/app/(AuthorizedLayout)/_lib/date'

type Props = {
  label: string,
  startDate: string,
  endDate: string,
  setStartDate: (statDate: string) => void,
  setEndDate: (statDate: string) => void,
}

const SearchDate = ({
  label,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) => {
  const handleStartDateChange = (value: Date | null) => {
    const startDate = formatDate(value)
    setStartDate(startDate ?? '')
  }

  const handleEndDateChange = (value: Date | null) => {
    const endDate = formatDate(value)
    setEndDate(endDate ?? '')
  }
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ko}
    >
      <Box className={styles.searchDateContainer}>
        <Typography className={styles.searchDateLabel}>
          {label}
        </Typography>
        <Box className={styles.searchDateBox}>
          <DatePicker
            value={parseDate(startDate)}
            format="yyyy. MM. dd"
            className={styles.searchDate}
            onChange={handleStartDateChange}
          />
          <Typography className={styles.searchDateLabel}>~</Typography>
          <DatePicker
            value={parseDate(endDate)}
            format="yyyy. MM. dd"
            className={styles.searchDate}
            onChange={handleEndDateChange}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default SearchDate
