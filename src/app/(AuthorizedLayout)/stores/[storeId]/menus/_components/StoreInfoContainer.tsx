import { Box, Container, Typography } from '@mui/material'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/response'
import styles from './storeMenuDetail.module.css'
import React from 'react'
import { BasicButton } from '@/app/_components/BasicButton'

type Props = {
  storeDetail: StoreDetailResponse,
  handleRegister: () => void
}

const StoreInfoContainer = ({ storeDetail, handleRegister }: Props) => {
  return (
    <Container className={styles.infoContainer}>
      <Box sx={{ flexGrow: '1'}}>
        <Box className={styles.row}>
          <Typography className={styles.title}>
            매장ID
          </Typography>
          <Typography className={styles.contents}>
            {storeDetail.id}
          </Typography>
        </Box>
        <Box className={styles.row}>
          <Typography className={styles.title}>
            매장명
          </Typography>
          <Typography className={styles.contents}>
            {storeDetail.name}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.buttonGroup}>
        <BasicButton
          label={'추가하기'}
          disabled={false}
          onClick={handleRegister}
        />
      </Box>
    </Container>
  )
}

export default StoreInfoContainer
