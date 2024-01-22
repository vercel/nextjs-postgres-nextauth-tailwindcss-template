import React from 'react'
import { StorePageParameters, StoreSearchProps } from '@/app/(AuthorizedLayout)/stores/_models/store'
import { Box, Container } from '@mui/material'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeListView.module.css'
import StoreSearchField from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchField'
import StoreSearchDate from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchDate'
import StoreSearchStatus from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchStatus'
import StoreSearchMenuCategory from '@/app/(AuthorizedLayout)/stores/_components/StoreSearchMenuCategory'
import { BasicButton } from '@/app/_components/BasicButton'

type Props = {
  handlerRouter: (pageParameters: StorePageParameters) => void
} & StoreSearchProps


const StoreSearchContainer = ({ pageParameters, setPageParameters, handlerRouter }: Props) => {
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
          onClick={() => {
            setPageParameters((prev) => ({
              ...prev,
              page: 1
            }))
            handlerRouter(pageParameters)
          }}
          sx={{ width: '250px' }}
        />
      </Box>
    </Container>
  )
}

export default StoreSearchContainer
