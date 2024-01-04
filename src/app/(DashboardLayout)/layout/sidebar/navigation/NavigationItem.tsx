import React from 'react'
// mui imports
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Theme,
} from '@mui/material'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { IconCircleFilled } from '@tabler/icons-react'

export type NavigationItemType = {
  id: number
  title: string
  href: string
}

interface ItemType {
  navigation: NavigationItemType
  pathDirect: string
}

const NavigationItem = ({ navigation, pathDirect }: ItemType) => {
  const ListSubheaderStyled = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: '700',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: '26px',
    padding: '0 12px',
  }))

  return (
    <ListSubheaderStyled key={navigation.id}>
      <ListItemButton
        component={Link}
        href={navigation.href}
        selected={pathDirect === navigation.href}
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
    </ListSubheaderStyled>
  )
}

NavigationItem.propTypes = {
  navigationItem: PropTypes.object,
}

export default NavigationItem
