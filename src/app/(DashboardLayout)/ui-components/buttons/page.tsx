'use client';
import {
  Paper, Grid,
  Button,
  Box,
  Stack,
  IconButton,
  Fab,
  ButtonGroup,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { IconHome, IconTrash, IconUser } from '@tabler/icons-react';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Buttons = () => {
  return (
    <PageContainer title="button" description="this is button">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <BaseCard title="Color Buttons">
            <Stack spacing={2} direction="row">
              <Button variant="contained" color="primary">
                Contained
              </Button>
              <Button variant="contained" color="error">
                Contained
              </Button>
              <Button variant="contained" color="secondary">
                Contained
              </Button>
              <Button variant="contained" color="success">
                Contained
              </Button>
              <Button variant="contained" color="warning">
                Contained
              </Button>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6} >
          <BaseCard title="Text Buttons">
            <Stack spacing={2} direction="row">
              <Button variant="text" color="primary">Text</Button>
              <Button variant="text" color="error">Text</Button>
              <Button variant="text" color="secondary">Text</Button>
              <Button variant="text" color="success">Text</Button>
              <Button variant="text" color="warning">Text</Button>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6} >
          <BaseCard title="Outline Buttons">
            <Stack spacing={2} direction="row">
              <Button variant="outlined" color="primary">
                outlined
              </Button>
              <Button variant="outlined" color="error">
                outlined
              </Button>
              <Button variant="outlined" color="secondary">
                outlined
              </Button>
              <Button variant="outlined" color="success">
                outlined
              </Button>
              <Button variant="outlined" color="warning">
                outlined
              </Button>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6} >
          <BaseCard title="Size Buttons">
            <Box sx={{ "& button": { mx: 1 } }}>
              <Button color="primary" size="small" variant="contained">
                small
              </Button>
              <Button color="error" size="medium" variant="contained">
                medium
              </Button>
              <Button color="secondary" size="large" variant="contained">
                large
              </Button>
            </Box>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6} >
          <BaseCard title="Icon Buttons">
            <Stack spacing={2} direction="row">
              <IconButton aria-label="delete" color="success">
                <IconHome />
              </IconButton>
              <IconButton aria-label="delete" color="error">
                <IconTrash />
              </IconButton>
              <IconButton aria-label="user" color="warning">
                <IconUser />
              </IconButton>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <BaseCard title="Fab Buttons">
            <Stack spacing={2} direction="row">
              <Fab color="primary" aria-label="add">
                <IconHome />
              </Fab>
              <Fab color="secondary" aria-label="add">
                <IconTrash />
              </Fab>
              <Fab color="secondary" disabled aria-label="add">
                <IconUser />
              </Fab>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <BaseCard title="Group Buttons">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <BaseCard title="Group Outline Buttons">
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </BaseCard>
        </Grid>
      </Grid>

    </PageContainer>
  );
};

export default Buttons;
