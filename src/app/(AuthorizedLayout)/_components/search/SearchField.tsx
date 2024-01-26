import React, { ChangeEvent, ReactNode } from 'react'
import styles from '@/app/(AuthorizedLayout)/_components/search/searchField.module.css'
import { Box, FormControl, Select, SelectChangeEvent, TextField } from '@mui/material'

type Props = {
  searchCondition: string,
  searchValue: string,
  setSearchCondition: (searchCondition: string) => void,
  setSearchValue: (searchValue: string) => void,
  children: ReactNode
}

const SearchField = ({
   searchCondition,
   searchValue,
   setSearchCondition,
   setSearchValue,
                       children,
}: Props) => {
  console.log('searchCondition', searchCondition)
  const handleSearchConditionChange = (
    event: SelectChangeEvent
  ) => {
    setSearchCondition(event.target.value)
  }

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <Box className={styles.searchField}>
      <FormControl
        className={styles.searchCondition}>
        <Select
          id="searchCondition"
          value={searchCondition}
          onChange={handleSearchConditionChange}
        >
          {children}
        </Select>
      </FormControl>
      <TextField
        id="searchValue"
        variant="outlined"
        placeholder={'내용을 입력해주세요'}
        value={searchValue}
        onChange={handleSearchValueChange}
        className={styles.searchValue}
      />
    </Box>
  )
}

export default SearchField
