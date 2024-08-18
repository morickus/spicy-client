'use client';

import SignUpForm from '@/features/auth/ui/SignUpForm';
import { ROUTES } from '@/shared/constants/routes';
import TitleBack from '@/shared/ui/TitleBack';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const SignUp = () => {
  return (
    <Root>
      <TitleBack title="Register" />
      <SignUpForm />
      <StyledLink href={ROUTES.AUTH.SIGN_IN}>Login</StyledLink>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  padding: 30px 0;
`;

const StyledLink = styled(Link)`
  color: ${(p) => p.theme.token.colorPrimary};
`;

export default SignUp;
