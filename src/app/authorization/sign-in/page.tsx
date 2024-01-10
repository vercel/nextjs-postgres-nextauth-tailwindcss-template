"use client"

import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'
import { TextFieldState } from 'thunder-order'

const SignIn = () => {
  const [idField, setIdField] = useState<TextFieldState>({
    value: '',
    isError: false,
    errorMessage: '',
  });
  const [passwordField, setPasswordField] = useState<TextFieldState>({
    value: '',
    isError: false,
    errorMessage: '',
  });
  const [isAutoLogin, setAutoLogin] = useState<boolean>(false)

  const onSubmit = () => {}
  const onChangeId = () => {}
  const onChangePassword = () => {}
  const onClickAutoLogin = () => {}

  return (
    <div className={styles.mainWrapper}>
      <Container
        maxWidth={"xs"}
        className={styles.container}>
        <Box
          component="form"
          method={"POST"}
          autoComplete={"off"}
          className={styles.form}
        >
          <Image
            src="/images/logos/login-logo.svg"
            alt="login-logo"
            width={208}
            height={120}
            priority
          />
          <TextField
            id="id"
            label="아이디"
            className={styles.textField}
            onChange={onChangeId}
            error={idField.isError}
            helperText={idField.errorMessage}
            value={idField.value}
            sx={{
              marginTop: '52px',
            }}
          />
          <TextField
            id="password"
            label="비밀번호"
            type="password"
            className={styles.textField}
            onChange={onChangePassword}
            error={passwordField.isError}
            helperText={passwordField.errorMessage}
            value={passwordField.value}
            sx={{
              marginTop: '12px',
            }}
          />
          <FormGroup className={styles.checkboxGroup}>
            <FormControlLabel
              className={styles.checkboxLabel}
              control={<Checkbox
                className={styles.checkbox}
                checked={isAutoLogin}
              />}
              label="자동로그인"
            />
          </FormGroup>

          <Button type="submit" variant="contained" className={styles.button}>
            로그인
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default SignIn;
