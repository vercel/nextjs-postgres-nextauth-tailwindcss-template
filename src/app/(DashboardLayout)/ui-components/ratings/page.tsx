'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material'
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';

export default function BasicRating() {
  const [value, setValue] = React.useState<number | null>(2);

  return (

    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Basic rating">
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Typography component="legend">Controlled</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Typography component="legend">Read only</Typography>
            <Rating name="read-only" value={value} readOnly />
            <Typography component="legend">Disabled</Typography>
            <Rating name="disabled" value={value} disabled />
            <Typography component="legend">No rating given</Typography>
            <Rating name="no-value" value={null} />
          </Box>

        </BaseCard>
      </Grid>
    </Grid>

  );
}