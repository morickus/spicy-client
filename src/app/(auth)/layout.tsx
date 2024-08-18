import Header from '@/features/header/ui/Header';
import { styled } from '@linaria/react';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

const Content = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  padding: 0 30px;
  max-width: 540px;
`;
