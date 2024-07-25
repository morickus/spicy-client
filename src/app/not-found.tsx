'use client';

import Header from '@/features/header/ui/Header';
import styled from '@emotion/styled';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <Header />
      <Content>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <LinkStyled href="/">Go Home</LinkStyled>
      </Content>
    </div>
  );
}

const Content = styled.div`
  gap: 20px;
  display: flex;
  margin: 100px auto;
  align-items: center;
  flex-direction: column;
`;

const LinkStyled = styled(Link)`
  color: var(--acent-primary-color);
`;
