'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../../_components/form/textField.module.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type Props = {
  label: string,
  data: string,
  setData: (imageUrl: string) => void,
}

const StoreDateField = ({ label, data, setData }: Props) => {
  const handleDateChange = (date: string | null) => {
    setData(date ?? '')
  }

  return (
    <Box className={styles.container}>
      <Typography className={styles.label}>
        {label}
      </Typography>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={'ko'}
      >
        <DatePicker
          value={data}
          format="YYYY. MM. DD"
          className={styles.textField}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default StoreDateField
