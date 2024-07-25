import { useRoute } from '@/app/_providers/route-provider';
import { H1, TitleP } from '@/shared/ui/Texts';
import styled from '@emotion/styled';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface TitleBackProps {
  title: string;
  isTitleHead?: boolean;
  onClick?(): void;
}

const TitleBack: FC<TitleBackProps> = ({ title, onClick, isTitleHead = true, ...props }) => {
  const { back, push } = useRouter();
  const { previousUrl, currentUrl } = useRoute();

  const handleBack = () => {
    if (previousUrl && previousUrl !== currentUrl) {
      back();
    } else {
      push('/');
    }
  };

  return (
    <Root {...props} onClick={onClick || handleBack}>
      <IconWrap>
        <ChevronLeft />
      </IconWrap>
      {isTitleHead ? <H1>{title}</H1> : <TitleP>{title}</TitleP>}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`;

const IconWrap = styled.div`
  width: 54px;
  height: 51px;
  display: flex;
  min-width: 54px;
  margin-right: 15px;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background: var(--dark-average-color);
`;

export default TitleBack;
