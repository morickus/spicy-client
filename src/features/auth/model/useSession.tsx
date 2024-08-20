import { authControllerGetSessionInfo, authControllerSignOut } from '@/shared/api/generated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

export const useSession = () => {
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: () => authControllerGetSessionInfo(),
  });

  const { mutate: logout } = useMutation({
    mutationFn: authControllerSignOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return { session, logout };
};
