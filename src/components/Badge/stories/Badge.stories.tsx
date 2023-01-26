import * as React from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import Badge, { BadgeProps } from '..';

export default {
  title: 'Components/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: Story<BadgeProps> = ({ size, color, disabled, children }) => (
  <Badge size={size} color={color} disabled={disabled}>
    {children || 'Default'}
  </Badge>
);

export const Default = Template.bind({});
