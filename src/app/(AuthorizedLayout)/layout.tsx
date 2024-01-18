"use client"

import { ReactNode } from 'react'
import styles from './layout.module.css'
import { Box, Container } from '@mui/material'
import Footer from './_components/layout/Footer'
import Sidebar from './_components/layout/sidebar/Sidebar'
import Header from './_components/layout/header/Header'
import ReactQueryProvider from '@/app/(AuthorizedLayout)/_components/provider/ReactQueryProvider'

type Props = {
  children: ReactNode;
  modal: ReactNode;
}
const AuthorizedLayout = ({ children, modal }: Props) => {
  return (
    <>
      <div className={`${styles.wrapper} mainwrapper`}>
        <ReactQueryProvider>
          {/* ------------------------------------------- */}
          {/* Sidebar */}
          {/* ------------------------------------------- */}
          <Sidebar />
          {/* ------------------------------------------- */}
          {/* Main Wrapper */}
          {/* ------------------------------------------- */}
          <div className={`${styles.page} page-wrapper`}>
            {/* ------------------------------------------- */}
            {/* Header */}
            {/* ------------------------------------------- */}
            <Header />
            {/* ------------------------------------------- */}
            {/* PageContent */}
            {/* ------------------------------------------- */}
            <Container
              sx={{
                paddingTop: '20px',
                maxWidth: '1200px',
              }}
            >
              {/* ------------------------------------------- */}
              {/* Page Route */}
              {/* ------------------------------------------- */}
              <Box sx={{ minHeight: 'calc(100dvh - 170px)' }}>{children}</Box>
              {/* ------------------------------------------- */}
              {/* End Page */}
              {/* ------------------------------------------- */}
              {/* ------------------------------------------- */}
              {/* Footer */}
              {/* ------------------------------------------- */}
              <Footer />
            </Container>
          </div>
          {modal}
        </ReactQueryProvider>
      </div>
    </>
  )
}

export default AuthorizedLayout
