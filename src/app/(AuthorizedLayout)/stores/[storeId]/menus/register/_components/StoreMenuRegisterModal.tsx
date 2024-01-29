'use client'

import React, { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeMenuRegister.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { BasicButton } from '@/app/_components/BasicButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { Session } from 'next-auth'
import StoreTextField from '@/app/(AuthorizedLayout)/stores/_components/StoreTextField'
import StoreImageField from '@/app/(AuthorizedLayout)/stores/_components/StoreImageField'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { FileInputState, FormState } from '@/app/(AuthorizedLayout)/_models/state'
import { postStoreImage } from '@/app/(AuthorizedLayout)/stores/_lib/postStoreImage'
import { postStoreMenu } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/postStoreMenu'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import {
  invalidateStoreMenusQueries
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/invalidateQueries'
import StoreMenuNameFieldGroup
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_components/StoreMenuNameFieldGroup'
import { priceValidated } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/validated'
import StoreTextareaGroup from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_components/StoreTextareaGroup'
import StoreTextEditorGroup
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_components/StoreTextEditorGroup'

/**
 * 매장 등록 State.
 *
 * @property menuName        메뉴명
 * @property menuEnglishName 영문 메뉴명
 * @property price           가격
 * @property imageUrl        이미지 URL
 * @property allergies       원산지 및 알러지 정보
 * @property description     상품설명
 */
export type StoreMenuRegisterState = {
  storeId: string,
  menuName: TextFieldState,
  menuEnglishName: TextFieldState,
  price: TextFieldState,
  imageUrl: FileInputState,
  allergies: string,
  description: string,
} & FormState

const initState = (storeId: string, session: Session | null) => ({
  storeId: storeId,
  menuName: initBaseState(),
  menuEnglishName: initBaseState(),
  price: initBaseState(),
  imageUrl: {
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

  if (registerData.imageUrl.file) {
    const result = await postStoreImage(registerData.imageUrl.file, registerData.session)
    registerData.imageUrl.name = result.data
  }

  return await postStoreMenu(registerData.storeId, {
    menuName: registerData.menuName.value,
    menuEnglishName: registerData.menuEnglishName.value,
    price: registerData.price.value === '' ? 0 : Number(registerData.price.value),
    imageUrl: registerData.imageUrl.name,
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
              menuName: registerData.menuName,
              menuEnglishName: registerData.menuEnglishName,
            }}
            setData={{
              menuName: (menuNameState) => {
                setRegisterData((prev) => ({ ...prev, menuName: menuNameState }))
              },
              menuEnglishName: (menuEnglishNameState) => {
                setRegisterData((prev) => ({ ...prev, menuEnglishName: menuEnglishNameState }))
              },
            }}
            onValidated={onValidated}
          />
          <StoreTextField
            id={"price"}
            label={"가격"}
            type={"number"}
            state={registerData.price}
            onChange={onChangePrice}
          />
          <StoreImageField
            id={"imageUrl"}
            label={"이미지"}
            data={registerData.imageUrl}
            setData={(imageUrl) => {
              setRegisterData((prev) => ({ ...prev, imageUrl: imageUrl }))
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

export default StoreMenuRegisterModal
