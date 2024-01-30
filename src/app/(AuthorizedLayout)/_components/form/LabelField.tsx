import styles from './labelField.module.css'
import { Box, Typography } from '@mui/material'

type Props = {
  label: string,
  data: string,
}

const LabelField = ({
  label,
  data,
}: Props) => {
  return (
    <Box className={styles.container}>
      <Typography className={styles.label}>
        {label}
      </Typography>
      <Typography className={styles.dataField}>
        {data}
      </Typography>
    </Box>
  )
}

export default LabelField
