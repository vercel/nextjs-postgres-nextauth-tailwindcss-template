import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import Link from 'next/link'
import { IconCircleFilled } from '@tabler/icons-react'
import styles from './navigationItem.module.css'

export type NavigationItemType = {
  id: number
  title: string
  href: string
}

interface ItemType {
  navigation: NavigationItemType
  isSelected: boolean
}



const NavigationItem = ({ navigation, isSelected }: ItemType) => {
  return (
    <ListSubheader key={navigation.id} disableSticky className={styles.navigationItem}>
      <ListItemButton
        component={Link}
        href={navigation.href}
        selected={isSelected}
      >
        <ListItemIcon
          sx={{
            height: '24px',
            alignItems: 'center',
            minWidth: '20px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          <IconCircleFilled size="10px" />
        </ListItemIcon>
        <ListItemText>
          <>{navigation.title}</>
        </ListItemText>
      </ListItemButton>
    </ListSubheader>
  )
}

export default NavigationItem
