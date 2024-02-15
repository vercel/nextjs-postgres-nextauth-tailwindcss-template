'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeBusinessModify.module.css'
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
import { putStoreBusiness } from '@/app/(AuthorizedLayout)/stores/[storeId]/business/_lib/putStoreBusiness'
import {
  businessNameValidated,
  businessNumberValidated,
  ownerValidated
} from '@/app/(AuthorizedLayout)/stores/[storeId]/business/_lib/validated'
import FileField from '@/app/(AuthorizedLayout)/_components/form/FileField'
import { FileInputState } from '@/app/(AuthorizedLayout)/_models/state'
import { postStoreDocumentFile } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/postStoreDocumentFile'

/**
 * 매장 사업자 정보 변경 State.
 *
 * @property name             상호명
 * @property number           사업자 등록번호
 * @property owner            대표자명
 * @property registrationPath 사업자 등록증 경로
 */
type StoreBusinessModifyState = {
  name: TextFieldState,
  number: TextFieldState,
  owner: TextFieldState,
  registrationPath: FileInputState,
} & StoreModifyFormState

const initState = ({
  id,
  session,
  storeDetail
}: StoreModifyFormStateInitProps) => ({
  id: id,
  name: initBaseState(storeDetail?.businessName ?? ''),
  number: initBaseState(storeDetail?.businessNumber ?? ''),
  owner: initBaseState(storeDetail?.owner ?? ''),
  registrationPath: {
    name: storeDetail?.businessRegistrationPath ?? '',
    file: null
  },
  isValidated: true,
  session: session,
} as StoreBusinessModifyState)

const onModifyData = async (modifyData: StoreBusinessModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  if (modifyData.registrationPath.file) {
    const result = await postStoreDocumentFile({
      storeId: modifyData.id,
      storeDocumentType: 'BUSINESS_REGISTRATION',
      file: modifyData.registrationPath.file,
      session: modifyData.session
    })
    modifyData.registrationPath.name = result.data
  }

  return await putStoreBusiness(modifyData.id, {
    name: modifyData.name.value,
    number: modifyData.number.value,
    owner: modifyData.owner.value,
    registrationPath: modifyData.registrationPath.name,
  }, modifyData.session)
}

const StoreBusinessModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)
  const [modifyData, setModifyData] = useState<StoreBusinessModifyState>(
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
        alert('사업자 정보 변경이 실패하였습니다.')
        return
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('사업자 정보 변경이 실패하였습니다.')
    }
  })

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    const errorMessage = businessNameValidated(name)
    setModifyData((prev) => ({
      ...prev,
      name: {
        value: name,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value
    const errorMessage = businessNumberValidated(number)
    setModifyData((prev) => ({
      ...prev,
      number: {
        value: number,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeOwner = (event: ChangeEvent<HTMLInputElement>) => {
    const owner = event.target.value
    const errorMessage = ownerValidated(owner)
    setModifyData((prev) => ({
      ...prev,
      owner: {
        value: owner,
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
      title="사업자 정보"
      subtitle={storeId}
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <TextField
            id={"businessName"}
            label={"상호명"}
            state={modifyData.name}
            onChange={onChangeName}
          />
          <TextField
            id={"businessNumber"}
            label={"사업자 등록 번호"}
            state={modifyData.number}
            onChange={onChangeNumber}
          />
          <TextField
            id={"owner"}
            label={"대표자명"}
            state={modifyData.owner}
            onChange={onChangeOwner}
          />
          <FileField
            id={"registrationPath"}
            label={"사업자 등록증"}
            data={modifyData.registrationPath}
            setData={(businessRegistrationUrl) => {
              setModifyData((prev) => ({ ...prev, registrationPath: businessRegistrationUrl }))
            }}
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

export default StoreBusinessModifyModal
