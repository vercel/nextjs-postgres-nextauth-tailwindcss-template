'use client'

import React, { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react'
import { Box, FormControl, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import styles from './storeTextField.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Visibility } from '@mui/icons-material'
import BaseTextField from '@/app/_components/BaseTextField'
import { StoreRegisterState } from '@/app/(AuthorizedLayout)/stores/register/_components/StoreRegisterModal'

type Props = {
  id: string,
  label: string,
  registerData: StoreRegisterState,
  setRegisterData: Dispatch<SetStateAction<StoreRegisterState>>,
}

const StoreImageField = ({ id, label, registerData, setRegisterData }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    imageRef.current?.click()
  }

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    if (event.target.files) {
      const file = event.target.files[0]

      // TODO 이미지 S3 업로드 기능 추가 필요.

      setRegisterData((prev) => ({
        ...prev,
        imageUrl: file.name
      }))
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
        value={registerData.imageUrl}
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
