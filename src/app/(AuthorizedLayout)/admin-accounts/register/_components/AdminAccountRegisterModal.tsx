'use client'

import { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './adminAccountRegister.module.css'
import BaseTextField, { TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { BasicButton } from '@/app/_components/BasicButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postAdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/register/_lib/postAdminAccount'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { idValidated, nameValidated, passwordValidated } from '@/app/(AuthorizedLayout)/admin-accounts/_lib/validated'
import { invalidateAdminAccountsQueries } from '@/app/(AuthorizedLayout)/admin-accounts/_lib/invalidateQueries'

type AdminAccountRegisterState = {
  id: TextFieldState;
  password: TextFieldState;
  name: TextFieldState;
  phoneNumber: TextFieldState;
  isValidated: boolean;
}

export default function AdminAccountRegisterView() {
  const router = useRouter()
  const { data: session } = useSession()
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
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (registerData: AdminAccountRegisterState) => {
      if (!registerData.isValidated) {
        return
      }

      return await postAdminAccount({
        id: registerData.id.value,
        password: registerData.password.value,
        name: registerData.name.value,
        phoneNumber: registerData.phoneNumber.value
      }, session)
    },
    async onSuccess(response) {
      if (!response?.ok) {
        alert('관리자 계정 등록이 실패하였습니다.')
        return
      }

      await invalidateAdminAccountsQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('관리자 계정 등록이 실패하였습니다.')
    }
  })

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value
    const errorMessage = idValidated(id)
    setRegisterData((prev) => ({
      ...prev,
      id: {
        value: id,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    const errorMessage = passwordValidated(password)
    setRegisterData((prev) => ({
      ...prev,
      password: {
        value: password,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    const errorMessage = nameValidated(name)
    setRegisterData((prev) => ({
      ...prev,
      name: {
        value: name,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }
  const onChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value
    const errorMessage = nameValidated(phoneNumber)
    setRegisterData((prev) => ({
      ...prev,
      phoneNumber: {
        value: phoneNumber,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onValidated = () => {
    setRegisterData((prev) => ({
      ...prev,
      isValidated: isValidated(registerData)
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
            onClick={() => mutation.mutate(registerData)}
            disabled={!registerData.isValidated}
            sx={{
              height: '56px',
              borderRadius: '12px'
            }}
          />
        </Stack>
      </>
    </BaseModal>
  )
}
