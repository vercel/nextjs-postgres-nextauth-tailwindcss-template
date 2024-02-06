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
  idValidated,
  telephoneValidated
} from '@/app/(AuthorizedLayout)/stores/_lib/validated'
import { Session } from 'next-auth'
import { postStore } from '@/app/(AuthorizedLayout)/stores/register/_lib/postStore'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import FileField from '@/app/(AuthorizedLayout)/_components/form/FileField'
import StoreCategoryRadioGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreCategoryRadioGroup'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { FileInputState } from '@/app/(AuthorizedLayout)/_models/state'
import { postStoreImage } from '@/app/(AuthorizedLayout)/stores/_lib/postStoreImage'
import StoreBankAccountFieldGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreBankAccountFieldGroup'
import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/props'

/**
 * 매장 등록 State.
 *
 * @property id               매장 ID
 * @property name             매장명
 * @property imagePath        이미지 URL
 * @property telephone        매장 전화번호
 * @property bankName         은행명
 * @property accountNumber    계좌번호
 * @property accountHolder    예금주
 * @property businessLocation 영업 소재지
 * @property menuCategoryCode 메뉴구분
 * @property isValidated      유효성 체크 통과 여부
 * @property session          세션 정보
 */
export type StoreRegisterState = {
  id: TextFieldState,
  name: TextFieldState,
  imagePath: FileInputState,
  telephone: TextFieldState,
  bankName: TextFieldState,
  accountNumber: TextFieldState,
  accountHolder: TextFieldState,
  businessLocation: TextFieldState,
  menuCategoryCode: MenuCategory,
  isValidated: boolean,
  session: Session,
}

const initState = (session: Session | null) => ({
  id: initBaseState(),
  name: initBaseState(),
  imagePath: {
    name: '',
    file: null
  },
  telephone: initBaseState(),
  bankName: initBaseState(),
  accountNumber: initBaseState(),
  accountHolder: initBaseState(),
  businessLocation: initBaseState(),
  menuCategoryCode: 'MEALS' as MenuCategory,
  isValidated: false,
  session: session,
} as StoreRegisterState)

const onRegisterData = async (registerData: StoreRegisterState) => {
  if (!registerData.isValidated) {
    return
  }

  if (registerData.imagePath.file) {
    const result = await postStoreImage(registerData.imagePath.file, registerData.session)
    registerData.imagePath.name = result.data
  }

  return await postStore({
    id: registerData.id.value,
    name: registerData.name.value,
    imagePath: registerData.imagePath.name,
    telephone: registerData.telephone.value,
    bankName: registerData.bankName.value,
    accountNumber: registerData.accountNumber.value,
    accountHolder: registerData.accountHolder.value,
    businessLocation: registerData.businessLocation.value,
    menuCategoryCode: registerData.menuCategoryCode,
  }, registerData.session)
}

const StoreRegisterModal = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [registerData, setRegisterData] = useState<StoreRegisterState>(initState(session))

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

  const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    const storeId = event.target.value
    const errorMessage = idValidated(storeId)
    setRegisterData((prev) => ({
      ...prev,
      id: {
        value: storeId,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const storeName = event.target.value
    const errorMessage = nameValidated(storeName)
    setRegisterData((prev) => ({
      ...prev,
      name: {
        value: storeName,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated()
  }

  const onChangeTelephone = (event: ChangeEvent<HTMLInputElement>) => {
    const storeTel = event.target.value
    const errorMessage = telephoneValidated(storeTel)
    setRegisterData((prev) => ({
      ...prev,
      telephone: {
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
          <TextField
            id={"id"}
            label={"매장ID"}
            placeHolder={"영문(소문자)+숫자만"}
            state={registerData.id}
            onChange={onChangeId}
            required
          />
          <TextField
            id={"name"}
            label={"매장명"}
            placeHolder={"최대 60글자"}
            state={registerData.name}
            onChange={onChangeName}
            required
          />
          <FileField
            id={"imagePath"}
            label={"이미지"}
            data={registerData.imagePath}
            setData={(imageUrl) => {
              setRegisterData((prev) => ({ ...prev, imagePath: imageUrl }))
            }}
          />
          <TextField
            id={"telephone"}
            label={"매장 전화번호"}
            placeHolder={"대표번호"}
            state={registerData.telephone}
            onChange={onChangeTelephone}
          />
          <StoreBankAccountFieldGroup
            data={{
              bankName: registerData.bankName,
              accountNumber: registerData.accountNumber,
              accountHolder: registerData.accountHolder,
            }}
            setData={{
              bankName: (bankNameState) => {
                setRegisterData((prev) => ({ ...prev, bankName: bankNameState }))
              },
              accountNumber: (accountNumberState) => {
                setRegisterData((prev) => ({ ...prev, accountNumber: accountNumberState }))
              },
              accountHolder: (accountHolderState) => {
                setRegisterData((prev) => ({ ...prev, accountHolder: accountHolderState }))
              },
            }}
            onValidated={onValidated}
          />
          <TextField
            id={"businessLocation"}
            label={"영업 소재지"}
            placeHolder={"서울시 중구"}
            state={registerData.businessLocation}
            onChange={onChangeBusinessLocation}
          />
          <StoreCategoryRadioGroup
            data={registerData.menuCategoryCode}
            setData={(menuCategoryCode: MenuCategory) => {
              setRegisterData((prev) => ({ ...prev, menuCategoryCode: menuCategoryCode }))
            }}
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

export default StoreRegisterModal
