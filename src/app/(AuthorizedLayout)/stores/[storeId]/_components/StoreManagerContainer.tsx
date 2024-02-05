import styles from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/storeDetail.module.css'
import { Box, Container, Typography } from '@mui/material'
import { formatPhoneNumber } from '@/app/(AuthorizedLayout)/_lib/phoneNumber'
import { BasicButton } from '@/app/_components/BasicButton'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/response'
import React from 'react'

type Props = {
  storeDetail: StoreDetailResponse,
  handlerEdit: () => void,
}

const StoreManagerContainer = ({ storeDetail, handlerEdit }: Props) => {
  return (
    <Container className={styles.subContainer}>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          담당자명
        </Typography>
        <Typography className={styles.contents}>
          {storeDetail.name}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          담당자 연락처
        </Typography>
        <Typography className={styles.contents}>
          {formatPhoneNumber(storeDetail.managerPhoneNumber)}
        </Typography>
        <BasicButton
          label={'수정'}
          disabled={false}
          onClick={handlerEdit}
        />
      </Box>
    </Container>
  )
}

export default StoreManagerContainer
