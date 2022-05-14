import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import bg from './images/sky.jpg';
import './App.css';

import ChildRoutes from './ChildRoutes';

export const queryClient = new QueryClient();
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
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ChildRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
