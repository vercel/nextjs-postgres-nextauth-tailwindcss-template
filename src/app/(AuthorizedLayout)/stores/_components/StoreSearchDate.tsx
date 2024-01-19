import React from 'react'
import { StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/Store'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ko'
import styles from './storeListView.module.css'
import { Box, Typography } from '@mui/material'

const StoreSearchDate = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
  const handleStartDateChange = (startDate: string | null) => {
    setPageParameters((prev) => ({
      ...prev,
      createdStartDate: startDate ?? ''
    }))
  }

  const handleEndDateChange = (endDate: string | null) => {
    setPageParameters((prev) => ({
      ...prev,
      createdEndDate: endDate ?? ''
    }))
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={'ko'}
    >
      <Box className={styles.searchDateContainer}>
        <Typography className={styles.searchDateLabel}>
          등록일
        </Typography>
        <Box className={styles.searchDateBox}>
          <DatePicker
            value={pageParameters.createdStartDate}
            format="YYYY-MM-DD"
            className={styles.searchDate}
            onChange={handleStartDateChange}
          />
          <Typography className={styles.searchDateLabel}>~</Typography>
          <DatePicker
            value={pageParameters.createdEndDate}
            format="YYYY-MM-DD"
            className={styles.searchDate}
            onChange={handleEndDateChange}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default StoreSearchDate
