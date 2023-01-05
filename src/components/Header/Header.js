import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../images/DevTimeManagerLogo.png';
import Login from '../GoogleButton/Login';
import { IconButton, Avatar } from '@mui/material';

const handleOpenUserMenu = () => {
  
}

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#ffff' }}>
        <Toolbar>
          <img src={logo} width="50px"></img>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} color="black">
            DEV TIME MANAGER
          </Typography>
          <Login></Login>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar></Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;