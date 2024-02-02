'use client'

import { ReactNode, useState } from 'react'
import { Box, Modal } from '@mui/material'
import Image from 'next/image'
import styles from './storeImageModal.module.css'
import { storeImageUrl } from '@/app/(AuthorizedLayout)/stores/_lib/storeImageUrl'

type Props = {
  label: ReactNode,
  storeId: string,
  imagePath: string,
}

const StoreImageModal = ({ label, storeId, imagePath }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Box onClick={handleClick}>{label}</Box>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className={styles.container}>
          <Image
            src={storeImageUrl(imagePath)}
            width={0}
            height={0}
            sizes={'100%'}
            alt={storeId}
            className={styles.image}
          />
        </Box>
      </Modal>
    </>

  )
}

export default StoreImageModal
