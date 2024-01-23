import styles from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/storeDetail.module.css'
import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { BasicButton } from '@/app/_components/BasicButton'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/response'
import React from 'react'
import { isNotEmpty } from '@/app/(AuthorizedLayout)/_lib/string'

type Props = {
  storeDetail: StoreDetailResponse,
  handlerEdit: () => void,
}

const StoreBusinessContainer = ({ storeDetail, handlerEdit }: Props) => {
  return (
    <Container className={styles.subContainer}>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          사업자 정보
        </Typography>
        {isNotEmpty(storeDetail.businessRegistrationUrl) ? (
          <Typography className={styles.contents}>
            [<Link href={''}>
            <u>사업자 등록증 보기</u>
          </Link>]
          </Typography>
        ) : null}
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title} />
        <Typography className={styles.contents}>
          상호명 : {storeDetail.businessName}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title} />
        <Typography className={styles.contents}>
          사업자 등록 번호 : {storeDetail.businessNumber}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title} />
        <Typography className={styles.contents}>
          대표자명 : {storeDetail.owner}
        </Typography>
        <BasicButton
          label={'등록 / 수정'}
          disabled={false}
          onClick={handlerEdit}
        />
      </Box>
    </Container>
  )
}

export default StoreBusinessContainer
