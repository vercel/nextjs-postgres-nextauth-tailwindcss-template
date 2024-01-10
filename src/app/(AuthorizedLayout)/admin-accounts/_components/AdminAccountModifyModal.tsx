"use client"

import React, { useState } from 'react'
import { Button, Modal, Stack, TextField, Typography } from '@mui/material'
import BaseCard from '@/component/BaseCard'
import { TextFieldState } from 'thunder-order'

type Props = {
  open: boolean;
}

type AdminAccountModifyState = {
  id: string;
  name: TextFieldState;
  phoneNumber: TextFieldState;
  isValidated: boolean;
}

const AdminAccountModifyModal = ({ open }: Props) => {
  const [modifyData] = useState<AdminAccountModifyState>({
    id: '',
    name: {
      value: '',
      isError: false,
      errorMessage: ''
    },
    phoneNumber: {
      value: '',
      isError: false,
      errorMessage: ''
    },
    isValidated: false
  });

  const handleClose = () => {}
  const onSubmit = () => {}
  const onChangeName = () => {}
  const onChangePhoneNumber = () => {}
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BaseCard
        title="관리자 정보 수정"
        action={
          <Button
            variant="contained"
            color="primary"
            disabled={!modifyData.isValidated}
            onClick={() => onSubmit()}
          >
            등록하기
          </Button>
        }
      >
        <>
          <Stack spacing={3}>
            <Typography variant="h4">{modifyData.id}</Typography>

            <TextField
              id="name"
              label="이름"
              variant="outlined"
              value={modifyData.name.value}
              error={modifyData.name.isError}
              helperText={modifyData.name.errorMessage}
              onChange={onChangeName}
            />
            <TextField
              id="phoneNumber"
              label="연락처"
              type="tel"
              variant="outlined"
              value={modifyData.phoneNumber.value}
              error={modifyData.phoneNumber.isError}
              helperText={modifyData.phoneNumber.errorMessage}
              onChange={onChangePhoneNumber}
            />
          </Stack>
        </>
      </BaseCard>
    </Modal>
  )
}

export default AdminAccountModifyModal
