'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeManagerModify.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { Session } from 'next-auth'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/response'
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
 * @property managerName         담당자명
 * @property managerPhoneNumber  담당자 연락처
 */
type StoreManagerModifyState = {
  managerName: TextFieldState,
  managerPhoneNumber: TextFieldState,
} & StoreModifyFormState

const initState = ({
   id,
   session,
   storeDetail
}: StoreModifyFormStateInitProps) => ({
  storeId: id,
  managerName: initBaseState(storeDetail?.managerName ?? ''),
  managerPhoneNumber: initBaseState(storeDetail?.managerPhoneNumber ?? ''),
  isValidated: true,
  session: session,
})

const onModifyData = async (modifyData: StoreManagerModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  return await putStoreManager(modifyData.id, {
    managerName: modifyData.managerName.value,
    managerPhoneNumber: modifyData.managerPhoneNumber.value,
  }, modifyData.session)
}

const StoreManagerModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)
  const [modifyData, setModifyData] = useState<StoreManagerModifyState>(
    initState({
      id: storeId,
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
      managerName: {
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
      managerPhoneNumber: {
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
            state={modifyData.managerName}
            onChange={onChangeManagerName}
          />
          <TextField
            id={"managerPhoneNumber"}
            label={"연락처"}
            state={modifyData.managerPhoneNumber}
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
