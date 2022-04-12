import { React } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

import ChildRoutes from './ChildRoutes';

export const queryClient = new QueryClient();
/**
 *
 * @return {Component} App Component
 */
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ChildRoutes/>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
