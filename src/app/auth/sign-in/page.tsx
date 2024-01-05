'use client'

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
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useRef } from 'react'

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw',
}))

const LoginContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const LoginForm = styled((props: Theme | any) => (
  <Box component="form" method="POST" autoComplete="off" {...props} />
))<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}))

const LoginTextField = styled(TextField)({
  width: '100%',
  '& label.Mui-focused': {
    color: '#000',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    borderColor: '#000',
    '&:hover fieldset': {
      borderColor: '#F80069',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F80069',
    },
  },
})

const AutoLoginFormGroup = styled(FormGroup)(() => ({
  width: '100%',
  marginTop: '16px',
}))

const AutoLoginFormControlLabel = styled(FormControlLabel)(() => ({
  color: '#444',
  fontSize: '13px',
  fontWeight: '400',
  lineHeight: '16px',
}))

const AutoLoginCheckbox = styled(Checkbox)(() => ({
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
  '&.Mui-checked': {
    color: '#FF4D83',
  },
}))

const LoginButton = styled(Button)(() => ({
  width: '100%',
  height: '50px',
  marginTop: '24px',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '18px',
  '&.MuiButton-contained': {
    backgroundColor: '#F80069',
    color: '#D5FF2E',
    borderRadius: '12px',
  },
}))

const SignIn = () => {
  const router = useRouter()
  const { data: session } = useSession()
  if (session != null) {
    router.push('/')
  }

  const idRef = useRef('')
  const passwordRef = useRef('')

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = idRef.current
    const password = passwordRef.current
    const response = await signIn('credentials', {
      id,
      password,
      redirect: false,
      callbackUrl,
    })

    if (!response?.error) {
      router.push(callbackUrl)
    }
  }

  return (
    <MainWrapper>
      <LoginContainer maxWidth="xs">
        <LoginForm onSubmit={handleSubmit}>
          <Image
            src="/images/logos/login-logo.svg"
            alt="login-logo"
            width={208}
            height={120}
            priority
          />
          <LoginTextField
            id="id"
            inputRef={idRef}
            label="아이디"
            sx={{
              marginTop: '52px',
            }}
          />
          <LoginTextField
            id="password"
            inputRef={passwordRef}
            label="비밀번호"
            type="password"
            sx={{
              marginTop: '12px',
            }}
          />
          <AutoLoginFormGroup>
            <AutoLoginFormControlLabel
              control={<AutoLoginCheckbox />}
              label="자동로그인"
            />
          </AutoLoginFormGroup>

          <LoginButton type="submit" variant="contained">
            로그인
          </LoginButton>
        </LoginForm>
      </LoginContainer>
    </MainWrapper>
  )
}

export default SignIn
