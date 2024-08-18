import { ErrorType } from '@/shared/api/api-instance';
import { authControllerSendCode } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

export const useSendCode = () => {
  const {
    mutate: sendCode,
    isPending: isPendingSendCode,
    isSuccess: isSuccessSendCode,
  } = useMutation({
    mutationFn: authControllerSendCode,
    onMutate: () => {
      const hide = message.loading('Processing...', 0);
      return { hide };
    },
    onSettled: (data, error, variables, context) => {
      if (context?.hide) context.hide();
    },
    onSuccess: () => {
      message.success('send code successfully');
    },
    onError: (error) => {
      const axiosError = error as ErrorType<{ message: string }>;
      message.error(axiosError.response?.data?.message || error.message);
    },
  });

  return { sendCode, isPendingSendCode, isSuccessSendCode };
};
