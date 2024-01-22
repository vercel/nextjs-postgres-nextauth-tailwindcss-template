import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from '@mui/material'
import BaseTextField from '@/app/_components/BaseTextField'
import styles from './storeTextField.module.css'
import { StoreRegisterState } from '@/app/(AuthorizedLayout)/stores/register/_components/StoreRegisterModal'

type Props = {
  registerData: StoreRegisterState,
  setRegisterData: Dispatch<SetStateAction<StoreRegisterState>>
}

const StoreCategoryRadioGroup = ({ registerData, setRegisterData }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      category: event.target.value
    }))
  }

  return (
    <>
      <Box className={styles.container}>
        <Typography className={styles.label}>
          메뉴구분
        </Typography>
      </Box>
      <Box className={styles.container}>
        <RadioGroup className={styles.radioGroup}
                    value={registerData.category}
                    onChange={handleChange}>
          <FormControlLabel
            control={<Radio value={'MEALS'} />}
            label="식사류" />
          <FormControlLabel
            control={<Radio value={'SNACKS'} />}
            label="분식류" />
          <FormControlLabel
            control={<Radio value={'DESSERTS'} />}
            label="디저트류" />
          <FormControlLabel
            control={<Radio value={'CAFES'} />}
            label="카페류" />
        </RadioGroup>
      </Box>
    </>
  )
}

export default StoreCategoryRadioGroup
