import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const useStyles = makeStyles((theme) => ({
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
    '&:hover': {
      color: 'lightblue',
      borderBottom: '1px solid white',
    },
  },
  paper: {
    background: 'dimgrey',
  },
}));

/**
 *
 * @return {Component} Navbar Component
 */
function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();

  return (
    <>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} edge="start">
        <MenuIcon />
      </IconButton>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/home" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/skywest-import" className={classes.link}>Skywest Import</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/flight-table" className={classes.link}>Flight Table</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/register" className={classes.link}>Register</Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Logout className={classes.link} />
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>

    </>
  );
}
export default DrawerComponent;
