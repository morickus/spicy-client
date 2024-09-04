import { CategoryResponseDto } from '@/shared/api/generated';
import styled from '@emotion/styled';
import { Tag } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';

interface CategoryListProps {
  categories: CategoryResponseDto[];
}

export const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const tagsFromUrl = searchParams.getAll('tags');
    setSelectedTags(tagsFromUrl);
  }, [searchParams]);

  const updateURL = (tags: string[]) => {
    const params = new URLSearchParams();

    tags.forEach((tag) => params.append('tags', tag));

    router.replace(`${process.env.NEXT_PUBLIC_DOMAIN}?${params.toString()}`);
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setSelectedTags(nextSelectedTags);
    updateURL(nextSelectedTags);
  };

  return (
    <Root>
      {categories.map((c) => {
        if (c.countArticles === 0) return;

        return (
          <Item
            key={`tag-${c.id}`}
            checked={selectedTags.includes(c.slug)}
            onChange={(checked) => handleTagChange(c.slug, checked)}
          >
            {c.name}
          </Item>
        );
      })}
    </Root>
  );
};

const Root = styled.div`
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--grey-secondary-color);
`;

const Item = styled(Tag.CheckableTag)`
  border: none;
  padding: 5px 0;
  font-size: 14px;
  line-height: 21px;
  user-select: none;
  padding-inline: 10px;
  letter-spacing: -0.03em;

  &.ant-tag-checkable:not(:hover, .ant-tag-checkable-checked) {
    background-color: ${(p) => p.theme.token.Tag?.defaultBg};
  }

  &.ant-tag-checkable.ant-tag-checkable-checked:not(:hover) {
    color: var(--black-color);
  }

  @media (hover: none) {
    &.ant-tag-checkable.ant-tag-checkable-checked:hover {
      color: var(--black-color);
      background-color: rgb(255, 255, 255);
    }
    &.ant-tag-checkable:not(.ant-tag-checkable-checked):hover {
      color: var(--white-color);
      background-color: ${(p) => p.theme.token.Tag?.defaultBg};
    }
  }
`;
