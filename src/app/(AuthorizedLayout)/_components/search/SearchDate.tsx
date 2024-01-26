import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Box, Typography } from '@mui/material'
import styles from './searchDate.module.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

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
  const handleStartDateChange = (startDate: string | null) => {
    setStartDate(startDate ?? '')
  }

  const handleEndDateChange = (endDate: string | null) => {
    setEndDate(endDate ?? '')
  }
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={'ko'}
    >
      <Box className={styles.searchDateContainer}>
        <Typography className={styles.searchDateLabel}>
          {label}
        </Typography>
        <Box className={styles.searchDateBox}>
          <DatePicker
            value={startDate}
            format="YYYY. MM. DD"
            className={styles.searchDate}
            onChange={handleStartDateChange}
          />
          <Typography className={styles.searchDateLabel}>~</Typography>
          <DatePicker
            value={endDate}
            format="YYYY. MM. DD"
            className={styles.searchDate}
            onChange={handleEndDateChange}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default SearchDate
