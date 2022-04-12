import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopNav from './components/Navbar/Navbar';
import Page404 from './components/Page404/Page404';
import SkywestImport from './components/Imports/SkywestImport';
import LoginPage from './components/LoginPage/LoginPage';
import Home from './components/Home/Home';

/**
 * Routes for all page components
 * @returns {JSX}
 */

const ChildRoutes = () => {
  return (
    <>
      <TopNav/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/skywest-import' element={<SkywestImport />} />
        <Route element={<Page404 />}/>
      </Routes>
    </>
  );
};

export default ChildRoutes;
