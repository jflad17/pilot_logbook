import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  ListItemText,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Logo from '@images/logo.png';
import Logout from './Logout';

// const NavLinks = styled('div')(({ theme }) => ({
//   marginLeft: theme.spacing(5),
//   display: 'flex',
// }));


const NavLink = styled(Link)(({ theme }) => ({
  'textDecoration': 'none',
  'color': 'white',
  'fontSize': '20px',
  'paddingRight': theme.spacing(20),
  '&:hover': {
    color: 'lightblue',
    borderBottom: '1px solid white',
  },
}));

const LogoBox = styled(Typography)({
  cursor: 'pointer', color: 'white',
});

/**
 *
 * @return {Component} Navbar Component
 */
function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} edge="start">
        <MenuIcon />
      </IconButton>
      <Drawer
        style={{ width: '220px' }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ sx: { background: 'dimgrey' } }}
      >
        <LogoBox variant='h4'>
          <NavLink to="/home"><img width="300px" height="175px"
            className="d-inline-block align-top img-responsive" src={Logo} alt="logo"/>
          {/* {' '}
            Pilot Logbook */}
          </NavLink>
        </LogoBox>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NavLink to="/home">Home</NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NavLink to="/import">Import</NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NavLink to="/flight-table">Flight Table</NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NavLink to="/reports">Reports</NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <NavLink to="/register">Register</NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Logout component={NavLink} />
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>

    </>
  );
}
export default DrawerComponent;
