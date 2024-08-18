'use client';

import { authControllerGetSessionInfo } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Avatar } from 'antd';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const { data } = useQuery({
    queryKey: ['session'],
    queryFn: () => authControllerGetSessionInfo(),
  });

  return (
    <Root>
      <Container>
        <Logo href="/">spicy.pub</Logo>
        {data ? (
          <Avatar src="/avatar.png" shape="square" />
        ) : (
          <FlexLink href={ROUTES.AUTH.SIGN_UP}>
            <LogIn size={20} />
          </FlexLink>
        )}
      </Container>
    </Root>
  );
};

const Root = styled.header`
  z-index: 1;
  width: 100%;
  background: var(--dark-secondary-color);
  border-bottom: 1px solid var(--dark-average-color);

  @media (min-width: 769px) {
    top: 0;
    position: sticky;
  }
`;

const Container = styled.div`
  height: 55px;
  display: flex;
  margin: 0 auto;
  padding: 0 30px;
  align-items: center;
  max-width: var(--max-width);
  justify-content: space-between;

  @media (max-width: 768px) {
    height: 75px;
  }
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`;

const FlexLink = styled(Link)`
  display: flex;
  color: #6fff2b;
`;

export default Header;
