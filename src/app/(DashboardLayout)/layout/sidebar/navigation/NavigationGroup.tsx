import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'
import { Icon } from '@tabler/icons-react'
import NavigationItem, {
  NavigationItemType,
} from '@/app/(DashboardLayout)/layout/sidebar/navigation/NavigationItem'

export type NavigationGroupType = {
  id: number
  title: string
  icon: Icon
  href: string
  children?: NavigationItemType[]
}

interface ItemType {
  navigation: NavigationGroupType
  pathDirect: string
  onClick: (event: MouseEvent<HTMLElement>) => void
}

const NavigationGroup = ({ navigation, pathDirect, onClick }: ItemType) => {
  const Icon = navigation.icon
  const theme = useTheme()
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />
  const isSelected = pathSelected(navigation, pathDirect)

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    '.MuiButtonBase-root': {
      whiteSpace: 'nowrap',
      marginBottom: '8px',
      padding: '8px 10px',
      borderRadius: '8px',
      color: theme.palette.text.secondary,
      paddingLeft: '10px',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      '&.Mui-selected': {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        },
      },
    },
  }))

  return (
    <List component="div" disablePadding key={navigation.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={navigation.href}
          // disabled={navigation.disabled}
          selected={isSelected}
          // target={navigation.external ? "_blank" : ""}
          onClick={onClick}
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
      </ListItemStyled>
      {navigation.children ? (
        <Collapse in={isSelected}>
          {navigation.children.map((subNavigation) => (
            <NavigationItem
              key={subNavigation.id}
              navigation={subNavigation}
              pathDirect={pathDirect}
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

/**
 * 네비게이션이 선택되었느지 여부.
 *
 * @param navigation 네비게이션 정보
 * @param pathDirect 현재 경로
 */
const pathSelected = (navigation: NavigationGroupType, pathDirect: string) => {
  if (navigation.children) {
    return (
      navigation.children.findIndex((item) => pathDirect === item.href) > -1
    )
  }

  return pathDirect === navigation.href
}
