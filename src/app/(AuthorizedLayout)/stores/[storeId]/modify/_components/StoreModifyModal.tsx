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
  telephoneValidated
} from '@/app/(AuthorizedLayout)/stores/_lib/validated'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import TextField from '@/app/(AuthorizedLayout)/_components/form/TextField'
import FileField from '@/app/(AuthorizedLayout)/_components/form/FileField'
import StoreBankAccountFieldGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreBankAccountFieldGroup'
import StoreCategoryRadioGroup from '@/app/(AuthorizedLayout)/stores/_components/StoreCategoryRadioGroup'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { putStore } from '@/app/(AuthorizedLayout)/stores/[storeId]/modify/_lib/putStore'
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/_hooks/useStoreDetail'
import { StoreModifyFormState } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeModifyFormState'
import { StoreModifyFormStateInitProps, StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { FileInputState } from '@/app/(AuthorizedLayout)/_models/state'
import { postStoreImage } from '@/app/(AuthorizedLayout)/stores/_lib/postStoreImage'
import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/props'

/**
 * 매장 정보 변경 State.
 *
 * @property name             매장명
 * @property imagePath        이미지 URL
 * @property telephone        매장 전화번호
 * @property bankName         은행명
 * @property accountNumber    계좌번호
 * @property accountHolder    예금주
 * @property businessLocation 영업 소재지
 * @property menuCategoryCode 메뉴구분 코드
 */
type StoreModifyState = {
  name: TextFieldState,
  imagePath: FileInputState,
  telephone: TextFieldState,
  bankName: TextFieldState,
  accountNumber: TextFieldState,
  accountHolder: TextFieldState,
  businessLocation: TextFieldState,
  menuCategoryCode: MenuCategory,
} & StoreModifyFormState

const initState = ({
   id,
   session,
   storeDetail
}: StoreModifyFormStateInitProps) => ({
  id: id,
  name: initBaseState(storeDetail?.name ?? ''),
  imagePath: {
    name: storeDetail?.imagePath ?? '',
    file: null
  },
  telephone: initBaseState(storeDetail?.telephone ?? ''),
  bankName: initBaseState(storeDetail?.bankName ?? ''),
  accountNumber: initBaseState(storeDetail?.accountNumber ?? ''),
  accountHolder: initBaseState(storeDetail?.accountHolder ?? ''),
  businessLocation: initBaseState(storeDetail?.businessLocation ?? ''),
  menuCategoryCode: storeDetail?.menuCategoryCode ?? 'MEALS',
  isValidated: true,
  session: session,
} as StoreModifyState)

const onModifyData = async (modifyData: StoreModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  if (modifyData.imagePath.file) {
    const result = await postStoreImage(modifyData.imagePath.file, modifyData.session)
    modifyData.imagePath.name = result.data
  }

  return await putStore(modifyData.id, {
    name: modifyData.name.value,
    imagePath: modifyData.imagePath.name,
    telephone: modifyData.telephone.value,
    bankName: modifyData.bankName.value,
    accountNumber: modifyData.accountNumber.value,
    accountHolder: modifyData.accountHolder.value,
    businessLocation: modifyData.businessLocation.value,
    menuCategoryCode: modifyData.menuCategoryCode,
  }, modifyData.session)
}

const StoreModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)
  const [modifyData, setModifyData] = useState<StoreModifyState>(
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

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const storeName = event.target.value
    const errorMessage = nameValidated(storeName)
    setModifyData((prev) => ({
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
    setModifyData((prev) => ({
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
            id={"name"}
            label={"매장명"}
            placeHolder={"최대 60글자"}
            state={modifyData.name}
            onChange={onChangeName}
            required
          />
          <FileField
            id={"imagePath"}
            label={"이미지"}
            data={modifyData.imagePath}
            setData={(imageUrl) => {
              setModifyData((prev) => ({ ...prev, imagePath: imageUrl }))
            }}
          />
          <TextField
            id={"telephone"}
            label={"매장 전화번호"}
            placeHolder={"대표번호"}
            state={modifyData.telephone}
            onChange={onChangeTelephone}
          />
          <StoreBankAccountFieldGroup
            data={{
              bankName: modifyData.bankName,
              accountNumber: modifyData.accountNumber,
              accountHolder: modifyData.accountHolder,
            }}
            setData={{
              bankName: (bankNameState) => {
                setModifyData((prev) => ({ ...prev, bankName: bankNameState }))
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
            data={modifyData.menuCategoryCode}
            setData={(category) => {
              setModifyData((prev) => ({ ...prev, menuCategoryCode: category }))
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

export default StoreModifyModal
