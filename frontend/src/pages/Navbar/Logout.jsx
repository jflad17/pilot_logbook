import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [token, setToken] =React.useState(null);
  React.useEffect(() => {
    const userString = localStorage.getItem('user');
    const tokenString = localStorage.getItem('token');
    setUser(userString);
    setToken(tokenString);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };
  if (token !== null && user !== null) {
    return (
      <span><props.component to="/" onClick={logout} {...props}>Logout</props.component></span>
    );
  } else {
    return;
  }
};

export default Logout;
