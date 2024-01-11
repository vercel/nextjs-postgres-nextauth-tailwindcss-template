'use client'

import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup } from '@mui/material'
import Image from 'next/image'
import styles from './page.module.css'
import { ChangeEvent, useState } from 'react'
import BaseTextField, { TextFieldState } from '@/component/BaseTextField'

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
  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setIdField({
      ...idField,
      value: event.target.value
    })
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordField({
      ...passwordField,
      value: event.target.value
    })
  }
  const onClickAutoLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setAutoLogin(event.target.checked)
  }

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
          onSubmit={onSubmit}
        >
          <Image
            src="/images/logos/login-logo.svg"
            alt="login-logo"
            width={208}
            height={120}
            priority
          />
          <BaseTextField
            id="id"
            label="아이디"
            onChange={onChangeId}
            state={idField}
            sx={{
              marginTop: '52px',
            }}
          />
          <BaseTextField
            id="password"
            label="비밀번호"
            type="password"
            onChange={onChangePassword}
            state={passwordField}
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
                onChange={onClickAutoLogin}
              />}
              label="자동로그인"
            />
          </FormGroup>

          <Button
            type="submit"
            variant="contained"
            className={styles.button}
          >
            로그인
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default SignIn;
