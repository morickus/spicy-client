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
  background: var(--dark-average-color);
  transition: background 0.3s ease;
  color: var(--white-color);
  letter-spacing: -0.03em;
  border-radius: 6px;
  line-height: 21px;
  user-select: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;

  &:hover {
    background: #53575b;
  }
`;

export default Pagination;
