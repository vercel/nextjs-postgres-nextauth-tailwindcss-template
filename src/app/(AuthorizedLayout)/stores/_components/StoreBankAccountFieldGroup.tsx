import React, { ChangeEvent } from 'react'
import { Box, Typography } from '@mui/material'
import BaseTextField, { TextFieldState } from '@/app/_components/BaseTextField'
import styles from '../../_components/form/textField.module.css'
import {
  accountHolderValidated,
  accountNumberValidated,
  bankNameValidated
} from '@/app/(AuthorizedLayout)/stores/_lib/validated'

type Props = {
  data: {
    bankName: TextFieldState,
    accountNumber: TextFieldState,
    accountHolder: TextFieldState,
  },
  setData: {
    bankName: (bankState: TextFieldState) => void,
    accountNumber: (accountNumberState: TextFieldState) => void,
    accountHolder: (accountHolderState: TextFieldState) => void,
  },
  onValidated: () => void
}

const StoreBankAccountFieldGroup = ({
  data,
  setData,
  onValidated
}: Props) => {
  const onChangeBankName = (event: ChangeEvent<HTMLInputElement>) => {
    const bankName = event.target.value
    const errorMessage = bankNameValidated(bankName)
    setData.bankName({
      value: bankName,
      isError: errorMessage !== '',
      errorMessage: errorMessage
    })
    onValidated()
  }

  const onChangeAccountHolder = (event: ChangeEvent<HTMLInputElement>) => {
    const accountHolder = event.target.value
    const errorMessage = accountHolderValidated(accountHolder)
    setData.accountHolder({
      value: accountHolder,
      isError: errorMessage !== '',
      errorMessage: errorMessage
    })
    onValidated()
  }

  const onChangeAccountNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const accountNumber = event.target.value
    const errorMessage = accountNumberValidated(accountNumber)
    setData.accountNumber({
      value: accountNumber,
      isError: errorMessage !== '',
      errorMessage: errorMessage
    })
    onValidated()
  }

  return (
    <>
      <Box className={styles.container}>
        <Typography className={styles.label}>
          계좌 번호
        </Typography>
        <Box className={styles.bankAccountFieldGroup}>
          <BaseTextField
            id={'bankName'}
            placeholder={'은행'}
            state={data.bankName}
            onChange={onChangeBankName}
            className={styles.bankNameTextField}
          />
          <BaseTextField
            id={'accountHolder'}
            placeholder={'예금주'}
            state={data.accountHolder}
            onChange={onChangeAccountHolder}
            className={styles.accountHolderTextField}
          />
        </Box>
      </Box>
      <Box className={styles.container}>
        <Typography className={styles.label}>
        </Typography>
        <BaseTextField
          id={'accountNumber'}
          placeholder={'계좌번호'}
          state={data.accountNumber}
          onChange={onChangeAccountNumber}
          className={styles.textField}
        />
      </Box>
    </>
  )
}

export default StoreBankAccountFieldGroup
