import Header from '@/features/header/ui/Header';
import Sider from '@/features/sider/ui/Sider';
import { categoriesControllerFindAll } from '@/shared/api/generated';
import { styled } from '@linaria/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesControllerFindAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Header />
        <Body>
          <Sider />
          <Content>{children}</Content>
        </Body>
      </div>
    </HydrationBoundary>
  );
}

const Body = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 30px 30px 110px;
  max-width: var(--max-width);

  @media (max-width: 768px) {
    padding: 30px 0 100px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  padding: 0 20px;
  max-width: 960px;
  justify-content: center;
`;
