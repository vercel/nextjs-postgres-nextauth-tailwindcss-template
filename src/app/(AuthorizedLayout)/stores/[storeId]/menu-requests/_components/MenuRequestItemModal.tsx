'use client'

import styles from './menuRequestListItem.module.css'
import { Box, Modal } from '@mui/material'
import { ReactNode, useState } from 'react'

type Props = {
  content: ReactNode,
  modalContent: ReactNode
}

const MenuRequestItemModal = ({ content, modalContent }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };


  return (
    <Box className={styles.overlay}>
      <Box onClick={handleOpen}>{content}</Box>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className={styles.overlayModal}>
          {modalContent}
        </Box>
      </Modal>
    </Box>
  )
}

export default MenuRequestItemModal
