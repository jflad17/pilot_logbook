import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  // createTheme,
  Box,
  TextField,
  // ThemeProvider,
  Container,
  CssBaseline,
  Button,
  Typography,
} from '@mui/material';
import './Register.css';

/**
 *
 * @return {Component} Login Component
 */

const Register = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((firstName === '') & (lastName === '') & (email === '') &
     (username === '') & (password === '') & (confirmPassword === '')) {
      toast.error('All fields required!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
      );
    } else {
      if (password === confirmPassword) {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        axios.post(`/register/`, formData)
            .then((response) => {
              console.log(response);
              if (response.data.access_token) {
                setToken(response.data.access_token);
                setFirstName('');
                setLastName('');
                setEmail('');
                setUsername('');
                setPassword('');
                toast.success('User created!', {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                },
                );
              }
            }).catch((error) => {
              console.error('Error creating user!');
              throw error;
            });
      } else {
        toast.error('Passwords do not match!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
        );
      }
    }
  };

  const validateForm = () => {
    return firstName.length > 0 && lastName.length > 0 && email.length > 0 && username.length > 0 &&
      password.length > 0 && confirmPassword.length > 0;
  };

  return (
    <>
      <Container className="register-form" maxWidth="sm">
        <CssBaseline />
        <Box
          className='register-bg'
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
                Register
          </Typography>
          <Box component="form" style={{ opacity: '100%!important' }} onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="text"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validateForm()}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
