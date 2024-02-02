import React, { ChangeEvent } from 'react'
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import styles from '../../_components/form/textField.module.css'
import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/props'

type Props = {
  data: string,
  setData: (category: MenuCategory) => void,
}

const StoreCategoryRadioGroup = ({ data, setData }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value as MenuCategory)
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
