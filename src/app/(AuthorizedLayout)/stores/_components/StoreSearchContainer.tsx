import React from 'react'
import { StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/store'
import { Box, Container } from '@mui/material'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeListView.module.css'
import StoreSearchField from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchField'
import StoreSearchDate from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchDate'
import StoreSearchStatus from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchStatus'
import StoreSearchMenuCategory from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchMenuCategory'
import { BasicButton } from '@/app/_components/BasicButton'

const StoreSearchContainer = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
  return (
    <Container className={styles.searchContainer}>
      <Box className={styles.searchFirstRow}>
        <StoreSearchField pageParameters={pageParameters} setPageParameters={setPageParameters} />
        <StoreSearchDate pageParameters={pageParameters} setPageParameters={setPageParameters} />
      </Box>
      <StoreSearchStatus pageParameters={pageParameters} setPageParameters={setPageParameters} />
      <Box className={styles.searchLastRow}>
        <StoreSearchMenuCategory pageParameters={pageParameters} setPageParameters={setPageParameters} />
        <BasicButton
          label={'조회하기'}
          disabled={false}
          onClick={() => {}}
          sx={{ width: '250px' }}
        />
      </Box>
    </Container>
  )
}

export default StoreSearchContainer
