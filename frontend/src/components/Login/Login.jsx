import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken, fetchToken } from '../../Auth';
import './Login.css';
import {
  // createTheme,
  Switch,
  Box,
  TextField,
  // ThemeProvider,
  Container,
  CssBaseline,
  Button,
  Typography,
} from '@material-ui/core';

/**
 *
 * @return {Component} Login Component
 */
// const theme = createTheme();
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  React.useEffect(() => {
    if (fetchToken()) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((username === '') & (password === '')) {
      return;
    } else {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('rememberMe', rememberMe);
      console.log(formData);
      axios.post(`/token/`, formData)
          .then((response) => {
            console.log(response);
            if (response.data.access_token) {
              setToken(response.data.access_token, response.data.user);
              setUsername('');
              setPassword('');
              navigate('/home');
            }
          }).catch((error) => {
            console.error('error', error);
            throw error;
          });
    }
  };

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Container className="login-form" maxWidth="sm">
        <CssBaseline />
        <Box
          className='login-bg'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
                Sign In
          </Typography>
          <Box component="form" style={{ opacity: '100%!important' }} onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="text"
              autoComplete="username"
              autoFocus
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
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Switch
              label="Remember Me"
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
};

export default Login;
