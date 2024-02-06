'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storePasswordModify.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { confirmPasswordValidated, passwordValidated } from '@/app/(AuthorizedLayout)/stores/_lib/validated'
import { Session } from 'next-auth'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { putStorePassword } from '@/app/(AuthorizedLayout)/stores/[storeId]/password/_lib/putStorePassword'
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'
import { StoreModifyFormState } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeModifyFormState'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'

/**
 * 매장 비밀번호 변경 State.
 *
 * @property password         비밀번호
 * @property confirmPassword  비밀번호 확인
 */
type StorePasswordModifyState = {
  password: TextFieldState,
  confirmPassword: TextFieldState,
} & StoreModifyFormState

const initState = ({ storeId, session }: {
  storeId: string,
  session: Session | null
}) => ({
  id: storeId,
  password: initBaseState(),
  confirmPassword: initBaseState(),
  isValidated: false,
  session: session,
} as StorePasswordModifyState)

const onModifyData = async (modifyData: StorePasswordModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  return await putStorePassword(modifyData.id, {
    password: modifyData.password.value
  }, modifyData.session)
}

const StorePasswordModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [modifyData, setModifyData] = useState<StorePasswordModifyState>(
    initState({
      storeId,
      session
    })
  )

  const mutation = useMutation({
    mutationFn: onModifyData,
    async onSuccess(response) {
      if (response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.")
        router.push(SIGN_OUT_PAGE_PATH)
        return
      }

      if (!response?.ok) {
        alert('비밀번호 변경이 실패하였습니다.')
        return
      }

      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('비밀번호 변경이 실패하였습니다.')
    }
  })

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    const errorMessage = passwordValidated(password)
    setModifyData((prev) => ({
      ...prev,
      password: {
        value: password,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value
    const errorMessage = confirmPasswordValidated(modifyData.password.value, confirmPassword)
    setModifyData((prev) => ({
      ...prev,
      confirmPassword: {
        value: confirmPassword,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onValidated = () => {
    setModifyData((prev) => ({
      ...prev,
      isValidated: isValidated(modifyData)
    }))
  }

  return (
    <BaseModal
      title="비밀번호 변경"
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <TextField
            id={"password"}
            label={"비밀번호"}
            type={'password'}
            placeHolder={"영문(소문자)+숫자만"}
            state={modifyData.password}
            onChange={onChangePassword}
          />
          <TextField
            id={"confirmPassword"}
            label={"비밀번호 확인"}
            type={'password'}
            placeHolder={"최소 8글자"}
            state={modifyData.confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          <ConfirmButton
            isValidated={modifyData.isValidated}
            handelCancel={() => router.back()}
            handleConfirm={() => mutation.mutate(modifyData)} />
        </Stack>
      </>
    </BaseModal>
  )
}

export default StorePasswordModifyModal
