import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import queryClient from '@services/queryClient';
import bg from './images/sky.jpg';
import './App.css';

import ChildRoutes from './ChildRoutes';

/**
 *
 * @return {Component} App Component
 */
const App = () => {
  React.useEffect(() => {
    document.body.style.backgroundImage = `url('${bg}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ChildRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
