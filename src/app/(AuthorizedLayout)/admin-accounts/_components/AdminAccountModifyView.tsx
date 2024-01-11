'use client'

import React, { useState } from 'react'
import { Button, Modal, Stack } from '@mui/material'
import BaseCard from '@/component/BaseCard'
import styles from './adminAccountModify.module.css'
import BaseTextField, { TextFieldState } from '@/component/BaseTextField'

type Props = {
  id: string;
  open: boolean;
}

type AdminAccountModifyState = {
  id: string;
  name: TextFieldState;
  phoneNumber: TextFieldState;
  isValidated: boolean;
}

const AdminAccountModifyView = (
  { id, open }: Props,
) => {
  const [modifyData] = useState<AdminAccountModifyState>({
    id: id,
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
        subtitle={`ID : ${modifyData.id}`}
        className={styles.baseCard}
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
            <BaseTextField
              id="name"
              label="이름"
              state={modifyData.name}
              onChange={onChangeName}
            />
            <BaseTextField
              id="phoneNumber"
              label="연락처"
              type="tel"
              state={modifyData.phoneNumber}
              onChange={onChangePhoneNumber}
            />
          </Stack>
        </>
      </BaseCard>
    </Modal>
  )
}

export default AdminAccountModifyView
