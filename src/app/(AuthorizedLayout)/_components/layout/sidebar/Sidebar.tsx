import { Box, Drawer } from '@mui/material'
import SidebarItems from './SidebarItems'
import Logo from './logo/Logo'

const Sidebar = () => {
  const sidebarWidth = '270px'
  return (
    <Box
      sx={{
        width: sidebarWidth,
        flexShrink: 0
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar for desktop */}
      {/* ------------------------------------------- */}
      <Drawer
        anchor="left"
        open={true}
        variant="permanent"
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxSizing: 'border-box',
            border: '0',
            boxShadow: 'rgba(113, 122, 131, 0.11) 0px 7px 30px 0px'
          }
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar Box */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            height: '100%'
          }}
          py={2}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Box px={2}>
            <Logo />
          </Box>
          <Box>
            {/* ------------------------------------------- */}
            {/* Sidebar Items */}
            {/* ------------------------------------------- */}
            <Box mt={3}>
              <SidebarItems />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Sidebar
