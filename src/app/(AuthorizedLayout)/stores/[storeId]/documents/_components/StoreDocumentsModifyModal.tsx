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
import ConfirmButton from '@/app/(AuthorizedLayout)/_components/form/ConfirmButton'
import useStoreDetail from '@/app/(AuthorizedLayout)/stores/[storeId]/_hooks/useStoreDetail'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { StoreModifyFormState } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeModifyFormState'
import { StoreModifyFormStateInitProps, StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import StoreImageField from '@/app/(AuthorizedLayout)/stores/_components/StoreImageField'
import { putStoreDocuments } from '@/app/(AuthorizedLayout)/stores/[storeId]/documents/_lib/putStoreDocuments'
import StoreDateField from '../../../_components/StoreDateField'
import { formatDate } from '@/app/(AuthorizedLayout)/_lib/date'
import { FileInputState } from '@/app/(AuthorizedLayout)/_models/state'
import { postStoreDocumentFile } from '@/app/(AuthorizedLayout)/stores/[storeId]/_lib/postStoreDocumentFile'

/**
 * 매장 필수서류 정보 변경 State.
 *
 *  @property healthCertPath          보건증 URL
 *  @property healthCertRegisterDate 보건증 등록일
 *  @property carRegistrationCertPath 자동차 등록증 URL
 *  @property businessReportCertPath  영업신고증 URL
 */
type StoreDocumentsModifyState = {
  healthCertPath: FileInputState,
  healthCertRegisterDate: string,
  carRegistrationCertPath: FileInputState,
  businessReportCertPath: FileInputState,
} & StoreModifyFormState

const initState = ({
   id,
   session,
   storeDetail
}: StoreModifyFormStateInitProps) => ({
  id: id,
  healthCertPath: {
    name: storeDetail?.healthCertPath ?? '',
    file: null
  },
  healthCertRegisterDate: formatDate(storeDetail?.healthCertRegisterDate) ?? '',
  carRegistrationCertPath: {
  name: storeDetail?.carRegistrationCertPath ?? '',
    file: null
  },
  businessReportCertPath: {
    name: storeDetail?.businessReportCertPath ?? '',
    file: null
  },
  isValidated: true,
  session: session,
} as StoreDocumentsModifyState)

const onModifyData = async (modifyData: StoreDocumentsModifyState) => {
  if (!modifyData.isValidated) {
    return
  }

  if (modifyData.healthCertPath.file) {
    const result = await postStoreDocumentFile({
      storeId: modifyData.id,
      storeDocumentType: 'HEALTH_CERT',
      file: modifyData.healthCertPath.file,
      session: modifyData.session
    })
    modifyData.healthCertPath.name = result.data
  }

  if (modifyData.carRegistrationCertPath.file) {
    const result = await postStoreDocumentFile({
      storeId: modifyData.id,
      storeDocumentType: 'CAR_REGISTRATION_CERT',
      file: modifyData.carRegistrationCertPath.file,
      session: modifyData.session
    })
    modifyData.carRegistrationCertPath.name = result.data
  }

  if (modifyData.businessReportCertPath.file) {
    const result = await postStoreDocumentFile({
      storeId: modifyData.id,
      storeDocumentType: 'BUSINESS_REPORT_CERT',
      file: modifyData.businessReportCertPath.file,
      session: modifyData.session
    })
    modifyData.businessReportCertPath.name = result.data
  }

  return await putStoreDocuments(modifyData.id, {
    healthCertPath: modifyData.healthCertPath.name,
    healthCertRegisterDate: modifyData.healthCertRegisterDate,
    carRegistrationCertPath: modifyData.carRegistrationCertPath.name,
    businessReportCertPath: modifyData.businessReportCertPath.name,
  }, modifyData.session)
}

const StoreDocumentsModifyModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { storeDetail, session, isLoading } = useStoreDetail(storeId)
  const [modifyData, setModifyData] = useState<StoreDocumentsModifyState>(
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
            id={"healthCertPath"}
            label={"보건증"}
            data={modifyData.healthCertPath}
            setData={(healthCertPath) => {
              setModifyData((prev) => ({ ...prev, healthCertPath: healthCertPath }))
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
            id={"carRegistrationCertPath"}
            label={"자동차 등록증"}
            data={modifyData.carRegistrationCertPath}
            setData={(carRegistrationCertPath) => {
              setModifyData((prev) => ({ ...prev, carRegistrationCertPath: carRegistrationCertPath }))
            }}
          />
          <StoreImageField
            id={"businessReportCertPath"}
            label={"영업 신고증"}
            data={modifyData.businessReportCertPath}
            setData={(businessReportCertPath) => {
              setModifyData((prev) => ({ ...prev, businessReportCertPath: businessReportCertPath }))
            }}
          />
          <ConfirmButton
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
