import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeListView.module.css'
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import {
  StorePageParameters,
  StoreSearchCondition,
  StoreSearchProps
} from '@/app/(AuthorizedLayout)/stores/_models/Store'

const StoreSearchField = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
  const handleSearchConditionChange = (
    event: SelectChangeEvent<StoreSearchCondition>
  ) => {
    setPageParameters((prev) => ({
      ...prev,
      searchCondition: event.target.value as StoreSearchCondition
    }))
  }

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPageParameters((prev) => ({
      ...prev,
      searchValue: event.target.value
    }))
  }

  return (
    <Box className={styles.searchField}>
      <FormControl
        className={styles.searchCondition}>
        <Select
          id="searchCondition"
          value={pageParameters.searchCondition}
          onChange={handleSearchConditionChange}
        >
          <MenuItem value={'STORE_NAME'}>매장명</MenuItem>
          <MenuItem value={'STORE_ID'}>매장 ID</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="searchValue"
        variant="outlined"
        placeholder={'내용을 입력해주세요'}
        value={pageParameters.searchValue}
        onChange={handleSearchValueChange}
        className={styles.searchValue}
      />
    </Box>
  )
}

export default StoreSearchField
