'use client';

import styled from '@emotion/styled';
import Link from 'next/link';

const Header = () => {
  return (
    <Root>
      <Container>
        <Logo href="/">spicy.pub</Logo>
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
  margin: 0 auto;
  padding: 15px 30px;
  max-width: var(--max-width);

  @media (max-width: 768px) {
    padding: 25px 30px;
  }
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`;

export default Header;
