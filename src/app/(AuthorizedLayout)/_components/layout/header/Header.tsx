import { AppBar, Box, Stack, Toolbar } from '@mui/material'

// components
import Profile from './Profile'
import styles from './header.module.css'

const Header = () => {
  return (
    <AppBar position="sticky" color="default" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
