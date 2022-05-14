import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Container } from 'react-bootstrap';
import './Register.css';

/**
 *
 * @return {Component} Login Component
 */

const Register = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((username === '') & (password === '') & (confirmPassword === '')) {
      return;
    } else {
      if (password === confirmPassword) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        axios.post(`/register/`, formData)
            .then((response) => {
              console.log(response);
              if (response.data.access_token) {
                setToken(response.data.access_token);
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
              console.error('error', error);
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
    return username.length > 0 && firstName.length > 0 &&
     lastName.length > 0 && password.length > 0 && confirmPassword.length > 0;
  };

  return (
    <>
      <Container className="register-form">
        <div className="p-2 mb-6 bg-light rounded-4 opacity-80">
          <div className="container-fluid py-2">
            <Form onSubmit={handleSubmit}>
              <h3>Register</h3>
              <p style={{ color: 'red' }}>* All fields are required</p>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  autoComplete="firstName"
                  autoFocus
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  autoComplete="lastName"
                  autoFocus
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoComplete="username"
                  autoFocus
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoComplete='current-password'
                  autoFocus
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  autoComplete='confirm-password'
                  autoFocus
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!validateForm()}>Register</Button>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
