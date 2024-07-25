'use client';

import { useCategories } from '@/entities/category/model/useCategories';
import { CategoryList } from '@/entities/category/ui/CategoryList';
import Footer from '@/features/footer/ui/Footer';
import Header from '@/features/header/ui/Header';
import { omitProps } from '@/shared/lib/emotion-omit-props';
import { H3 } from '@/shared/ui/Texts';
import TitleBack from '@/shared/ui/TitleBack';
import styled from '@emotion/styled';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SiderMobile = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const { data, error } = useCategories();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return;

  return (
    <>
      <Button {...props} onClick={() => setOpen(true)}>
        <H3>Categories</H3>
        <ChevronRight />
      </Button>
      <SiderMobileComponent open={open}>
        <Header />
        <TitleBackStyled title="Categories" onClick={() => setOpen(false)} isTitleHead={false} />
        <Container>
          <CategoryList categories={data} />
          <Footer />
        </Container>
      </SiderMobileComponent>
    </>
  );
};

const Button = styled.div`
  top: 15px;
  z-index: 1;
  display: flex;
  cursor: pointer;
  position: sticky;
  align-items: center;
  border-radius: 10px;
  padding: 10px 10px 10px 15px;
  justify-content: space-between;
  background: var(--dark-average-color);

  @media (min-width: 769px) {
    display: none;
  }
`;

const SiderMobileComponent = styled('div', omitProps('open'))<{ open: boolean }>`
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: fixed;
  background: var(--dark-secondary-color);
  transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  transform: ${(p) => (p.open ? 'translateX(0)' : 'translateX(100%)')};

  @media (min-width: 769px) {
    display: none;
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const TitleBackStyled = styled(TitleBack)`
  padding: 30px 20px 10px 20px;
`;

export default SiderMobile;
