'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeMenuRegister.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { Session } from 'next-auth'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import FileField from '@/app/(AuthorizedLayout)/_components/form/FileField'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { FileInputState, FormState } from '@/app/(AuthorizedLayout)/_models/state'
import { postStoreMenu } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/postStoreMenu'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import {
  invalidateStoreMenusQueries
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/invalidateQueries'
import StoreMenuNameFieldGroup
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreMenuNameFieldGroup'
import { priceValidated } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/validated'
import StoreTextareaGroup from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreTextareaGroup'
import StoreTextEditorGroup from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreTextEditorGroup'
import { postStoreMenuImage } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_lib/postStoreMenuImage'
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'

/**
 * 메뉴 등록 State.
 *
 * @property menuName        메뉴명
 * @property menuEnglishName 영문 메뉴명
 * @property price           가격
 * @property imagePath       이미지 경로
 * @property allergies       원산지 및 알러지 정보
 * @property description     상품설명
 */
export type StoreMenuRegisterState = {
  storeId: string,
  menuName: TextFieldState,
  menuEnglishName: TextFieldState,
  price: TextFieldState,
  imagePath: FileInputState,
  allergies: string,
  description: string,
} & FormState

const initState = (storeId: string, session: Session | null) => ({
  storeId: storeId,
  menuName: initBaseState(),
  menuEnglishName: initBaseState(),
  price: initBaseState(),
  imagePath: {
    name: '',
    file: null
  },
  allergies: '',
  description: '',
  isValidated: false,
  session: session,
} as StoreMenuRegisterState)

const onRegisterData = async (registerData: StoreMenuRegisterState) => {
  if (!registerData.isValidated) {
    return
  }

  if (registerData.imagePath.file) {
    const result = await postStoreMenuImage({
      storeId: registerData.storeId,
      file: registerData.imagePath.file,
      session: registerData.session })
    registerData.imagePath.name = result.data
  }

  return await postStoreMenu(registerData.storeId, {
    name: registerData.menuName.value,
    englishName: registerData.menuEnglishName.value,
    price: registerData.price.value === '' ? 0 : Number(registerData.price.value),
    imagePath: registerData.imagePath.name,
    allergies: registerData.allergies,
    description: registerData.description,
  }, registerData.session)
}

const StoreMenuRegisterModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [registerData, setRegisterData] = useState<StoreMenuRegisterState>(initState(storeId, session))

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
        alert('매장 메뉴 등록이 실패하였습니다.')
        return
      }

      await invalidateStoreMenusQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('매장 메뉴 등록이 실패하였습니다.')
    }
  })

  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value
    const errorMessage = priceValidated(price)
    setRegisterData((prev) => ({
      ...prev,
      price: {
        value: price,
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
      title="메뉴 등록"
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <StoreMenuNameFieldGroup
            data={{
              name: registerData.menuName,
              englishName: registerData.menuEnglishName,
            }}
            setData={{
              bane: (menuNameState) => {
                setRegisterData((prev) => ({ ...prev, menuName: menuNameState }))
              },
              englishName: (menuEnglishNameState) => {
                setRegisterData((prev) => ({ ...prev, menuEnglishName: menuEnglishNameState }))
              },
            }}
            onValidated={onValidated}
          />
          <TextField
            id={"price"}
            label={"가격"}
            type={"number"}
            state={registerData.price}
            onChange={onChangePrice}
          />
          <FileField
            id={"imagePath"}
            label={"이미지"}
            data={registerData.imagePath}
            setData={(imagePath) => {
              setRegisterData((prev) => ({ ...prev, imagePath: imagePath }))
            }}
          />
          <StoreTextareaGroup
            label={<>원산지 및<br />알러지정보</>}
            placeholder={"원산지 및 알러지(선택사항)"}
            data={registerData.allergies}
            setData={(allergies) => {
              setRegisterData((prev) => ({
                ...prev,
                allergies: allergies
              } as StoreMenuRegisterState))
            }}
          />
          <StoreTextEditorGroup
            storeId={storeId}
            label={'상품설명'}
            placeholder={"상품설명(선택사항)"}
            data={registerData.description}
            setData={(description) => {
              setRegisterData((prev) => ({
                ...prev,
                description: description
              } as StoreMenuRegisterState))
            }}
          />
          <ConfirmButton
            isValidated={registerData.isValidated}
            handelCancel={() => router.back()}
            handleConfirm={() => {
              onValidated()
              mutation.mutate(registerData)
            }}
          />
        </Stack>
      </>
    </BaseModal>
  )
}

export default StoreMenuRegisterModal
