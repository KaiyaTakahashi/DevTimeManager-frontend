import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../images/DevTimeManagerLogo.png';
import Login from '../GoogleButton/Login';
import Logout from '../GoogleButton/Logout';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useState } from 'react';

const clientId = "985770492377-a2nlp1h94mi7s7v861khiturmfqs9gsm.apps.googleusercontent.com";

function Header() {

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#ffff' }}>
        <Toolbar>
          <img src={logo} width="50px"></img>
          <Typography id='title' variant="h4" component="div" sx={{ flexGrow: 1 }} color="black">
            DEV TIME MANAGER
          </Typography>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar src={localStorage.getItem("imageUrl")}/>
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
                localStorage.getItem("isLoggedin") === "true" ?
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