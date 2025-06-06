import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard Công ty
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/create')}>Create</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;