import React, { ReactNode, useState } from 'react'
import { Box, Card, CardContent, Icon, Modal, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  cardHeading?: string | ReactNode;
  headTitle?: string | ReactNode;
  headSubtitle?: string | ReactNode;
  children?: ReactNode;
  middleContent?: string | ReactNode;
  className?: string;
  handleClose: () => void
};

const DashboardCard = ({
 title,
 subtitle,
 children,
 footer,
 cardHeading,
 headTitle,
 headSubtitle,
 middleContent,
 className,
 handleClose
}: Props) => {
  return (
    <Modal open={true} onClose={handleClose}>
      <Card sx={{ padding: 0 }} elevation={9} variant={undefined} className={className}>
        {cardHeading ? (
          <CardContent>
            <Typography variant="h5">{headTitle}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {headSubtitle}
            </Typography>
          </CardContent>
        ) : (
          <CardContent sx={{ p: "30px" }}>
            {title ? (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems={"center"}
                mb={3}
              >
                <Box>
                  {title ? <Typography variant="h5">{title}</Typography> : ""}
                  {subtitle ? (
                    <Typography variant="subtitle1" color="textSecondary">
                      {subtitle}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
                <CloseIcon onClick={handleClose} />
              </Stack>
            ) : null}
            {children}
          </CardContent>
        )}
        {middleContent}
        {footer}
      </Card>
    </Modal>
  );
};

export default DashboardCard;
