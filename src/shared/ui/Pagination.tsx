import styled from '@emotion/styled';
import React from 'react';

interface PaginationProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) => {
  return (
    <Root>
      {isFetchingNextPage ? (
        'Loading more...'
      ) : hasNextPage ? (
        <Button onClick={fetchNextPage}>Load More</Button>
      ) : null}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  padding: 64px 15px 0;
  justify-content: center;
`;

const Button = styled.button`
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 56px;
  height: 45px;
  line-height: 45px;
  border-radius: 7px;
  font-weight: 400;
  font-size: 16px;
  background: #fff;
  color: #696969;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`;

export default Pagination;
