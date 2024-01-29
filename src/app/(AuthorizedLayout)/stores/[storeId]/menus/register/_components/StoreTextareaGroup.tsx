import React, { ChangeEvent, ReactNode } from 'react'
import { Box, TextareaAutosize, Typography } from '@mui/material'
import styles from './storeTextareaGroup.module.css'

type Props = {
  label: ReactNode,
  placeholder?: string,
  data: string,
  setData: (data: string) => void,
}

const StoreTextareaGroup = ({
  label,
  placeholder,
  data,
  setData
}: Props) => {
  const onChangeData = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value)
  }

  return (
    <>
      <Box className={styles.container}>
        <Typography className={styles.label}>
          {label}
        </Typography>
        <TextareaAutosize
          minRows={7}
          placeholder={placeholder}
          onChange={onChangeData}
          value={data}
          className={styles.textarea}
        />
      </Box>
    </>
  )
}

export default StoreTextareaGroup
