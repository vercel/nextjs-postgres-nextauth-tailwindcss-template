import Navigations from './navigation/Navigations'
import { usePathname } from 'next/navigation'
import { Box, List } from '@mui/material'
import NavigationGroup, { NavigationGroupType } from './navigation/NavigationGroup'

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathDirect = usePathname()
  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Navigations.map((navigation: NavigationGroupType) => (
          <NavigationGroup
            key={navigation.id}
            navigation={navigation}
            pathDirect={pathDirect}
            onClick={toggleMobileSidebar}
          />
        ))}
      </List>
    </Box>
  )
}
export default SidebarItems
