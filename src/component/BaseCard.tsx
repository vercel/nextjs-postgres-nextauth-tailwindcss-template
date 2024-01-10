import React, { ReactNode } from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

type Props = {
  title?: string;
  subtitle?: string;
  action?: ReactNode | any;
  footer?: ReactNode;
  cardHeading?: string | ReactNode;
  headTitle?: string | ReactNode;
  headSubtitle?: string | ReactNode;
  children?: ReactNode;
  middleContent?: string | ReactNode;
};

const DashboardCard = ({
 title,
 subtitle,
 children,
 action,
 footer,
 cardHeading,
 headTitle,
 headSubtitle,
 middleContent,
}: Props) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardHeading ? (
        <CardContent>
          <Typography variant="h4">{headTitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
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
                {title ? <Typography variant="h4">{title}</Typography> : ""}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}
          {children}
        </CardContent>
      )}
      {middleContent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
