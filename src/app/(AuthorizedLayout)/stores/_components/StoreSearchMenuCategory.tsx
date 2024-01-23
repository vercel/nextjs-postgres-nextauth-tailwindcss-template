import React, { ChangeEvent } from 'react'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeList.module.css'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { MenuCategory, StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/store'

const StoreSearchMenuCategory = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const eventMenuCategory = event.target.value as MenuCategory
    if (checked) {
      const slicedMenuCategories: MenuCategory[] = pageParameters.menuCategories.slice()
      setPageParameters((prev) => ({
        ...prev,
        menuCategories: [...slicedMenuCategories, eventMenuCategory]
      }))
      return;
    }

    const filteredMenuCategories = pageParameters.menuCategories
      .filter((menuCategory) => menuCategory !== eventMenuCategory)
    setPageParameters((prev) => ({
      ...prev,
      menuCategories: [...filteredMenuCategories]
    }))
  }
  return (
    <Box className={styles.checkboxGroupContainer}>
      <Typography className={styles.checkboxGroupLabel}>
        메뉴 구분
      </Typography>
      <FormGroup className={styles.checkboxGroup}>
        <FormControlLabel
          control={<Checkbox value={'MEALS'}
                             checked={pageParameters.menuCategories.includes('MEALS')}
                             onChange={handleChange} />}
          label="식사류" />
        <FormControlLabel
          control={<Checkbox value={'SNACKS'}
                             checked={pageParameters.menuCategories.includes('SNACKS')}
                             onChange={handleChange}  />}
          label="분식류" />
        <FormControlLabel
          control={<Checkbox value={'DESSERTS'}
                             checked={pageParameters.menuCategories.includes('DESSERTS')}
                             onChange={handleChange}  />}
          label="디저트류" />
        <FormControlLabel
          control={<Checkbox value={'CAFES'}
                             checked={pageParameters.menuCategories.includes('CAFES')}
                             onChange={handleChange} />}
          label="카페류" />
      </FormGroup>
    </Box>
  )
}

export default StoreSearchMenuCategory
