import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { KakakuPagination } from '@src/types';

import Pagination from '..';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const defaultPagination: KakakuPagination = {
  prev: {
    text: '',
    filters: {
      test: 'test',
    },
  },
  next: {
    text: '',
    filters: {
      test: 'test',
    },
  },
  pages: [
    {
      text: '1',
      filters: {
        test: 'test',
      },
    },
    {
      text: '2',
      current: true,
    },
    {
      text: '3',
      filters: {
        test: 'test',
      },
    },
    {
      text: '4',
      filters: {
        test: 'test',
      },
    },
    {
      text: '5',
      filters: {
        test: 'test',
      },
    },
    {
      text: '...',
    },
    {
      text: '30',
    },
  ],
};

export const Default = (): JSX.Element => (
  <Pagination pagination={defaultPagination} />
);

export const PrevNextDisabled = (): JSX.Element => {
  const pagination = Object.assign({}, defaultPagination);
  pagination.prev = undefined;
  pagination.next = undefined;
  return <Pagination pagination={pagination} />;
};
