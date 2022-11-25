import React from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// Need to install icon-material
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from "react";
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleLogout} from 'react-google-login';
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©'}
      <Link color="inherit" href="https://mui.com">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme();

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  } ;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "252537839800-gisn0d87ekkklurcq00ucglil44tmmpm.apps.googleusercontent.com",
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Box>
          <GoogleLogin
            clientId="252537839800-gisn0d87ekkklurcq00ucglil44tmmpm.apps.googleusercontent.com"
            onSuccess={(res) => {console.log("Log in successfull", res.profileObj)}}
            onFailure={(res) => {console.log("Log in failed", res)}}
            buttonText={"Login"}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
          <GoogleLogout
            clientId="252537839800-gisn0d87ekkklurcq00ucglil44tmmpm.apps.googleusercontent.com"
            onLogoutSuccess={() => {console.log("Log out successfull")}}
            buttonText={"Logout"}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;