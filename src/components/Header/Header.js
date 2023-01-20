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
  const [name, setName] = useState(
    localStorage.getItem("name") ?
    localStorage.getItem("name"):
    "user"
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
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "openid email profile https://www.googleapis.com/auth/calendar",
      })
    }
    gapi.load('client:auth2', start);
  });


  var Login = () => {
    const onSuccess = (res) => {
        localStorage.setItem("isLoggedin", true);
        Axios.post('/users/insert', res).then((response) => {
            const decoded = jwt_decode(response.data.id_token);
            setLoginData("true");
            setImageUrl(createImage(decoded.picture));
            setName(decoded.given_name);
            localStorage.setItem("imageUrl", decoded.picture);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("name", decoded.given_name);
            window.location.reload();
        }).catch((err) => {
            console.log(err.message);
            localStorage.setItem("isLoggedin", false);
        })
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
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
          <img src={logo} width="50px" id='logo'></img>
          <Typography id='title' variant="h4" component="div" sx={{ flexGrow: 1 }} color="black" onClick={() => { window.location.reload() }} style={{ cursor: "pointer" }}>
            DEV TIME MANAGER
          </Typography>
          <Typography id='hello-user' color='black' style={{ marginRight: "10px" }}>
            Hello, { name }
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