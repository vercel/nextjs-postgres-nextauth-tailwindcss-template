'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeManagerModify.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/_hooks/useStoreDetail'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { StoreModifyFormState } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeModifyFormState'
import { StoreModifyFormStateInitProps, StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import { putStoreManager } from '@/app/(AuthorizedLayout)/stores/[storeId]/manager/_lib/putStoreManager'
import {
  managerNameValidated,
  managerPhoneNumberValidated
} from '@/app/(AuthorizedLayout)/stores/[storeId]/manager/_lib/validated'

/**
 * 매장 담당자 정보 변경 State.
 *
 * @property name         담당자명
 * @property phoneNumber  담당자 연락처
 */
type StoreManagerModifyState = {
  name: TextFieldState,
  phoneNumber: TextFieldState,
} & StoreModifyFormState

const initState = ({
   id,
   session,
   storeDetail
}: StoreModifyFormStateInitProps) => ({
  index: id,
  name: initBaseState(storeDetail?.managerName ?? ''),
  phoneNumber: initBaseState(storeDetail?.managerPhoneNumber ?? ''),
  isValidated: true,
  session: session,
} as StoreManagerModifyState)

const onModifyData = async (modifyData: StoreManagerModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  return await putStoreManager(modifyData.id, {
    name: modifyData.name.value,
    phoneNumber: modifyData.phoneNumber.value,
  }, modifyData.session)
}

const StoreManagerModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)
  const [modifyData, setModifyData] = useState<StoreManagerModifyState>(
    initState({
      index: storeId,
      session,
      storeDetail
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
        alert('매장 담당자 정보 변경이 실패하였습니다.')
        return
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('매장 담당자 정보 변경이 실패하였습니다.')
    }
  })

  const onChangeManagerName = (event: ChangeEvent<HTMLInputElement>) => {
    const managerName = event.target.value
    const errorMessage = managerNameValidated(managerName)
    setModifyData((prev) => ({
      ...prev,
      name: {
        value: managerName,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeManagerPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const managerPhoneNumber = event.target.value
    const errorMessage = managerPhoneNumberValidated(managerPhoneNumber)
    setModifyData((prev) => ({
      ...prev,
      phoneNumber: {
        value: managerPhoneNumber,
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

  if (isLoading || storeDetail === undefined) {
    return <Loading />
  }

  return (
    <BaseModal
      title="담당자 변경"
      subtitle={storeId}
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <TextField
            id={"managerName"}
            label={"이름"}
            state={modifyData.name}
            onChange={onChangeManagerName}
          />
          <TextField
            id={"managerPhoneNumber"}
            label={"연락처"}
            state={modifyData.phoneNumber}
            onChange={onChangeManagerPhoneNumber}
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

export default StoreManagerModifyModal
