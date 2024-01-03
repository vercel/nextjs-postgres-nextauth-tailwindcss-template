import React from 'react'
import NavigationItems from './NavigationItems'
import { usePathname } from 'next/navigation'
import { Box, List } from '@mui/material'
import NavItem from './NavItem'
import NavGroup from './NavGroup/NavGroup'

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname()
  const pathDirect = pathname

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {NavigationItems.map((item) => {
          // {/********SubHeader**********/}
          // if (item.subheader) {
          //   return <NavGroup item={item} key={item.subheader} />;

          //   // {/********If Sub Menu**********/}
          //   /* eslint no-else-return: "off" */
          // } else {
          return (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          )
        })}
      </List>
    </Box>
  )
}
export default SidebarItems
