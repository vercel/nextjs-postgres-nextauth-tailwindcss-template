import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#03c9d7',
      light: '#e5fafb',
      dark: '#05b2bd',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fb9678',
      light: '#fcf1ed',
      dark: '#e67e5f',
      contrastText: '#ffffff',
    },
    success: {
      main: '#00c292',
      light: '#ebfaf2',
      dark: '#00964b',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0bb2fb',
      light: '#a7e3f4',
      dark: '#0bb2fb',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e46a76',
      light: '#fdf3f5',
      dark: '#e45a68',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#fec90f',
      light: '#fff4e5',
      dark: '#dcb014',
      contrastText: '#ffffff',
    },
  },
})

export default theme
