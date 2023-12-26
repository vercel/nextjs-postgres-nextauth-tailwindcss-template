'use client';
import {
    Paper,
    Grid,
    Stack,
    Alert,AlertTitle
} from '@mui/material'
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body1,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     height: 60,
//     lineHeight: '60px',
//   }));
  


const Alerts = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Alerts">
            <Stack spacing={2}>
              <Alert severity="error" >
                This is an error alert — check it out!
              </Alert>
              <Alert severity="warning">
                This is a warning alert — check it out!
              </Alert>
              <Alert severity="info">This is an info alert — check it out!</Alert>
              <Alert severity="success">
                This is a success alert — check it out!
              </Alert>
            </Stack>
          </BaseCard>
        </Grid> 
        <Grid item xs={12} lg={12}>
          <BaseCard title="Alerts Outline">
            <Stack spacing={2}>
              <Alert severity="error" variant="outlined">
                This is an error alert — check it out!
              </Alert>
              <Alert severity="warning" variant="outlined">
                This is a warning alert — check it out!
              </Alert>
              <Alert severity="info" variant="outlined">
                This is an info alert — check it out!
              </Alert>
              <Alert severity="success" variant="outlined">
                This is a success alert — check it out!
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Alert with Desc">
            <Stack spacing={2}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                This is an info alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
      </Grid>
    );
  };
  
  export default Alerts;
  