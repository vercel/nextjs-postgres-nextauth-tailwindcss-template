import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { Icon } from '@tabler/icons-react'
import styles from './navigationGroup.module.css'
import NavigationItem, {
  NavigationItemType
} from '@/app/(AuthorizedLayout)/_components/layout/sidebar/navigation/NavigationItem'

export type NavigationGroupType = {
  index: number
  title: string
  icon: Icon
  href: string
  children?: NavigationItemType[]
}

interface ItemType {
  navigation: NavigationGroupType
  pathDirect: string
}

/**
 * 네비게이션이 선택되었느지 여부.
 *
 * @param navigation 네비게이션 정보
 * @param pathDirect 현재 경로
 */
const pathSelected = (navigation: NavigationGroupType, pathDirect: string) => {
  if (navigation.children) {
    return (
      navigation.children.findIndex((item) => pathDirect.startsWith(item.href)) > -1
    )
  }

  return pathDirect === navigation.href
}

const NavigationGroup = ({ navigation, pathDirect }: ItemType) => {
  const Icon = navigation.icon
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />
  const isSelected = pathSelected(navigation, pathDirect)

  const isItemSelected = (subNavigation: NavigationItemType) => {
    if (navigation.children === undefined) {
      return false
    }

    const selectItemType = navigation.children
      .filter((navigationItem) => pathDirect.startsWith(navigationItem.href))
      .sort((a,b) => b.href.length - a.href.length)
      .at(0)
    return selectItemType?.index === subNavigation.index
  }

  return (
    <List component="div" disablePadding key={navigation.index}>
      <ListItem className={styles.navigationGroup}>
        <ListItemButton
          component={Link}
          href={navigation.href}
          // disabled={navigation.disabled}
          selected={isSelected}
          // target={navigation.external ? "_blank" : ""}
        >
          <ListItemIcon
            sx={{
              minWidth: '36px',
              p: '3px 0',
              color: 'inherit',
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            <>{navigation.title}</>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      {navigation.children ? (
        <Collapse in={isSelected}>
          {navigation.children.map((subNavigation) => (
            <NavigationItem
              key={subNavigation.index}
              navigation={subNavigation}
              isSelected={isItemSelected(subNavigation)}
            />
          ))}
        </Collapse>
      ) : (
        <></>
      )}
    </List>
  )
}

export default NavigationGroup
