'use client';
import SignUpModule from '@/app/modules/sign-up/SignUpModule';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const SignUpPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <SignUpModule step={true} />
    </QueryClientProvider>
  );
};

export default SignUpPage;
