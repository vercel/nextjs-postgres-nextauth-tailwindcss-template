import styles from '@/app/(AuthorizedLayout)/stores/[storeId]/_components/storeDetail.module.css'
import { Box, Container, Typography } from '@mui/material'
import Link from 'next/link'
import { formatPhoneNumber } from '@/app/(AuthorizedLayout)/_lib/phoneNumber'
import { menuCategoryName } from '@/app/(AuthorizedLayout)/stores/_lib/menuCategory'
import { BasicButton } from '@/app/_components/BasicButton'
import { StoreDetailResponse } from '@/app/(AuthorizedLayout)/stores/[storeId]/_models/response'
import StoreImageModal from '@/app/(AuthorizedLayout)/stores/_components/StoreImageModal'

type Props = {
  storeDetail: StoreDetailResponse,
  handlerEdit: () => void,
}

const StoreInfoContainer = ({ storeDetail, handlerEdit }: Props) => {
  return (
    <Container className={styles.subContainer}>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          매장ID
        </Typography>
        <Typography className={styles.contents}>
          {storeDetail.storeId}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          매장명
        </Typography>
        <Typography className={styles.contents}>
          {storeDetail.storeName}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          이미지
        </Typography>
        {storeDetail.imageUrl !== '' ? (
          <StoreImageModal
            label={<u>이미지</u>}
            storeId={storeDetail.storeId}
            imageName={storeDetail.imageUrl}
          />
        ) : null}
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          매장 전화번호
        </Typography>
        <Typography className={styles.contents}>
          {formatPhoneNumber(storeDetail.storeTel)}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          계좌 번호
        </Typography>
        <Typography className={styles.contents}>
          {storeDetail.bank} | {storeDetail.accountNumber} | {storeDetail.accountHolder}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          메뉴 구분
        </Typography>
        <Typography className={styles.contents}>
          {menuCategoryName(storeDetail.category)}
        </Typography>
      </Box>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          영업 소재지
        </Typography>
        <Typography className={styles.contents}>
          {storeDetail.businessLocation}
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

export default StoreInfoContainer
