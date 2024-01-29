import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from '@mui/material'
import BaseTextField from '@/app/_components/BaseTextField'
import styles from './storeTextField.module.css'
import { StoreRegisterState } from '@/app/(AuthorizedLayout)/stores/[storeId]/menus/register/_components/StoreRegisterModal'

type Props = {
  data: string,
  setData: (category: string) => void,
}

const StoreCategoryRadioGroup = ({ data, setData }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value)
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
                    value={data}
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
