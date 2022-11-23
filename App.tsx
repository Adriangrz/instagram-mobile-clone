import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/screens/RootNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
