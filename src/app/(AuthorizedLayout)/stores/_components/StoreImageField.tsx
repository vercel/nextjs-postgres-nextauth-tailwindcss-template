'use client'

import React, { ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useRef } from 'react'
import { Box, FormControl, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import styles from './storeTextField.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Visibility } from '@mui/icons-material'
import BaseTextField from '@/app/_components/BaseTextField'
import { StoreRegisterState } from '@/app/(AuthorizedLayout)/stores/register/_components/StoreRegisterModal'

type Props = {
  id: string,
  label: string,
  data: string,
  setData: (imageUrl: string) => void,
}

const StoreImageField = ({ id, label, data, setData }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    imageRef.current?.click()
  }

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    if (event.target.files) {
      const file = event.target.files[0]

      // TODO 이미지 S3 업로드 기능 추가 필요.

      setData(file.name)
    }
  }

  return (
    <Box className={styles.container}>
      <Typography className={styles.label}>
        {label}
      </Typography>
      <TextField
        id={id}
        className={styles.textField}
        InputProps={{
          endAdornment: <CloudUploadIcon />
        }}
        value={data}
        onClick={handleClick}
      />
      <input
        type="file"
        className={styles.file}
        ref={imageRef}
        onChange={handleImageUpload}
      />
    </Box>
  )
}

export default StoreImageField
