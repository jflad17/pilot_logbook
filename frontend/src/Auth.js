import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Navigate } from 'react-router-dom';

export const setToken = (token, user) => {
  localStorage.setItem('user', user);
  localStorage.setItem('token', token);
};

export const fetchToken = () => {
  return localStorage.getItem('token');
};

export const fetchUser = () => {
  return localStorage.getItem('user');
};

/**
 * Adds two numbers together.
 * @param {props} children Children props.
 * @return {navigate | children} navigate or children.
 */
export function RequireToken({ children }) {
  const auth = fetchToken();
  const location = useLocation();
  if (!auth) {
    return <Navigate to='/' state={{ from: location }}/>;
  }
  return children;
}

RequireToken.propTypes = {
  children: PropTypes.node.isRequired,
};
