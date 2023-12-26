'use client';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from '@mui/material'
import BaseCard from '@/app/(DashboardLayout)/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Forms = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Form Layout">
            <>
            <Stack spacing={3}>
              <TextField
                id="name-basic"
                label="Name"
                variant="outlined"
                defaultValue="Nirav Joshi"
              />
              <TextField id="email-basic" label="Email" variant="outlined" />
              <TextField
                id="pass-basic"
                label="Password"
                type="password"
                variant="outlined"
              />
              <TextField
                id="outlined-multiline-static"
                label="Text Area"
                multiline
                rows={4}
                defaultValue="Default Value"
              />
              <TextField
                error
                id="er-basic"
                label="Error"
                defaultValue="ad1avi"
                variant="outlined"
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Terms & Condition"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Disabled"
                />
              </FormGroup>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <br />
            <Button>
              Submit
            </Button>
            </>
          </BaseCard>
        </Grid>
  
        <Grid item xs={12} lg={12}>
          <BaseCard title="Form Design Type">
            <Stack spacing={3} direction="row">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
              />
            </Stack>
          </BaseCard>
        </Grid>
      </Grid>
    );
  };
  
  export default Forms;