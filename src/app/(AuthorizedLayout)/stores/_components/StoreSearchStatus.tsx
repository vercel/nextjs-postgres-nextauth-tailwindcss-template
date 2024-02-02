import React, { ChangeEvent } from 'react'
import styles from '@/app/(AuthorizedLayout)/stores/_components/storeList.module.css'
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { StoreSearchProps, StoreStatus } from '@/app/(AuthorizedLayout)/stores/_models/props'

const StoreSearchStatus = ({ pageParameters, setPageParameters }: StoreSearchProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const eventStatus = event.target.value as StoreStatus
    if (checked) {
      const slicedStatus: StoreStatus[] = pageParameters.statuses.slice()
      setPageParameters((prev) => ({
        ...prev,
        statuses: [...slicedStatus, eventStatus]
      }))
      return;
    }

    const filteredStatus: StoreStatus[] = pageParameters.statuses.filter((status) => status !== eventStatus)
    setPageParameters((prev) => ({
      ...prev,
      statuses: [...filteredStatus]
    }))
  }

  return (
    <Box className={styles.checkboxGroupContainer}>
      <Typography className={styles.checkboxGroupLabel}>
        진행상태
      </Typography>
      <FormGroup className={styles.checkboxGroup}>
        <FormControlLabel
          control={<Checkbox value={'NOT_DOCUMENTS_SUBMITTED'}
                             checked={pageParameters.statuses.includes('NOT_DOCUMENTS_SUBMITTED')}
                             onChange={handleChange} />}
          label="서류 미제출" />
        <FormControlLabel
          control={<Checkbox value={'NOT_BUSINESS_REGISTERED'}
                             checked={pageParameters.statuses.includes('NOT_BUSINESS_REGISTERED')}
                             onChange={handleChange}  />}
          label="사업자 미등록" />
        <FormControlLabel
          control={<Checkbox value={'NOT_MENU_REGISTERED'}
                             checked={pageParameters.statuses.includes('NOT_MENU_REGISTERED')}
                             onChange={handleChange}  />}
          label="메뉴 미등록" />
        <FormControlLabel
          control={<Checkbox value={'EXPIRED_HEALTH_CERTIFICATE'}
                             checked={pageParameters.statuses.includes('EXPIRED_HEALTH_CERTIFICATE')}
                             onChange={handleChange} />}
          label="보건증 만기" />
      </FormGroup>
    </Box>
  )
}

export default StoreSearchStatus
