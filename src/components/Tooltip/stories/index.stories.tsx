import React from 'react';

import { ComponentMeta } from '@storybook/react';

import Tooltip from '..';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export const Default = (): JSX.Element => (
  <Tooltip
    content="This is a tooltip"
    trigger={<button className="button">Hover here</button>}
  />
);
