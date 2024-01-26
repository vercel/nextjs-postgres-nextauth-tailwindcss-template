import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import styles from '@/app/(AuthorizedLayout)/_components/container/listContainer.module.css'
import { Box, Container } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  queryClient: QueryClient,
  children: ReactNode
}

const ListContainer = ({
  queryClient,
  children,
}: Props) => {
  const dehydratedState = dehydrate(queryClient)
  return (
    <Container className={styles.container}>
      <Box mt={3}>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </Box>
    </Container>
  )
}

export default ListContainer
