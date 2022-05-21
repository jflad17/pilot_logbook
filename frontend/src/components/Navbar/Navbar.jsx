import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png';
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

const useStyles = styled((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: 'flex',
  },
  logo: {
    flexGrow: '2',
    cursor: 'pointer',
  },
  link: {
    'textDecoration': 'none',
    'color': 'white',
    'fontSize': '20px',
    'marginRight': theme.spacing(20),
    '&:hover': {
      color: 'lightblue',
      borderBottom: '1px solid white',
    },
  },
}));

/**
 *
 * @return {Component} Navbar Component
 */
function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: 'dimgray' }}>
        <CssBaseline />
        <Toolbar>
          <Typography variant="h5" className={classes.logo}>
            <img width="35px" height="35px"
              className="d-inline-block align-top img-responsive" src={Logo} alt="logo"/>
            {' '}
            Pilot Logbook
          </Typography>
          {isMobile ? (
            <Drawer classes={classes}/>
          ) : (
            <div className={classes.navlinks}>
              <Link to="/home" className={classes.link}>
                Home
              </Link>
              <Link to="/skywest-import" className={classes.link}>
                Skywest Import
              </Link>
              <Link to="/flight-table" className={classes.link}>
                Flight Table
              </Link>
              <Link to="/register" className={classes.link}>
                Register
              </Link>
              <Logout className={classes.link} />
            </div>
      )}
        </Toolbar>
      </AppBar>

    </>
  );
}

export default Navbar;
