import { Button } from '@mui/material'
import styles from './BasicButton.module.css'
import { ButtonProps } from '@mui/material/Button/Button'

type Props = {
  label: string;
} & ButtonProps

export const BasicButton = (props: Props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      className={styles.button}
      { ...props }
    >
      {props.label}
    </Button>
  )
}
