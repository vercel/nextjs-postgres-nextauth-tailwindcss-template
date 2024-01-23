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
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/hook/useStoreDetail'

type Props = {
  storeId: string
}

const StoreDetailView = ({ storeId }: Props) => {
  const router = useRouter()
  const storeDetail = useStoreDetail(storeId)
  if (storeDetail == null) {
    return 'Loading....'
  }

  return (
    <>
      <BaseCard
        title="매장 상세 정보"
        action={
          <BasicButton
            label={'삭제'}
            disabled={false}
            onClick={() => {
              router.push(`/stores/register`)
            }}
          />
        }
      >
        <Container className={styles.container}>
          <StoreInfoContainer
            storeDetail={storeDetail}
            handlerEdit={() => router.push(`/stores/${storeId}/modify`)}
          />
          <StoreManagerContainer storeDetail={storeDetail} handlerEdit={() => {}} />
          <StoreBusinessContainer storeDetail={storeDetail} handlerEdit={() => {}} />
          <StoreManagerContainer storeDetail={storeDetail} handlerEdit={() => {}} />
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
