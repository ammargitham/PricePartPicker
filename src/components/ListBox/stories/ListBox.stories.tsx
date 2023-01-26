import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import ListBox from '..';

export default {
  title: 'Components/ListBox',
  component: ListBox,
} as ComponentMeta<typeof ListBox>;

export const Default = (): JSX.Element => (
  <ListBox
    placeholder="Select an option"
    options={[
      {
        key: 'test1',
        value: 'test1',
        content: 'test1',
      },
      {
        key: 'test2',
        value: 'test2',
        content: 'test2',
      },
      {
        key: 'test3',
        value: 'test3',
        content: 'test3',
      },
    ]}
  />
);
