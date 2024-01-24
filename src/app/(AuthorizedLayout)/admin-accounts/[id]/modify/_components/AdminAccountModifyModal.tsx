'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import styles from './adminAccountModify.module.css'
import BaseTextField, { initBaseState, TextFieldState } from '@/app/_components/BaseTextField'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/_models/AdminAccount'
import { getAdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/[id]/modify/_lib/getAdminAccount'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { isValidated } from '@/app/(AuthorizedLayout)/_lib/validate'
import { nameValidated } from '@/app/(AuthorizedLayout)/admin-accounts/_lib/validated'
import { putAdminAccount } from '@/app/(AuthorizedLayout)/admin-accounts/[id]/modify/_lib/putAdminAccount'
import { invalidateAdminAccountsQueries } from '@/app/(AuthorizedLayout)/admin-accounts/_lib/invalidateQueries'
import BaseModal from '@/app/_components/BaseModal'
import { BasicButton } from '@/app/_components/BasicButton'
import { SIGN_OUT_PAGE_PATH } from '@/auth'

type Props = {
  id: string;
}

type AdminAccountModifyState = {
  id: string;
  name: TextFieldState;
  phoneNumber: TextFieldState;
  isValidated: boolean;
}

const AdminAccountModifyModal = ({ id }: Props) => {
  const router = useRouter()
  const { data: session } = useSession();
  const {data: adminAccount, isError, error} = useQuery<
    AdminAccount, Error, AdminAccount, [_1: string, _2: string]
  >({
    queryKey: ['admin-accounts', id],
    queryFn: getAdminAccount,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  useEffect(() => {
    if (isError) {
      if (error.message === 'NO_AUTHORIZED') {
        router.replace(SIGN_OUT_PAGE_PATH)
      }
    }
  }, [isError, error, router])

  const [modifyData, setModifyData] = useState<AdminAccountModifyState>({
    id: id,
    name: initBaseState(adminAccount?.name),
    phoneNumber: initBaseState(adminAccount?.phoneNumber),
    isValidated: false
  });

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (modifyData: AdminAccountModifyState) => {
      if (!modifyData.isValidated) {
        return;
      }

      return await putAdminAccount(id, {
        name: modifyData.name.value,
        phoneNumber: modifyData.phoneNumber.value
      }, session)
    },
    async onSuccess(response) {
      if (!response?.ok) {
        alert('관리자 계정 정보 변경이 실패하였습니다.');
        return;
      }

      await invalidateAdminAccountsQueries(queryClient)
      router.back();
    },
    onError(error) {
      console.dir(error);
      alert('관리자 계정 정보 변경이 실패하였습니다.');
    }
  })

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    const errorMessage = nameValidated(name);
    setModifyData((prev) => ({
      ...prev,
      name: {
        value: name,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      },
    }))
    onValidated();
  }

  const onChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value
    const errorMessage = nameValidated(phoneNumber)
    setModifyData((prev) => ({
      ...prev,
      phoneNumber: {
        value: phoneNumber,
        isError: errorMessage !== '',
        errorMessage: errorMessage
      }
    }))
    onValidated();
  }

  const onValidated = () => {
    setModifyData((prev) => ({
      ...prev,
      isValidated: isValidated(modifyData)
    }))
  }
  return (
      <BaseModal
        title="관리자 정보 수정"
        subtitle={id}
        className={styles.container}
        handleClose={() => {
          router.back()
        }}
      >
        <>
          <Stack spacing={3}>
            <BaseTextField
              id="name"
              label="이름"
              state={modifyData.name}
              onChange={onChangeName}
            />
            <BaseTextField
              id="phoneNumber"
              label="연락처"
              type="tel"
              state={modifyData.phoneNumber}
              onChange={onChangePhoneNumber}
            />
            <BasicButton
              label={'등록하기'}
              onClick={() => mutation.mutate(modifyData)}
              disabled={!modifyData.isValidated}
              sx={{
                height: '56px',
                borderRadius: '12px',
              }}
            />
          </Stack>
        </>
      </BaseModal>
  )
}

export default AdminAccountModifyModal
