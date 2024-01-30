'use client'

import { ChangeEvent, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeModify.module.css'
import { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import {
  businessLocationValidated,
  nameValidated,
  storeTelValidated
} from '@/app/(AuthorizedLayout)/stores/_lib/validated'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import StoreImageField from '@/app/(AuthorizedLayout)/stores/_components/StoreImageField'
import StoreBankAccountFieldGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreBankAccountFieldGroup'
import StoreCategoryRadioGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreCategoryRadioGroup'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { putStore } from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_lib/putStore'
import StoreConfirmButton from '@/app/(AuthorizedLayout)/stores/_components/StoreConfirmButton'
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/_hooks/useStoreDetail'
import { StoreModifyFormState } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeModifyFormState'
import { StoreModifyFormStateInitProps, StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { FileInputState } from '@/app/(AuthorizedLayout)/_models/state'
import { postStoreImage } from '@/app/(AuthorizedLayout)/stores/_lib/postStoreImage'

/**
 * 매장 정보 변경 State.
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
 */
type StoreModifyState = {
  storeName: TextFieldState,
  imageUrl: FileInputState,
  storeTel: TextFieldState,
  bank: TextFieldState,
  accountNumber: TextFieldState,
  accountHolder: TextFieldState,
  businessLocation: TextFieldState,
  category: string,
} & StoreModifyFormState

const initState = ({
   storeId,
   session,
   storeDetail
}: StoreModifyFormStateInitProps) => ({
  storeId: storeId,
  storeName: initBaseState(storeDetail?.storeName ?? ''),
  imageUrl: {
    name: storeDetail?.imageUrl ?? '',
    file: null
  },
  storeTel: initBaseState(storeDetail?.storeTel ?? ''),
  bank: initBaseState(storeDetail?.bank ?? ''),
  accountNumber: initBaseState(storeDetail?.accountNumber ?? ''),
  accountHolder: initBaseState(storeDetail?.accountHolder ?? ''),
  businessLocation: initBaseState(storeDetail?.businessLocation ?? ''),
  category: storeDetail?.category ?? 'MEALS',
  isValidated: true,
  session: session,
})

const onModifyData = async (modifyData: StoreModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  if (modifyData.imageUrl.file) {
    const result = await postStoreImage(modifyData.imageUrl.file, modifyData.session)
    modifyData.imageUrl.name = result.data
  }

  return await putStore(modifyData.storeId, {
    storeName: modifyData.storeName.value,
    storeImageUrl: modifyData.imageUrl.name,
    storeTel: modifyData.storeTel.value,
    bank: modifyData.bank.value,
    accountNumber: modifyData.accountNumber.value,
    accountHolder: modifyData.accountHolder.value,
    businessLocation: modifyData.businessLocation.value,
    category: modifyData.category,
  }, modifyData.session)
}

const StoreModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)
  const [modifyData, setModifyData] = useState<StoreModifyState>(
    initState({
      storeId,
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
        alert('매장 정보 변경이 실패하였습니다.')
        return
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('매장 정보 변경이 실패하였습니다.')
    }
  })

  const onChangeStoreName = (event: ChangeEvent<HTMLInputElement>) => {
    const storeName = event.target.value
    const errorMessage = nameValidated(storeName)
    setModifyData((prev) => ({
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
    setModifyData((prev) => ({
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
    setModifyData((prev) => ({
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
      title="매장 정보 변경"
      subtitle={storeId}
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <TextField
            id={"storeName"}
            label={"매장명"}
            placeHolder={"최대 60글자"}
            state={modifyData.storeName}
            onChange={onChangeStoreName}
            required
          />
          <StoreImageField
            id={"imageUrl"}
            label={"이미지"}
            data={modifyData.imageUrl}
            setData={(imageUrl) => {
              setModifyData((prev) => ({ ...prev, imageUrl: imageUrl }))
            }}
          />
          <TextField
            id={"storeTel"}
            label={"매장 전화번호"}
            placeHolder={"대표번호"}
            state={modifyData.storeTel}
            onChange={onChangeStoreTel}
          />
          <StoreBankAccountFieldGroup
            data={{
              bank: modifyData.bank,
              accountNumber: modifyData.accountNumber,
              accountHolder: modifyData.accountHolder,
            }}
            setData={{
              bank: (bankState) => {
                setModifyData((prev) => ({ ...prev, bank: bankState }))
              },
              accountNumber: (accountNumberState) => {
                setModifyData((prev) => ({ ...prev, accountNumber: accountNumberState }))
              },
              accountHolder: (accountHolderState) => {
                setModifyData((prev) => ({ ...prev, accountHolder: accountHolderState }))
              },
            }}
            onValidated={onValidated}
          />
          <TextField
            id={"businessLocation"}
            label={"영업 소재지"}
            placeHolder={"서울시 중구"}
            state={modifyData.businessLocation}
            onChange={onChangeBusinessLocation}
          />
          <StoreCategoryRadioGroup
            data={modifyData.category}
            setData={(category) => {
              setModifyData((prev) => ({ ...prev, category: category }))
            }}
          />
          <StoreConfirmButton
            isValidated={modifyData.isValidated}
            handelCancel={() => router.back()}
            handleConfirm={() => mutation.mutate(modifyData)} />
        </Stack>
      </>
    </BaseModal>
  )
}

export default StoreModifyModal
