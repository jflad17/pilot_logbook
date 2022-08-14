import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '@images/logo.png';
import bg from '@images/sky.jpg';
import { setToken, fetchToken } from '../../Auth';
import './Login.css';
import {
  // createTheme,
  styled,
  Switch,
  Box,
  TextField,
  // ThemeProvider,
  Container,
  CssBaseline,
  Button,
  Typography,
} from '@mui/material';


const LogoBox = styled(Typography)({
  flexGrow: '4', cursor: 'pointer',
});
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
    document.body.style.backgroundImage = `url('${bg}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    if (fetchToken()) {
      navigate('/home');
    }
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundColor = 'white';
    };
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
      axios.post(`/token/`, formData)
          .then((response) => {
            if (response.data.access_token) {
              setToken(response.data.access_token, response.data.user);
              setUsername('');
              setPassword('');
              navigate('/home');
              toast.success(`Welcome, ${response.data.user.firstName}`);
            }
          }).catch((error) => {
            toast.error('Error logging in!');
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
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <LogoBox variant="h4">
            <img width="35px" height="35px"
              className="d-inline-block align-top img-responsive" src={Logo} alt="logo"/>
            {' '}
            Pilot Logbook
          </LogoBox>
          <Typography variant="h5">
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
              sx={{ mt: 3, mb: 2, opacity: 100 }}
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
