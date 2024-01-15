'use client'

import { useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Typography
} from '@mui/material'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const router = useRouter()
  const [anchorEl2, setAnchorEl2] = useState(null)
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }

  const handleLogout = async () => {
    signOut({
      redirect: false
    })
    .then((response) => {
      console.log(`response:${response}`)
      router.replace('/')
    })
    .catch((error) => {
      console.log(`error:${error}`)
    })
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            borderRadius: '9px'
          })
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={'/images/users/user2.jpg'}
          alt={'ProfileImg'}
          sx={{
            width: 30,
            height: 30
          }}
        />
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'flex'
            },
            alignItems: 'center'
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1
            }}
          >
            Julia
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 2,
            pb: 2,
            pt: 0
          }
        }}
      >
        <Box pt={0}>
          <List>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </List>
        </Box>
        <Divider />
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default Profile
