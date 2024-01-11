"use client"

import { TextFieldState } from 'thunder-order'
import { useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import BaseCard from '@/component/BaseCard'
import styles from './page.module.css'

type AdminAccountRegisterState = {
  id: TextFieldState;
  password: TextFieldState;
  name: TextFieldState;
  phoneNumber: TextFieldState;
  isValidated: boolean;
}

export default function AdminAccountRegisterView() {
  const [registerData] = useState<AdminAccountRegisterState>({
  id: {
    value: '',
    isError: false,
    errorMessage: ''
  },
  password: {
    value: '',
    isError: false,
    errorMessage: ''
  },
  name: {
    value: '',
    isError: false,
    errorMessage: ''
  },
  phoneNumber: {
    value: '',
    isError: false,
    errorMessage: ''
  },
  isValidated: false
});

  const onSubmit = () => {}
  const onChangeId = () => {}
  const onChangePassword = () => {}
  const onChangeName = () => {}
  const onChangePhoneNumber = () => {}
  return (
    <BaseCard
      title="관리자 계정 등록"
      className={styles.baseCard}
      action={
        <Button
          variant="contained"
          color="primary"
          disabled={!registerData.isValidated}
          onClick={() => onSubmit()}
        >
          등록하기
        </Button>
      }
    >
      <>
        <Stack spacing={3}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={registerData.id.value}
            error={registerData.id.isError}
            helperText={registerData.id.errorMessage}
            onChange={onChangeId}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={registerData.password.value}
            error={registerData.password.isError}
            helperText={registerData.password.errorMessage}
            onChange={onChangePassword}
          />
          <TextField
            id="name"
            label="이름"
            variant="outlined"
            value={registerData.name.value}
            error={registerData.name.isError}
            helperText={registerData.name.errorMessage}
            onChange={onChangeName}
          />
          <TextField
            id="phoneNumber"
            label="연락처"
            type="tel"
            variant="outlined"
            value={registerData.phoneNumber.value}
            error={registerData.phoneNumber.isError}
            helperText={registerData.phoneNumber.errorMessage}
            onChange={onChangePhoneNumber}
          />
        </Stack>
      </>
    </BaseCard>
  )
}
