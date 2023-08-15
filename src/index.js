import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from './providers/UserProvider';
import { store } from './utils/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
        <UserProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </UserProvider>
      </QueryClientProvider>
  </Provider>
);
