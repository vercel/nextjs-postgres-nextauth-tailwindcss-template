'use client'

import BaseCard from '@/app/_components/BaseCard'
import { BasicButton } from '@/app/_components/BasicButton'
import { useRouter } from 'next/navigation'
import { Container } from '@mui/material'
import styles from './storeDetail.module.css'
import StoreInfoContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreInfoContainer'
import StoreManagerContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreManagerContainer'
import StoreBusinessContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreBusinessContainer'
import StoreMenuContainer from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/StoreMenuContainer'
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/_hooks/useStoreDetail'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import StoreDocumentsContainer from './StoreDocumentContainer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import { deleteStore } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/deleteStore'
import { StoreModifyFormState } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeModifyFormState'

type StoreDeleteData = {
} & StoreModifyFormState

const StoreDetailView = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (deleteData: StoreDeleteData) => await deleteStore(
      deleteData.storeId,
      deleteData.session
    ),
    async onSuccess(response) {
      if (response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.")
        router.push(SIGN_OUT_PAGE_PATH)
        return null
      }

      if (!response?.ok) {
        alert('매장 정보 변경이 실패하였습니다.')
        return null
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('매장 정보 변경이 실패하였습니다.')
    }
  })

  if (isLoading || storeDetail === undefined) {
    return <Loading />
  }

  return (
    <>
      <BaseCard
        title="매장 상세 정보"
        action={
          <BasicButton
            label={'삭제'}
            disabled={false}
            onClick={() => () => mutation.mutate({
              storeId: storeId,
              isValidated: true,
              session: session
            })}
          />
        }
      >
        <Container className={styles.container}>
          <StoreInfoContainer
            storeDetail={storeDetail}
            handlerEdit={() => router.push(`/stores/${storeId}/modify`)}
          />
          <StoreManagerContainer
            storeDetail={storeDetail}
            handlerEdit={() => router.push(`/stores/${storeId}/manager`)}
          />
          <StoreBusinessContainer
            storeDetail={storeDetail}
            handlerEdit={() => router.push(`/stores/${storeId}/business`)}
          />
          <StoreDocumentsContainer
            storeDetail={storeDetail}
            handlerEdit={() => router.push(`/stores/${storeId}/documents`)}
          />
          <StoreMenuContainer storeDetail={storeDetail} handleRouter={() => {}} />
          <BasicButton
            label={'비밀번호 변경'}
            disabled={false}
            onClick={() => {
              router.push(`/stores/${storeId}/password`)
            }}
          />
        </Container>
      </BaseCard>
    </>
  )
}

export default StoreDetailView
