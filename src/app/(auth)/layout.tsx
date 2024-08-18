import Header from '@/features/header/ui/Header';
import { styled } from '@linaria/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
        <Content>{children}</Content>
      </GoogleOAuthProvider>
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
