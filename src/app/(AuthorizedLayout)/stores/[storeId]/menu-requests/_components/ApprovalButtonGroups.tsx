import React from 'react'
import { Box, Button } from '@mui/material'
import styles from './approvalButtonGroups.module.css'

type Props = {
  selectedIndexes: number[],
  handelReject: () => void,
  handleApproval: () => void,
}

const ApprovalButtonGroups = ({ selectedIndexes, handelReject, handleApproval }: Props) => {
  return (
    <Box className={styles.buttonGroup}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handelReject}
        disabled={selectedIndexes.length == 0}
        className={styles.rejectButton}
      >미승인</Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleApproval}
        disabled={selectedIndexes.length == 0}
        className={styles.approvalButton}
      >승인</Button>
    </Box>
  )
}

export default ApprovalButtonGroups
