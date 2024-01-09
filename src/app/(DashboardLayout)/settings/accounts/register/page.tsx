'use client'
import { Button, Stack, TextField } from '@mui/material'
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard'
import React, { ChangeEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatPhoneNumber } from '@/utils/phoneNumber'
import { AdminAccount } from 'thunder-order/accounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const validation = (adminAccount: AdminAccount) => {
  if (adminAccount.id === '') {
    return false
  }
  if (adminAccount.password === '') {
    return false
  }
  if (adminAccount.name === '') {
    return false
  }

  return (
    adminAccount.phoneNumber !== '' &&
    formatPhoneNumber(adminAccount.phoneNumber) !== undefined
  )
}

const AdminAccountRegister = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isDisabled, setDisabled] = useState(true)
  const [adminAccount, setAdminAccount] = useState<AdminAccount>({
    id: '',
    password: '',
    name: '',
    phoneNumber: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'id') {
      setAdminAccount((prev) => ({
        ...prev,
        id: event.target.value,
      }))
    }
    if (event.target.id === 'password') {
      setAdminAccount((prev) => ({
        ...prev,
        password: event.target.value,
      }))
    }
    if (event.target.id === 'name') {
      setAdminAccount((prev) => ({
        ...prev,
        name: event.target.value,
      }))
    }
    if (event.target.id === 'phoneNumber') {
      setAdminAccount((prev) => ({
        ...prev,
        phoneNumber: event.target.value,
      }))
    }

    setDisabled(!validation(adminAccount))
  }

  const callback = searchParams.get('callback')
  const queryClient = useQueryClient()
  const { mutate: onRegister, isPending } = useMutation<
    any,
    Error,
    AdminAccount,
    any
  >({
    mutationFn: (adminAccount) =>
      fetch(`/api/accounts`, {
        method: 'POST',
        body: JSON.stringify(adminAccount),
      })
        .then((data) => data.json())
        .then((res) => res.message),
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: [callback] }).then()
    },
    onSuccess: () => {
      router.push('/settings/accounts')
    },
  })

  return (
    <BaseCard
      title="관리자 계정 등록"
      action={
        <Button
          variant="contained"
          color="primary"
          disabled={isDisabled || isPending}
          onClick={() => onRegister(adminAccount)}
        >
          등록하기
        </Button>
      }
    >
      <>
        <Stack spacing={3}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={adminAccount.id}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={adminAccount.password}
            onChange={handleChange}
          />
          <TextField
            id="name"
            label="이름"
            variant="outlined"
            value={adminAccount.name}
            onChange={handleChange}
          />
          <TextField
            id="phoneNumber"
            label="연락처"
            type="tel"
            variant="outlined"
            value={adminAccount.phoneNumber}
            onChange={handleChange}
          />
        </Stack>
      </>
    </BaseCard>
  )
}

export default AdminAccountRegister
