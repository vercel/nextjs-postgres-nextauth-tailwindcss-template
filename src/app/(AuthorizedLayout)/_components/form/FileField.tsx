'use client'

import React, { ChangeEventHandler, useRef } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import styles from './textField.module.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { FileInputState } from '@/app/(AuthorizedLayout)/_models/state'

type Props = {
  id: string,
  label: string,
  data: FileInputState,
  setData: (data: FileInputState) => void,
}

const FileField = ({ id, label, data, setData }: Props) => {
  const imageRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    imageRef.current?.click()
  }

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    if (event.target.files) {
      const file = event.target.files[0]
      setData({
        name: file.name,
        file: file
      })
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
        value={data.name}
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

export default FileField
