import React, { ChangeEvent, ChangeEventHandler } from 'react'
import { Box, Typography } from '@mui/material'
import BaseTextField, { TextFieldState } from '@/app/_components/BaseTextField'
import styles from './storeTextField.module.css'

type Props = {
  id: string,
  label: string,
  placeHolder?: string,
  state: TextFieldState,
  onChange: ChangeEventHandler<HTMLInputElement>,
  required?: boolean
}

const StoreTextField = ({ id, label, placeHolder, state, onChange, required }: Props) => {
  return (
    <Box className={styles.container}>
      <Typography className={required ? styles.requiredLabel : styles.label}>
        {label}{required ? <>*</> : null}
      </Typography>
      <BaseTextField
        id={id}
        placeholder={placeHolder}
        state={state}
        onChange={onChange}
        className={styles.textField}
      />
    </Box>
  )
}

export default StoreTextField
