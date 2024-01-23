'use client'

import { AppBar, Box, Stack, Toolbar } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// components
import Profile from './Profile'
import styles from './header.module.css'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <AppBar position="sticky" color="default" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box flexGrow={1} >
          { (pathname !== '/' && pathname !== '/dashboard') ? <ArrowBackIosIcon onClick={() => router.back()} /> : null }
        </Box>
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
