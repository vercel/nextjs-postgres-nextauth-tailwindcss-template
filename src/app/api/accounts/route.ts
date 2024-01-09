'use server'

import { getServerSession } from 'next-auth/next'
import {
  ACCESS_TOKEN_HEADER,
  authOptions,
} from '@/app/api/auth/[...nextauth]/route'
import { Page, Response } from 'thunder-order'
import { AdminAccount } from 'thunder-order/accounts'
import { NextRequest, NextResponse } from 'next/server'
import { formatPhoneNumber } from '@/utils/phoneNumber'

const getAdminAccounts = async (
  token: string,
  pageNumber: number,
  pageSize: number,
) => {
  try {
    const responseData: Response<Page<AdminAccount>> = await fetch(
      `${process.env.SERVER_URL}/api/v1/admin/accounts?pageNumber=${
        pageNumber - 1
      }&pageSize=${pageSize}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `${ACCESS_TOKEN_HEADER}${token}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server returned Error ' + response.status)
        }
        return response.json()
      })
      .then((json) => json.data)
      .catch((error) =>
        console.error('There was a problem with the Fetch operation', error),
      )

    // console.log(responseData)
    return responseData
  } catch (error) {
    throw error
  }
}

const setAdminAccount = async (token: string, adminAccount: AdminAccount) => {
  try {
    const responseData: Response<undefined> = await fetch(
      `${process.env.SERVER_URL}/api/v1/admin/accounts`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `${ACCESS_TOKEN_HEADER}${token}`,
        },
        body: JSON.stringify(adminAccount),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Server returned Error ' + response.status)
        }
        return response.json()
      })
      .then((json) => json.data)
      .catch((error) =>
        console.error('There was a problem with the Fetch operation', error),
      )

    // console.log(responseData)
    return responseData
  } catch (error) {
    throw error
  }
}

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
    return NextResponse.json({ error: 'No Authorization' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  try {
    const responseData = await getAdminAccounts(
      session.token!,
      Number(searchParams.get('page')),
      Number(searchParams.get('size')),
    )

    return NextResponse.json({
      data: responseData,
      message: 'Success',
    })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  if (session == null || session.token == null) {
    return NextResponse.json({ error: 'No Authorization' }, { status: 401 })
  }
  const adminAccount = await request.json().then((json) => JSON.parse(json))
  if (!validation(adminAccount)) {
    return NextResponse.json(
      { error: 'Bad Request. Invalid values.' },
      { status: 400 },
    )
  }

  try {
    const responseData = await setAdminAccount(session.token!, adminAccount)

    return NextResponse.json(
      {
        data: responseData,
        message: 'Success',
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
