import { Box, Container, IconButton, Typography } from '@mui/material'
import styles from './menuRequestStoreView.module.css'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  storeId: string,
  storeName: string,
  handleClose: () => void
}

const StoreInfoContainer = ({ storeId, storeName, handleClose }: Props) => {
  return (
    <Container className={styles.infoContainer}>
      <Box sx={{ flexGrow: '1'}}>
        <Box className={styles.row}>
          <Typography className={styles.title}>
            매장ID
          </Typography>
          <Typography className={styles.contents}>
            {storeId}
          </Typography>
        </Box>
        <Box className={styles.row}>
          <Typography className={styles.title}>
            매장명
          </Typography>
          <Typography className={styles.contents}>
            {storeName}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.buttonGroup}>
        <IconButton aria-label="close">
          <CloseIcon onClick={handleClose} />
        </IconButton>
      </Box>
    </Container>
  )
}

export default StoreInfoContainer
