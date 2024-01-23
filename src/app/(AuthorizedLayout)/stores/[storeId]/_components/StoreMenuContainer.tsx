import styles from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/storeDetail.module.css'
import { Box, Container, Typography } from '@mui/material'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/storeDetail'
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

type Props = {
  storeDetail: StoreDetailResponse,
  handleRouter: () => void,
}

const StoreMenuContainer = ({ storeDetail, handleRouter }: Props) => {
  return (
    <Container className={styles.subContainer}>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          메뉴
        </Typography>
        <Typography className={styles.contents}>
          {storeDetail.menuCount}개
        </Typography>
        <ArrowForwardIosIcon onClick={handleRouter} />
      </Box>
    </Container>
  )
}

export default StoreMenuContainer
