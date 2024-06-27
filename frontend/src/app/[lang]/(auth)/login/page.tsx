'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import SignInModule from '@/app/modules/login/SignInModule';
import React from 'react';

const SignInPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SignInModule />
    </QueryClientProvider>
  );
};

export default SignInPage;
