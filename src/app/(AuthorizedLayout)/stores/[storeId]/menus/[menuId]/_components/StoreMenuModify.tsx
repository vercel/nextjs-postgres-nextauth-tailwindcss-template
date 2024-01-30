import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StoreMenu } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_models/storeMenu'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { FileInputState, FormState } from '@/app/(AuthorizedLayout)/_models/state'
import {
  StoreMenuModifyFormStateInitProps
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_models/props'
import { postStoreMenuImage } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_lib/postStoreMenuImage'
import { putStoreMenu } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_lib/putStoreMenu'
import { Session } from 'next-auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import {
  invalidateStoreMenusQueries
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/invalidateQueries'
import { priceValidated } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/validated'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import BaseModal from '@/app/_components/BaseModal'
import styles from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/[menuId]/_components/storeMenuModify.module.css'
import { Stack } from '@mui/material'
import LabelField from '@/app/(AuthorizedLayout)/_components/form/LabelField'
import { format } from 'date-fns/format'
import StoreMenuNameFieldGroup
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreMenuNameFieldGroup'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import StoreImageField from '@/app/(AuthorizedLayout)/stores/_components/StoreImageField'
import StoreTextareaGroup from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreTextareaGroup'
import StoreTextEditorGroup from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/_components/StoreTextEditorGroup'
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'

/**
 * 메뉴 수정 State.
 *
 * @property menuName        메뉴명
 * @property menuEnglishName 영문 메뉴명
 * @property price           가격
 * @property imageUrl        이미지 URL
 * @property allergies       원산지 및 알러지 정보
 * @property description     상품설명
 */
export type StoreMenuModifyState = {
  menuId: number,
  storeId: string,
  menuName: TextFieldState,
  menuEnglishName: TextFieldState,
  price: TextFieldState,
  imageUrl: FileInputState,
  allergies: string,
  description: string,
} & FormState

const initState = ({
  menuId,
  storeId,
  session,
  storeMenu
}: StoreMenuModifyFormStateInitProps) => ({
  menuId: menuId,
  storeId: storeId,
  menuName: initBaseState(storeMenu.name),
  menuEnglishName: initBaseState(storeMenu.englishName),
  price: initBaseState(storeMenu.price.toString()),
  imageUrl: {
    name: storeMenu.imageUrl,
    file: null
  },
  allergies: storeMenu.allergies,
  description: storeMenu.description,
  isValidated: true,
  session: session,
} as StoreMenuModifyState)

const onModifyData = async (modifyData: StoreMenuModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  if (modifyData.imageUrl.file) {
    const result = await postStoreMenuImage({
      storeId: modifyData.storeId,
      file: modifyData.imageUrl.file,
      session: modifyData.session })
    modifyData.imageUrl.name = result.data
  }

  return await putStoreMenu(modifyData.menuId, modifyData.storeId, {
    name: modifyData.menuName.value,
    englishName: modifyData.menuEnglishName.value,
    price: modifyData.price.value === '' ? 0 : Number(modifyData.price.value),
    imageUrl: modifyData.imageUrl.name,
    allergies: modifyData.allergies,
    description: modifyData.description,
  }, modifyData.session)
}

const StoreMenuModify = ({ storeMenu, session }: { storeMenu: StoreMenu, session: Session }) => {
  const router = useRouter()
  const [modifyData, setModifyData] = useState<StoreMenuModifyState>(
    initState({
      menuId : storeMenu.id,
      storeId : storeMenu.storeId,
      session,
      storeMenu
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
        alert('메뉴 수정이 실패하였습니다.')
        return
      }

      await invalidateStoreMenusQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('메뉴 수정이 실패하였습니다.')
    }
  })


  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value
    const errorMessage = priceValidated(price)
    setModifyData((prev) => ({
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
    setModifyData((prev) => ({
      ...prev,
      isValidated: isValidated(modifyData)
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
          <LabelField label={'날짜'} data={format(storeMenu.createdDate!, 'yyyy. MM. dd')} />
          <StoreMenuNameFieldGroup
            data={{
              menuName: modifyData.menuName,
              menuEnglishName: modifyData.menuEnglishName,
            }}
            setData={{
              menuName: (menuNameState) => {
                setModifyData((prev) => ({ ...prev, menuName: menuNameState }))
              },
              menuEnglishName: (menuEnglishNameState) => {
                setModifyData((prev) => ({ ...prev, menuEnglishName: menuEnglishNameState }))
              },
            }}
            onValidated={onValidated}
          />
          <TextField
            id={"price"}
            label={"가격"}
            type={"number"}
            state={modifyData.price}
            onChange={onChangePrice}
          />
          <StoreImageField
            id={"imageUrl"}
            label={"이미지"}
            data={modifyData.imageUrl}
            setData={(imageUrl) => {
              setModifyData((prev) => ({ ...prev, imageUrl: imageUrl }))
            }}
          />
          <StoreTextareaGroup
            label={<>원산지 및<br />알러지정보</>}
            placeholder={"원산지 및 알러지(선택사항)"}
            data={modifyData.allergies}
            setData={(allergies) => {
              setModifyData((prev) => ({
                ...prev,
                allergies: allergies
              } as StoreMenuModifyState))
            }}
          />
          <StoreTextEditorGroup
            storeId={storeMenu.storeId}
            label={'상품설명'}
            placeholder={"상품설명(선택사항)"}
            data={modifyData.description}
            setData={(description) => {
              setModifyData((prev) => ({
                ...prev,
                description: description
              } as StoreMenuModifyState))
            }}
          />
          <ConfirmButton
            isValidated={modifyData.isValidated}
            handelCancel={() => router.back()}
            confirmLabel={'수정'}
            handleConfirm={() => {
              onValidated()
              mutation.mutate(modifyData)
            }} />
        </Stack>
      </>
    </BaseModal>
  )
}

export default StoreMenuModify
