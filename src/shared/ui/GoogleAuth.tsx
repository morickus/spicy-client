import { ErrorType } from '@/shared/api/api-instance';
import { authControllerGoogleAuth } from '@/shared/api/generated';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const GoogleAuth = () => {
  const router = useRouter();

  const googleAuthMutation = useMutation({
    mutationFn: (code: string) => authControllerGoogleAuth({ code }),
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      const axiosError = error as ErrorType<{ message: string }>;
      message.error(axiosError.response?.data?.message || error.message);
    },
  });

  const login = useGoogleLogin({
    onSuccess: ({ code }) => googleAuthMutation.mutate(code),
    onError: () => {
      message.error('Login Failed');
    },
    flow: 'auth-code',
  });

  return (
    <Button block size="large" onClick={() => login()}>
      Continue with Google
    </Button>
  );
};

export default GoogleAuth;
