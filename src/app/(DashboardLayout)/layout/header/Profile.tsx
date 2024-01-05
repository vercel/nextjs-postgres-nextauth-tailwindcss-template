import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
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
  Typography,
} from '@mui/material'
import {
  IconChevronDown,
  IconCreditCard,
  IconCurrencyDollar,
  IconShield,
} from '@tabler/icons-react'
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

  const theme = useTheme()
  const primary = theme.palette.primary.main
  const primarylight = theme.palette.primary.light
  const error = theme.palette.error.main
  const errorlight = theme.palette.error.light
  const success = theme.palette.success.main
  const successlight = theme.palette.success.light

  /*profile data*/
  const profiledata = [
    {
      href: '/',
      title: 'My Profile',
      subtitle: 'Account Settings',
      icon: <IconCurrencyDollar width="20" height="20" />,
      color: primary,
      lightcolor: primarylight,
    },
    {
      href: '/',
      title: 'My Inbox',
      subtitle: 'Messages & Emails',
      icon: <IconShield width="20" height="20" />,
      color: success,
      lightcolor: successlight,
    },
    {
      href: '/',
      title: 'My Tasks',
      subtitle: 'To-do and Daily Tasks',
      icon: <IconCreditCard width="20" height="20" />,
      color: error,
      lightcolor: errorlight,
    },
  ]

  const handleLogout = async () => {
    console.log('click logout')
    const response = await signOut({
      redirect: false,
    })
    router.push('/auth/sign-in')
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
            borderRadius: '9px',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={'/images/users/user2.jpg'}
          alt={'ProfileImg'}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
            alignItems: 'center',
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
              ml: 1,
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
            pt: 0,
          },
        }}
      >
        <Box pt={0}>
          <List>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Account" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Change Password" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="My Settings" />
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
