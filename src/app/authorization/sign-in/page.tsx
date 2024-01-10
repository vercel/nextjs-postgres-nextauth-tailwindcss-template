import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  styled,
  TextField,
  Theme,
} from '@mui/material'
import Image from 'next/image'
import styles from './page.module.css'

const SignIn = () => {
  return (
    <div className={styles.mainWrapper}>
      <Container
        maxWidth={"xs"}
        className={styles.container}>
        <Box
          component="form"
          method={"POST"}
          autoComplete={"off"}
          className={styles.form}
        >
          <Image
            src="/images/logos/login-logo.svg"
            alt="login-logo"
            width={208}
            height={120}
            priority
          />
          <TextField
            id="id"
            label="아이디"
            className={styles.textField}
            sx={{
              marginTop: '52px',
            }}
          />
          <TextField
            id="password"
            label="비밀번호"
            type="password"
            className={styles.textField}
            sx={{
              marginTop: '12px',
            }}
          />
          <FormGroup className={styles.checkboxGroup}>
            <FormControlLabel
              className={styles.checkboxLabel}
              control={<Checkbox className={styles.checkbox} />}
              label="자동로그인"
            />
          </FormGroup>

          <Button type="submit" variant="contained" className={styles.button}>
            로그인
          </Button>
        </Box>
      </Container>
    </div>
  )
}

export default SignIn;
