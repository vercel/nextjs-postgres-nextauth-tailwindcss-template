'use client'

import React, { ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useRef } from 'react'
import { Box, FormControl, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import styles from './storeTextField.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Visibility } from '@mui/icons-material'
import BaseTextField from '@/app/_components/BaseTextField'
import { StoreRegisterState } from '@/app/(AuthorizedLayout)/stores/register/_components/StoreRegisterModal'
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
          format="YYYY-MM-DD"
          className={styles.textField}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default StoreDateField
