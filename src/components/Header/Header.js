import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../images/DevTimeManagerLogo.png';
import Logout from '../GoogleButton/Logout';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';

Axios.defaults.withCredentials = true

// Should be in env file
const clientId = "985770492377-a2nlp1h94mi7s7v861khiturmfqs9gsm.apps.googleusercontent.com";

function Header() {
  const createImage = (src) => {
    const image = new Image(50, 50);
    image.referrerPolicy = "no-referrer"
    image.src = src;
    return image;
  }

  const [loginData, setLoginData] = useState(
    localStorage.getItem("isLoggedin")
    ? JSON.parse(localStorage.getItem('isLoggedin'))
    : null
  );
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem("imageUrl") !== null
    ? createImage(localStorage.getItem("imageUrl"))
    : null
  )

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "openid email profile https://www.googleapis.com/auth/calendar",
      })
    }
    gapi.load('client:auth2', start);
  });


  var Login = () => {
    const onSuccess = (res) => {
        localStorage.setItem("isLoggedin", true);
        setLoginData("true");
        Axios.post('http://localhost:3001/api/create_tokens', res).then((response) => {
            const decoded = jwt_decode(response.data.id_token);
            setLoginData("true");
            setImageUrl(createImage(decoded.picture));
            localStorage.setItem("imageUrl", decoded.picture);
            localStorage.setItem("email", decoded.email);
        }).catch((err) => {
            console.log(err.message);
            localStorage.setItem("isLoggedin", false);
        })
    }

    return (
        <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={(res) => {console.log("Log in failed", res)}}
            buttonText={"Login"}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            // Refresh Token
            responseType='code'
            accessType='offline'
            scope='openid email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
        />
    )
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: '#ffff'}}>
        <Toolbar>
          <img src={logo} width="50px"></img>
          <Typography id='title' variant="h4" component="div" sx={{ flexGrow: 1 }} color="black">
            DEV TIME MANAGER
          </Typography>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar src={imageUrl.src}/>
          </IconButton>
          <Menu
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            keepMounted
            sx={{ mt: '45px'}}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              {
                loginData ?
                <Logout></Logout> :
                <Login></Login>
              }
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;