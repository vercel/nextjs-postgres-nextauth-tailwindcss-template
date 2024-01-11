"use client"

import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import styles from './BaseTextField.module.css'

/**
 * TextField(Input) Props.
 *
 * @property value         값
 * @property isError       에러 여부
 * @property errorMesssage 에러 메시지
 */
export type TextFieldState = {
  value: string;
  isError: boolean;
  errorMessage: string;
}

const BaseTextField = (props: {state : TextFieldState} & TextFieldProps) => {
  return (
    <TextField
      variant="outlined"
      className={styles.textField}
      value={props.state.value}
      error={props.state.isError}
      helperText={props.state.errorMessage}
      { ...props }
    />
  )
}

export default BaseTextField
