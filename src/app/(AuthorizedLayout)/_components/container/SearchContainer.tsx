import React, { ReactNode } from 'react'
import styles from './searchContainer.module.css'
import { Box, Container } from '@mui/material'

type Props = {
  firstRow: ReactNode,
  lastRow: ReactNode
  children: ReactNode,
}

const SearchContainer = ({
 firstRow,
 lastRow,
 children,
}: Props) => {
  return (
    <Container className={styles.searchContainer}>
      <Box className={styles.searchFirstRow}>
        {firstRow}
      </Box>
      {children}
      <Box className={styles.searchLastRow}>
        {lastRow}
      </Box>
    </Container>
  )
}

export default SearchContainer
