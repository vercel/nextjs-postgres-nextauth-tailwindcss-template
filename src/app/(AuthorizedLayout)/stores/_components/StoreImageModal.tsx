'use client'

import { ReactNode, useState } from 'react'
import { Box, Modal } from '@mui/material'
import Image from 'next/image'
import styles from './storeImage.module.css'

type Props = {
  label: ReactNode,
  storeId: string,
  imageName: string,
}

const StoreImageModal = ({ label, storeId, imageName }: Props) => {
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
            src={`/api/stores/${storeId}/images/${imageName}`}
            width={0}
            height={0}
            sizes={"100%"}
            alt={storeId}
            className={styles.image}
          />
        </Box>
      </Modal>
    </>

  )
}

export default StoreImageModal
