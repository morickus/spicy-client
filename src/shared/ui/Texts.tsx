import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { EB_Garamond } from 'next/font/google';

const ebGaramond = EB_Garamond({ subsets: ['latin'], display: 'swap' });

const BaseHeading = css`
  font-family: ${ebGaramond.style.fontFamily}, sans-serif;
  font-weight: 500;
`;

export const H1 = styled.h1`
  ${BaseHeading};
  font-size: 36px;
  line-height: 47px;
`;

export const TitleP = styled.p`
  ${BaseHeading};
  font-size: 36px;
  line-height: 47px;
`;

export const H2 = styled.h2`
  ${BaseHeading};
  font-size: 32px;
  line-height: 31px;
`;

export const H3 = styled.h3`
  ${BaseHeading};
  font-size: 24px;
  line-height: 31px;
`;

export const H4 = styled.h4`
  ${BaseHeading};
  font-size: 18px;
  line-height: 24px;
`;
