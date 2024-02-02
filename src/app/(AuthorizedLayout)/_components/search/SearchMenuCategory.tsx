import React, { ChangeEvent } from 'react'
import styles from '@/app/(AuthorizedLayout)/_components/search/searchMenuCategory.module.css'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { MenuCategory } from '@/app/(AuthorizedLayout)/stores/_models/props'

type Props = {
  menuCategories: MenuCategory[],
  setMenuCategories: (menuCategories: MenuCategory[]) => void
}

const SearchMenuCategory = ({
  menuCategories,
  setMenuCategories
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const eventMenuCategory = event.target.value as MenuCategory
    if (checked) {
      const slicedMenuCategories: MenuCategory[] = menuCategories.slice()
      setMenuCategories([...slicedMenuCategories, eventMenuCategory])
      return;
    }

    const filteredMenuCategories = menuCategories.filter((menuCategory) => menuCategory !== eventMenuCategory)
    setMenuCategories([...filteredMenuCategories])
  }

  return (
    <Box className={styles.checkboxGroupContainer}>
      <Typography className={styles.checkboxGroupLabel}>
        메뉴 구분
      </Typography>
      <FormGroup className={styles.checkboxGroup}>
        <FormControlLabel
          control={<Checkbox value={'MEALS'}
                             checked={menuCategories.includes('MEALS')}
                             onChange={handleChange} />}
          label="식사류" />
        <FormControlLabel
          control={<Checkbox value={'SNACKS'}
                             checked={menuCategories.includes('SNACKS')}
                             onChange={handleChange}  />}
          label="분식류" />
        <FormControlLabel
          control={<Checkbox value={'DESSERTS'}
                             checked={menuCategories.includes('DESSERTS')}
                             onChange={handleChange}  />}
          label="디저트류" />
        <FormControlLabel
          control={<Checkbox value={'CAFES'}
                             checked={menuCategories.includes('CAFES')}
                             onChange={handleChange} />}
          label="카페류" />
      </FormGroup>
    </Box>
  )
}

export default SearchMenuCategory
