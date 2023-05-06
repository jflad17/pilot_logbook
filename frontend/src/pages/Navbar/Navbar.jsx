import React from 'react';
import { Link } from 'react-router-dom';

import HeaderLogo from '@images/headerLogo.png';
import Logout from './Logout';
// import { RequireToken } from '../../Auth';

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import Drawer from './Drawer';

const NavLinks = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(5),
  display: 'flex',
}));


const NavLink = styled(Link)(({ theme }) => ({
  'textDecoration': 'none',
  'color': 'white',
  'fontSize': '20px',
  'marginRight': theme.spacing(20),
  '&:hover': {
    color: 'lightblue',
    borderBottom: '1px solid white',
  },
}));

const LogoBox = styled(Typography)({
  flexGrow: '2', cursor: 'pointer',
});
/**
 *
 * @return {Component} Navbar Component
 */
function Navbar() {
  // const classes = useStyles();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: 'dimgray' }} sx={{ background: 'dimgrey' } }>
        <CssBaseline />
        <Toolbar>
          <LogoBox variant="h5">
            <NavLink to="/home"><img width="225px" height="40px"
              className="d-inline-block align-top img-responsive" src={HeaderLogo} alt="Header Logo"/>
            {/* {' '}
            Pilot Logbook */}
            </NavLink>
          </LogoBox>
          {isMobile ? (
            <Drawer />
          ) : (
          <NavLinks>
            <NavLink to="/home">
                Home
            </NavLink>
            <NavLink to="/import">
                Import
            </NavLink>
            <NavLink to="/flight-table">
                Flight Table
            </NavLink>
            <NavLink to="/reports">
                Reports
            </NavLink>
            <NavLink to="/register">
                Register
            </NavLink>
            <Logout component={NavLink} />
          </NavLinks>
          )}
        </Toolbar>
      </AppBar>

    </>
  );
}

export default Navbar;
