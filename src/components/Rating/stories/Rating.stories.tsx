import * as React from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import Rating, { RatingProps } from '..';

export default {
  title: 'Components/Rating',
  component: Rating,
  argTypes: {
    rating: {
      options: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Rating>;

const Template: Story<RatingProps> = ({ rating }) => (
  <Rating rating={rating} ratingText="4.97" />
);

export const Default = Template.bind({});

Default.args = {
  rating: 0.5,
};
