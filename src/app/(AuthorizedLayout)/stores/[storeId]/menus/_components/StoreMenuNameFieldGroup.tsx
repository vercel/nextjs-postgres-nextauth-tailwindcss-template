import React, { ChangeEvent } from 'react'
import { Box, Typography } from '@mui/material'
import BaseTextField, { TextFieldState } from '@/app/_components/BaseTextField'
import styles from './storeMenuNameFieldGroup.module.css'
import {
  menuEnglishNameValidated,
  menuNameValidated
} from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_lib/validated'

type Props = {
  data: {
    name: TextFieldState,
    englishName: TextFieldState,
  },
  setData: {
    bane: (menuNameState: TextFieldState) => void,
    englishName: (menuEnglishNameState: TextFieldState) => void,
  },
  onValidated: () => void
}

const StoreMenuNameFieldGroup = ({
  data,
  setData,
  onValidated
}: Props) => {
  const onChangeMenuName = (event: ChangeEvent<HTMLInputElement>) => {
    const menuName = event.target.value
    const errorMessage = menuNameValidated(menuName)
    setData.bane({
      value: menuName,
      isError: errorMessage !== '',
      errorMessage: errorMessage
    })
    onValidated()
  }

  const onChangeMenuEnglishName = (event: ChangeEvent<HTMLInputElement>) => {
    const menuEnglishName = event.target.value
    const errorMessage = menuEnglishNameValidated(menuEnglishName)
    setData.englishName({
      value: menuEnglishName,
      isError: errorMessage !== '',
      errorMessage: errorMessage
    })
    onValidated()
  }

  return (
    <>
      <Box className={styles.container}>
        <Typography className={styles.label}>
          메뉴명
        </Typography>
        <Box className={styles.menuNameFieldGroup}>
          <BaseTextField
            id={'menuName'}
            placeholder={'메뉴명'}
            state={data.name}
            onChange={onChangeMenuName}
            className={styles.menuNameTextField}
          />
          <BaseTextField
            id={'menuEnglishName'}
            placeholder={'영문 메뉴명(선택사항)'}
            state={data.englishName}
            onChange={onChangeMenuEnglishName}
            className={styles.menuEnglishNameTextField}
          />
        </Box>
      </Box>
    </>
  )
}

export default StoreMenuNameFieldGroup
