'use client'

import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup } from '@mui/material'
import Image from 'next/image'
import styles from './page.module.css'
import { ChangeEvent, FormEventHandler, useState } from 'react'
import BaseTextField, { TextFieldState } from '@/component/BaseTextField'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const router = useRouter();
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

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // TODO 자동 로그인 처리 기능 추가

    // TODO Password 단방향 암호화 로직 추가

    const callbackUrl = `${process.env.NEXT_PUBLIC_LOCAL}/dashboard`
    await signIn("credentials", {
      username: idField.value,
      password: passwordField.value,
      redirect: true,
      callbackUrl
    })
      .then((response) => {
        console.log(`response:${response}`)
      })
      .catch((error) => {
        console.log(`error:${error}`)
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      })
  };

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    let errorMessage = '';
    // TODO ID 입력값 유효성 체크 로직 추가 필요

    setIdField({
      value: event.target.value,
      isError: errorMessage !== '',
      errorMessage: errorMessage,
    })
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    let errorMessage = '';
    // TODO Password 입력값 유효성 체크 로직 추가 필요

    setPasswordField({
      value: event.target.value,
      isError: errorMessage !== '',
      errorMessage: errorMessage,
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
          method={'POST'}
          autoComplete={'off'}
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
              marginTop: '52px'
            }}
          />
          <BaseTextField
            id="password"
            label="비밀번호"
            type="password"
            onChange={onChangePassword}
            state={passwordField}
            sx={{
              marginTop: '12px'
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
