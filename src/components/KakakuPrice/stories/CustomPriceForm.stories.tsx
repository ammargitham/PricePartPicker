import React from 'react';

import clsx from 'clsx';

import { ComponentMeta } from '@storybook/react';

import CustomPriceForm from '../CustomPriceForm';

export default {
  title: 'Components/KakakuPrice/CustomPriceForm',
  component: CustomPriceForm,
} as ComponentMeta<typeof CustomPriceForm>;

export const Default = (): JSX.Element => (
  <div className={clsx(['bg-white', 'dark:bg-gray-800', 'p-4', 'max-w-md'])}>
    <CustomPriceForm />
  </div>
);
