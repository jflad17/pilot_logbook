import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import queryClient from '@services/queryClient';
import './App.css';

import ChildRoutes from './ChildRoutes';

/**
 *
 * @return {Component} App Component
 */
const App = () => {
  React.useEffect(() => {
    document.body.style.backgroundColor = 'white';
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
