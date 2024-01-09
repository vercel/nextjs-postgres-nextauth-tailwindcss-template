'use server'

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminAccount } from 'thunder-order/accounts'
import { NextRequest } from 'next/server'
import { formatPhoneNumber } from '@/utils/phoneNumber'
import {
  badRequestError,
  created,
  getFetch,
  noAuthorizationError,
  ok,
  postFetch,
} from '@/app/api/common'
import { Page, ResponseData } from 'thunder-order'
import { Account } from 'next-auth'

const getAdminAccounts = async (
  token: string,
  pageNumber: number,
  pageSize: number,
): Promise<ResponseData<Page<Account>>> =>
  await getFetch({
    version: 'v1',
    path: `/accounts?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`,
    token,
  })

const setAdminAccount = async (
  token: string,
  adminAccount: AdminAccount,
): Promise<ResponseData<undefined>> =>
  await postFetch({
    version: 'v1',
    path: '/accounts',
    token,
    body: adminAccount,
  })

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

  return !(
    adminAccount.phoneNumber === '' ||
    formatPhoneNumber(adminAccount.phoneNumber) == undefined
  )
}

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  if (session == null || session.token == null) {
    return noAuthorizationError()
  }

  const { searchParams } = new URL(request.url)
  const responseData = await getAdminAccounts(
    session.token!,
    Number(searchParams.get('page')),
    Number(searchParams.get('size')),
  )
  return ok(responseData)
}

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  if (session == null || session.token == null) {
    return noAuthorizationError()
  }
  const adminAccount = await request.json()
  if (!validation(adminAccount)) {
    return badRequestError('Bad Request. Invalid values.')
  }

  const responseData = await setAdminAccount(session.token!, adminAccount)
  return created(responseData)
}
