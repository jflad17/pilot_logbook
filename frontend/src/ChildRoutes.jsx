import React from 'react';
import { RequireToken } from './Auth';
// import { useNavigate } from 'react-router-dom';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '@pages/Navbar/Navbar';
import Page404 from '@pages/Page404/Page404';
import Import from '@pages/Imports/Import';
import FlightTable from '@pages/FlightTable/FlightTable';
import Login from '@pages/Login/Login';
import Register from '@pages/Register/Register';
import Home from '@pages/Home/Home';
import Reports from '@pages/Reports/Reports';

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
        <Route exact path='/register' element={<RequireToken><Register /></RequireToken>} />
        <Route path='/home' element={<RequireToken><Home /></RequireToken>} />
        <Route path='/import' element={<RequireToken><Import /></RequireToken>} />
        <Route path='/flight-table' element={<RequireToken><FlightTable /></RequireToken>} />
        <Route path='/reports' element={<RequireToken><Reports /></RequireToken>} />
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </>
  );
};

export default ChildRoutes;
