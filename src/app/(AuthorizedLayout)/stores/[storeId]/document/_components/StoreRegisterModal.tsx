'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeRegister.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { BasicButton } from '@/app/_components/BasicButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import {
  businessLocationValidated,
  nameValidated,
  storeIdValidated, storeTelValidated
} from '@/app/(AuthorizedLayout)/stores/_lib/validated'
import { Session } from 'next-auth'
import { postStore } from '@/app/(AuthorizedLayout)/stores/register/_lib/postStore'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import StoreTextField from '@/app/(AuthorizedLayout)/stores/_components/StoreTextField'
import StoreImageField from '@/app/(AuthorizedLayout)/stores/_components/StoreImageField'
import StoreBankAccountFieldGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreBankAccountFieldGroup'
import StoreCategoryRadioGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreCategoryRadioGroup'
import { SIGN_OUT_PAGE_PATH } from '@/auth'

/**
 * 매장 등록 State.
 *
 * @property storeId          매장 ID
 * @property name             매장명
 * @property imageUrl         이미지 URL
 * @property storeTel         매장 전화번호
 * @property bank             은행명
 * @property accountNumber    계좌번호
 * @property accountHolder    예금주
 * @property businessLocation 영업 소재지
 * @property category         메뉴구분
 * @property isValidated      유효성 체크 통과 여부
 * @property session          세션 정보
 */
export type StoreRegisterState = {
  storeId: TextFieldState,
  storeName: TextFieldState,
  imageUrl: string,
  storeTel: TextFieldState,
  bank: TextFieldState,
  accountNumber: TextFieldState,
  accountHolder: TextFieldState,
  businessLocation: TextFieldState,
  category: string,
  isValidated: boolean,
  session: Session,
}

const initState = (session: Session) => ({
  storeId: initBaseState(),
  storeName: initBaseState(),
  imageUrl: '',
  storeTel: initBaseState(),
  bank: initBaseState(),
  accountNumber: initBaseState(),
  accountHolder: initBaseState(),
  businessLocation: initBaseState(),
  category: 'MEALS',
  isValidated: false,
  session: session,
})

const onRegisterData = async (registerData: StoreRegisterState) => {
  if (!registerData.isValidated) {
    return
  }

  return await postStore({
    storeId: registerData.storeId.value,
    storeName: registerData.storeName.value,
    imageUrl: registerData.imageUrl,
    storeTel: registerData.storeTel.value,
    bank: registerData.bank.value,
    accountNumber: registerData.accountNumber.value,
    accountHolder: registerData.accountHolder.value,
    businessLocation: registerData.businessLocation.value,
    category: registerData.category,
  }, registerData.session)
}

const StoreRegisterModal = ({ params }: { params: { storeId: string } }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [registerData, setRegisterData] = useState<StoreRegisterState>(initState(session!))

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: onRegisterData,
    async onSuccess(response) {
      if (response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.")
        router.push(SIGN_OUT_PAGE_PATH)
        return
      }

      if (!response?.ok) {
        alert('매장 등록이 실패하였습니다.')
        return
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('매장 등록이 실패하였습니다.')
    }
  })

  const onChangeStoreId = (event: ChangeEvent<HTMLInputElement>) => {
    const storeId = event.target.value
    const errorMessage = storeIdValidated(storeId)
    setRegisterData((prev) => ({
      ...prev,
      storeId: {
        value: storeId,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeStoreName = (event: ChangeEvent<HTMLInputElement>) => {
    const storeName = event.target.value
    const errorMessage = nameValidated(storeName)
    setRegisterData((prev) => ({
      ...prev,
      storeName: {
        value: storeName,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeStoreTel = (event: ChangeEvent<HTMLInputElement>) => {
    const storeTel = event.target.value
    const errorMessage = storeTelValidated(storeTel)
    setRegisterData((prev) => ({
      ...prev,
      storeTel: {
        value: storeTel,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeBusinessLocation = (event: ChangeEvent<HTMLInputElement>) => {
    const businessLocation = event.target.value
    const errorMessage = businessLocationValidated(businessLocation)
    setRegisterData((prev) => ({
      ...prev,
      businessLocation: {
        value: businessLocation,
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
      title="매장 등록"
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <StoreTextField
            id={"storeId"}
            label={"매장ID"}
            placeHolder={"영문(소문자)+숫자만"}
            state={registerData.storeId}
            onChange={onChangeStoreId}
            required
          />
          <StoreTextField
            id={"storeName"}
            label={"매장명"}
            placeHolder={"최대 60글자"}
            state={registerData.storeName}
            onChange={onChangeStoreName}
            required
          />
          <StoreImageField
            id={"imageUrl"}
            label={"이미지"}
            registerData={registerData}
            setRegisterData={setRegisterData}
          />
          <StoreTextField
            id={"storeTel"}
            label={"매장 전화번호"}
            placeHolder={"대표번호"}
            state={registerData.storeTel}
            onChange={onChangeStoreTel}
          />
          <StoreBankAccountFieldGroup
            registerData={registerData}
            setRegisterData={setRegisterData}
            onValidated={onValidated}
          />
          <StoreTextField
            id={"businessLocation"}
            label={"영업 소재지"}
            placeHolder={"서울시 중구"}
            state={registerData.businessLocation}
            onChange={onChangeBusinessLocation}
          />
          <StoreCategoryRadioGroup registerData={registerData} setRegisterData={setRegisterData} />
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

export default StoreRegisterModal
