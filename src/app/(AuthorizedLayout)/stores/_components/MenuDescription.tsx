'use client'

import DOMPurify from 'dompurify'
import { Box } from '@mui/material'

const MenuDescription = ({ content }: { content: string }) => {
  const purify = DOMPurify()
  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: purify.sanitize(String(content)),
      }}
    />
  )
}

export default MenuDescription
