import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import Pagination from '..';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export const Default = (): JSX.Element => (
  <Pagination
    pagination={{
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
    }}
  />
);
