'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './customerIdModify.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { Session } from 'next-auth'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'
import { CustomerProps } from '@/app/(AuthorizedLayout)/customers/[customerId]/_models/props'
import { FormState } from '@/app/(AuthorizedLayout)/_models/state'
import { putCustomerId } from '@/app/(AuthorizedLayout)/customers/[customerId]/id/_lib/putCustomerId'
import { modifyIdValidated } from '@/app/(AuthorizedLayout)/customers/[customerId]/id/_lib/validated'
import { invalidateCustomersQueries } from '../../../_lib/invalidateQueries'

/**
 * 사용자 ID 변경 State.
 *
 * @property customerId 사용자 ID
 * @property modifyId   변경할 ID
 */
type CustomerIdModifyState = {
  customerId: string,
  modifyId: TextFieldState,
} & FormState

const initState = ({ customerId, session }: {
  customerId: string,
  session: Session | null
}) => ({
  customerId: customerId,
  modifyId: initBaseState(),
  isValidated: false,
  session: session,
} as CustomerIdModifyState)

const onModifyData = async (modifyData: CustomerIdModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  return await putCustomerId(modifyData.customerId, {
    id: modifyData.modifyId.value
  }, modifyData.session)
}

const CustomerIdModifyModal = ({ customerId }: CustomerProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [modifyData, setModifyData] = useState<CustomerIdModifyState>(
    initState({
      customerId,
      session
    })
  )

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: onModifyData,
    async onSuccess(response) {
      if (response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.")
        router.push(SIGN_OUT_PAGE_PATH)
        return
      }

      if (!response?.ok) {
        alert('사용자 ID 변경이 실패하였습니다.')
        return
      }

      await invalidateCustomersQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('사용자 ID 변경이 실패하였습니다.')
    }
  })

  const onChangeModifyId = (event: ChangeEvent<HTMLInputElement>) => {
    const modifyId = event.target.value
    const errorMessage = modifyIdValidated(modifyId)
    setModifyData((prev) => ({
      ...prev,
      modifyId: {
        value: modifyId,
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
      title="사용자 정보"
      subtitle={`${customerId}`}
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <TextField
            id={"modifyId"}
            label={"ID"}
            type={'email'}
            placeHolder={"email"}
            state={modifyData.modifyId}
            onChange={onChangeModifyId}
          />
          <ConfirmButton
            isValidated={modifyData.isValidated}
            handelCancel={() => router.back()}
            handleConfirm={() => mutation.mutate(modifyData)}
          />
        </Stack>
      </>
    </BaseModal>
  )
}

export default CustomerIdModifyModal
