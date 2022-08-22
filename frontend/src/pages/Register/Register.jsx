import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  object,
  string,
  ref,
} from 'yup';
import {
  // createTheme,
  Box,
  Paper,
  // TextField,
  // ThemeProvider,
  Container,
  CssBaseline,
  Button,
  Typography,
} from '@mui/material';
import './Register.css';
import { useCreateUser } from '@api/user';
import { Input } from '@components/Form';
import useYupResolver from '@services/useYupResolver';

/**
 *
 * @return {Component} Login Component
 */

const Register = () => {
  const createUserMutate = useCreateUser();

  const defaultValues = React.useMemo(() => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }, []);

  const validationSchema = object().shape({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().email().required('Email is required'),
    username: string().required('Username is required'),
    password: string().required('Password is required'),
    confirmPassword: string().oneOf([ref('password'), null], 'Passwords must match'),
  });

  const resolver = useYupResolver(validationSchema);

  const { control, handleSubmit, reset } = useForm({
    resolver,
    defaultValues,
    shouldUnregister: false,
  });

  const onSubmitHandler = async (data) => {
    if (data.password === data.confirmPassword) {
      const newUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
      };
      createUserMutate.mutateAsync(newUser)
          .then((data) => {
            if (!data.detail) {
              reset(defaultValues);
            } else {
              toast.error(data.detail);
            }
          });
    } else {
      toast.error('Passwords do not match!');
    }
  };

  return (
    <>
      <Container className="register-form" maxWidth="sm">
        <CssBaseline />
        <Paper
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
          <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 1 }}>
            <Input
              control={control}
              type="text"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
              fullWidth
              autoFocus
              required
            />
            <Input
              control={control}
              type="text"
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
              fullWidth
              required
            />
            <Input
              control={control}
              type="email"
              name="email"
              label="Email"
              autoComplete="email"
              fullWidth
              required
            />
            <Input
              control={control}
              type="text"
              name="username"
              label="Username"
              autoComplete="username"
              fullWidth
              required
            />
            <Input
              control={control}
              type="password"
              name="password"
              label="Password"
              autoComplete="new-password"
              fullWidth
              required
            />
            <Input
              control={control}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
              fullWidth
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              sx={{ mt: 3, mb: 2 }}
              // disabled={!validateForm()}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
