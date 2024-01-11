'use client'

import { useState } from 'react'
import { Button, Stack } from '@mui/material'
import BaseCard from '@/component/BaseCard'
import styles from './page.module.css'
import BaseTextField, { TextFieldState } from '@/component/BaseTextField'

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
          <BaseTextField
            id="id"
            label="ID"
            state={registerData.id}
            onChange={onChangeId}
          />
          <BaseTextField
            id="password"
            label="Password"
            type="password"
            state={registerData.password}
            onChange={onChangePassword}
          />
          <BaseTextField
            id="name"
            label="이름"
            state={registerData.name}
            onChange={onChangeName}
          />
          <BaseTextField
            id="phoneNumber"
            label="연락처"
            type="tel"
            state={registerData.phoneNumber}
            onChange={onChangePhoneNumber}
          />
        </Stack>
      </>
    </BaseCard>
  )
}
