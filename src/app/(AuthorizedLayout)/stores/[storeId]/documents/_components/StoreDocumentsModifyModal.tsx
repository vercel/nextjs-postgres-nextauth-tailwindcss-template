'use client'

import React, { useState } from 'react'
import { Stack } from '@mui/material'
import styles from './storeDocumentsModify.module.css'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import StoreConfirmButton from '@/app/(AuthorizedLayout)/stores/_components/StoreConfirmButton'
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/_hooks/useStoreDetail'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { StoreModifyFormState } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeModifyFormState'
import { StoreModifyFormStateInitProps, StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import StoreImageField from '@/app/(AuthorizedLayout)/stores/_components/StoreImageField'
import { putStoreDocuments } from '@/app/(AuthorizedLayout)/stores/[storeId]/documents/_lib/putStoreDocuments'
import StoreDateField from '../../../_components/StoreDateField'
import { formatDate } from '@/app/(AuthorizedLayout)/_lib/date'

/**
 * 매장 필수서류 정보 변경 State.
 *
 *  @property healthCertUrl          보건증 URL
 *  @property healthCertRegisterDate 보건증 등록일
 *  @property carRegistrationCertUrl 자동차 등록증 URL
 *  @property businessReportCertUrl  영업신고증 URL
 */
type StoreDocumentsModifyState = {
  healthCertUrl: string,
  healthCertRegisterDate: string,
  carRegistrationCertUrl: string,
  businessReportCertUrl: string,
} & StoreModifyFormState

const initState = ({
   storeId,
   session,
   storeDetail
}: StoreModifyFormStateInitProps) => ({
  storeId: storeId,
  healthCertUrl: storeDetail?.healthCertUrl ?? '',
  healthCertRegisterDate: formatDate(storeDetail?.healthCertRegisterDate) ?? '',
  carRegistrationCertUrl: storeDetail?.carRegistrationCertUrl ?? '',
  businessReportCertUrl: storeDetail?.businessReportCertUrl ?? '',
  isValidated: true,
  session: session,
})

const onModifyData = async (modifyData: StoreDocumentsModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  return await putStoreDocuments(modifyData.storeId, {
    healthCertUrl: modifyData.healthCertUrl,
    healthCertRegisterDate: modifyData.healthCertRegisterDate,
    carRegistrationCertUrl: modifyData.carRegistrationCertUrl,
    businessReportCertUrl: modifyData.businessReportCertUrl,
  }, modifyData.session)
}

const StoreDocumentsModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)
  const [modifyData, setModifyData] = useState<StoreDocumentsModifyState>(
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
        alert('필수서류 등록이 실패하였습니다.')
        return
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('필수서류 등록이 실패하였습니다.')
    }
  })

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
      title="필수서류"
      subtitle={storeId}
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <Stack spacing={1}>
          <StoreImageField
            id={"healthCertUrl"}
            label={"보건증"}
            data={modifyData.healthCertUrl}
            setData={(healthCertUrl) => {
              setModifyData((prev) => ({ ...prev, healthCertUrl: healthCertUrl }))
            }}
          />
          <StoreDateField
            label={"보건증 등록일"}
            data={modifyData.healthCertRegisterDate}
            setData={(healthCertRegisterDate) => {
              setModifyData((prev) => ({ ...prev, healthCertRegisterDate: healthCertRegisterDate }))
            }}
          />
          <StoreImageField
            id={"carRegistrationCertUrl"}
            label={"자동차 등록증"}
            data={modifyData.carRegistrationCertUrl}
            setData={(carRegistrationCertUrl) => {
              setModifyData((prev) => ({ ...prev, carRegistrationCertUrl: carRegistrationCertUrl }))
            }}
          />
          <StoreImageField
            id={"businessReportCertUrl"}
            label={"영업 신고증"}
            data={modifyData.businessReportCertUrl}
            setData={(businessReportCertUrl) => {
              setModifyData((prev) => ({ ...prev, businessReportCertUrl: businessReportCertUrl }))
            }}
          />
          <StoreConfirmButton
            isValidated={modifyData.isValidated}
            handelCancel={() => router.back()}
            handleConfirm={() => {
              onValidated()
              mutation.mutate(modifyData)
            }} />
        </Stack>
      </>
    </BaseModal>
  )
}

export default StoreDocumentsModifyModal
