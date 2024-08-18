import { ErrorType } from '@/shared/api/api-instance';
import { authControllerVerifyCode } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

export const useVerifyCode = () => {
  const {
    mutate: sendVerifyCode,
    isPending: isPendingVerifyCode,
    isSuccess: isSuccessVerifyCode,
  } = useMutation({
    mutationFn: authControllerVerifyCode,
    onError: (error) => {
      const axiosError = error as ErrorType<{ message: string }>;
      message.error(axiosError.response?.data?.message || error.message);
    },
  });

  return { sendVerifyCode, isPendingVerifyCode, isSuccessVerifyCode };
};
