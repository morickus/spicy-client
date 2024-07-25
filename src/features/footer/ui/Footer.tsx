'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <Root>
      <span>© {new Date().getFullYear()} spicy.pub</span>
      {/*<Link href="/">Privacy policy</Link>*/}
      <div>
        <span>For info: </span>
        <Link href="mailto:info@spicy.pub">info@spicy.pub</Link>
      </div>
      <div>
        <span>For authors: </span>
        <Link href="mailto:authors@spicy.pub">authors@spicy.pub</Link>
      </div>
      <div>
        <span>For ads: </span>
        <Link href="mailto:ads@spicy.pub">ads@spicy.pub</Link>
      </div>
    </Root>
  );
};

const Root = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px 10px;

  a,
  span {
    font-size: 12px;
    line-height: 21px;
  }

  span {
    color: var(--grey-secondary-color);
  }

  a {
    color: var(--acent-primary-color);

    &:hover {
      color: var(--white-color);
    }
  }
`;

export default Footer;
