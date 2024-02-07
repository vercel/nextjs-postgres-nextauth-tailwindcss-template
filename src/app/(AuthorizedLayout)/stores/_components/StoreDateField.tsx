'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../../_components/form/textField.module.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ko } from 'date-fns/locale/ko'
import { formatDate, parseDate } from '@/app/(AuthorizedLayout)/_lib/date'

type Props = {
  label: string,
  data: string,
  setData: (imageUrl: string) => void,
}

const StoreDateField = ({ label, data, setData }: Props) => {
  const handleDateChange = (date: Date | null) => {
    const dateValue = formatDate(date)
    setData(dateValue ?? '')
  }

  return (
    <Box className={styles.container}>
      <Typography className={styles.label}>
        {label}
      </Typography>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ko}
      >
        <DatePicker
          value={parseDate(data)}
          format="yyyy. MM. dd"
          className={styles.textField}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default StoreDateField
