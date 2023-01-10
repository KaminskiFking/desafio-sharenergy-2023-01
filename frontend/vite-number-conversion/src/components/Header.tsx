import { ThemeProvider, Typography, createTheme, Box, Toolbar, Button, IconButton, Menu, Table } from '@mui/material';
import { useEffect, useState} from "react";
import { Link, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';


const theme = createTheme({
  palette: {
    primary: {
      main: '#fbf8cc',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#354f52',
    },
  },
});


function Header() {

  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleBar = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  
  return (
      <Box sx={{ width: '100%', }} >
        <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={handleBar}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <ThemeProvider theme={ theme }>
          <Typography variant="h1" component="div"

           sx={{ display: 'flex', paddingRight: 180, gap: 4}}>
            <Link className='link' to="/Home/cat"><Typography variant="h5" color="primary" component="h1">
           Cats
            </Typography>
            </Link>
            <Link className='link' to="/Home/dog"><Typography variant="h5" color="primary" component="h1">
             Dogs
            </Typography></Link>
            <Link className='link' to="/Home/clients"><Typography variant="h5" color="primary" component="h1">
             Clients
              </Typography></Link>
          </Typography>
          </ThemeProvider>
          <img  style={{width: 100, marginLeft: -50 }} src='https://raw.githubusercontent.com/KaminskiFking/KaminskiFking.github.io/main/logo_color.min-01-01.png'></img>
          <Button sx={{ width: '100%'}} onClick={handleLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <Drawer
      PaperProps ={{
        elevation:8, 
        sx: {
        width: 150,
        backgroundColor: "#354f52"
        }
        }}
      anchor='left'
      open={open}
      onClick={handleClose}
      >
      <Link style={{ textDecoration: 'none', marginLeft: 10 }} to="/Home"><Typography variant="h5" color="white" component="h1">
             Home
         </Typography>
            </Link>
        </Drawer>
    </Box>
    
  );
}

export default Header;