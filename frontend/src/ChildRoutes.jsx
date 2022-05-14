import React from 'react';
import { RequireToken } from './Auth';
// import { useNavigate } from 'react-router-dom';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Page404 from './components/Page404/Page404';
import SkywestImport from './components/Imports/SkywestImport';
import FlightTable from './components/FlightTable/FlightTable';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';

/**
 * Routes for all page components
 * @return {JSX}
 */

const ChildRoutes = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/' && <Navbar /> }
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/skywest-import' element={<RequireToken><SkywestImport /></RequireToken>} />
        <Route path='/flight-table' element={<RequireToken><FlightTable /></RequireToken>} />
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </>
  );
};

export default ChildRoutes;
