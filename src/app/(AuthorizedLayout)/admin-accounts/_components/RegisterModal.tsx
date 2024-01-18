'use client'

import { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './register.module.css'
import BaseTextField, { TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { BasicButton } from '@/app/_components/BasicButton'
import { formatPhoneNumber } from '@/utils/phoneNumber'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postAdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/_lib/postAdminAccount'
import { useSession } from 'next-auth/react'
import { ACCESS_TOKEN_HEADER } from '@/auth'

type AdminAccountRegisterState = {
  id: TextFieldState;
  password: TextFieldState;
  name: TextFieldState;
  phoneNumber: TextFieldState;
  isValidated: boolean;
}

export default function AdminAccountRegisterView() {
  const router = useRouter()
  const { data: session } = useSession();
  const queryClient = useQueryClient()
  const [registerData, setRegisterData] = useState<AdminAccountRegisterState>({
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

  const mutation = useMutation({
    mutationFn: async (registerData: AdminAccountRegisterState) => {
      if (!registerData.isValidated) {
        return;
      }

      return await postAdminAccount({
        id: registerData.id.value,
        password: registerData.password.value,
        name: registerData.name.value,
        phoneNumber: registerData.phoneNumber.value
      }, session)
    },
    async onSuccess(response, variable) {
      if (!response?.ok) {
        alert('관리자 계정 등록이 실패하였습니다.');
        return;
      }

      const queryCache = queryClient.getQueryCache()
      queryCache.getAll()
        .map(cache => cache.queryKey)
        .filter((queryKey) => queryKey[0] === 'admin-accounts')
        .forEach((queryKey) => {
          queryClient.invalidateQueries({
            queryKey: queryKey
          })
        })
      router.back();
    },
    onError(error) {
      console.dir(error);
      alert('관리자 계정 등록이 실패하였습니다.');
    }
  })

  const onRegister = async () => {
    mutation.mutate(registerData)
  }

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value

    // TODO ID 입력값 유효성 체크 로직 추가 필요
    let errorMessage = '';
    if (id === '') {
      errorMessage = 'ID를 입력해주세요.'
    }

    setRegisterData((prev) => ({
      ...prev,
      id: {
        value: id,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated();
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password  = event.target.value

    // TODO ID 입력값 유효성 체크 로직 추가 필요
    let errorMessage = '';
    if (password === '') {
      errorMessage = '비밀번호를 입력해주세요.'
    }

    setRegisterData((prev) => ({
      ...prev,
      password: {
        value: password,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      },
    }))
    onValidated();
  }
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value

    // TODO ID 입력값 유효성 체크 로직 추가 필요
    let errorMessage = '';
    if (name === '') {
      errorMessage = '이름을 입력해주세요.'
    }

    setRegisterData((prev) => ({
      ...prev,
      name: {
        value: name,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      },
    }))
    onValidated();
  }
  const onChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value;

    // TODO ID 입력값 유효성 체크 로직 추가 필요
    let errorMessage = '';
    if (phoneNumber === '') {
      errorMessage = '연락처를 입력해주세요'
    }
    else if (formatPhoneNumber(phoneNumber) === undefined) {
      errorMessage = '잘못된 연락처를 입력하였습니다'
    }

    setRegisterData((prev) => ({
      ...prev,
      phoneNumber: {
        value: phoneNumber,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated();
  }

  const onValidated = () => {
    const isValidated = Object.entries(registerData)
      .filter(([key, value]) => key !== 'isValidated')
      .map(([key, value]) => value as TextFieldState)
      .every(value => !value.isError)

    setRegisterData((prev) => ({
      ...prev,
      isValidated: isValidated
    }))
  }

  return (
    <BaseModal
      title="관리자 계정 등록"
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
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
          <BasicButton
            label={'등록하기'}
            onClick={onRegister}
            disabled={!registerData.isValidated}
            sx={{
              height: '56px',
              borderRadius: '12px',
            }}
          />
        </Stack>
      </>
    </BaseModal>
  )
}
