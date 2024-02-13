'use client'

import React, { useEffect, useState } from 'react'
import styles from './menuRequestStoreView.module.css'
import { useRouter } from 'next/navigation'
import BaseModal from '@/app/_components/BaseModal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SIGN_OUT_PAGE_PATH } from '@/auth'
import { StoreProps } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/props'
import Loading from '@/app/(AuthorizedLayout)/_components/layout/Loading'
import { getMenuRequestStore } from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_lib/getMenuRequestStore'
import StoreInfoContainer from './StoreInfoContainer'
import MenuRequestListTable
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_components/MenuRequestListTable'
import {
  MenuRequestStoreDetailResponse
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_models/response'
import ApprovalButtonGroups
  from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_components/ApprovalButtonGroups'
import { invalidateStoresQueries } from '@/app/(AuthorizedLayout)/stores/_lib/invalidateQueries'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import {
  putMenuRequestsReject
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_lib/putMenuRequestsReject'
import {
  putMenuRequestsApproval
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menu-requests/_lib/putMenuRequestsApproval'

type mutationData = {
  storeId: string,
  selectedIndexes: number[],
  session: Session | null,
}

const onReject = async ({ storeId, selectedIndexes, session }: mutationData) => {
  if (selectedIndexes.length == 0) {
    return
  }

  return await putMenuRequestsReject(storeId, selectedIndexes, session)
}

const onApproval = async ({ storeId, selectedIndexes, session }: mutationData) => {
  if (selectedIndexes.length == 0) {
    return
  }

  return await putMenuRequestsApproval(storeId, selectedIndexes, session)
}

const MenuRequestStoreViewModal = ({ storeId }: StoreProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  const {
    data: menuRequestStore,
    isLoading,
    isError,
    error
  } = useQuery<Response, Error, MenuRequestStoreDetailResponse, [_1: string, storeId: string, _2: string]>({
    queryKey: ['stores', storeId, 'menu-requests'],
    queryFn: getMenuRequestStore,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  })

  const queryClient = useQueryClient()
  const rejectMutation = useMutation({
    mutationFn: onReject,
    async onSuccess(response) {
      if (response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.")
        router.push(SIGN_OUT_PAGE_PATH)
        return
      }

      if (!response?.ok) {
        alert('메뉴 미승인 처리가 실패하였습니다.')
        return
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('메뉴 미승인 처리가 실패하였습니다.')
    }
  })

  const approvalMutation = useMutation({
    mutationFn: onApproval,
    async onSuccess(response) {
      if (response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.")
        router.push(SIGN_OUT_PAGE_PATH)
        return
      }

      if (!response?.ok) {
        alert('메뉴 승인 처리가 실패하였습니다.')
        return
      }

      await invalidateStoresQueries(queryClient)
      router.back()
    },
    onError(error) {
      console.dir(error)
      alert('메뉴 승인 처리가 실패하였습니다.')
    }
  })

  useEffect(() => {
    if (isError) {
      if (error.message === 'NO_AUTHORIZED') {
        router.replace(SIGN_OUT_PAGE_PATH)
      }
    }
  }, [isError, error, router])

  if (isLoading || menuRequestStore === undefined) {
    return <Loading />
  }

  return (
    <BaseModal
      className={styles.container}
      handleClose={() => {
        router.back()
      }}
    >
      <>
        <StoreInfoContainer
          storeId={menuRequestStore.storeId}
          storeName={menuRequestStore.storeName}
          handleClose={() => {
            router.back()
          }}
        />
        <MenuRequestListTable
          storeId={storeId}
          menuRequests={menuRequestStore.menuRequests}
          selectedIndexes={selectedIndexes}
          setSelectedIndexes={setSelectedIndexes}
        />
        <ApprovalButtonGroups
          selectedIndexes={selectedIndexes}
          handelReject={() => rejectMutation.mutate({ storeId, selectedIndexes, session })}
          handleApproval={() => approvalMutation.mutate({ storeId, selectedIndexes, session })} />
      </>
    </BaseModal>
  )
}

export default MenuRequestStoreViewModal
