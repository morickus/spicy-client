'use client';

import SignInForm from '@/features/auth/ui/SignInForm';
import { ROUTES } from '@/shared/constants/routes';
import TitleBack from '@/shared/ui/TitleBack';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const SignIn = () => {
  return (
    <Root>
      <TitleBack title="Login" />
      <SignInForm />
      <StyledLink href={ROUTES.AUTH.SIGN_UP}>Register</StyledLink>
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

export default SignIn;
