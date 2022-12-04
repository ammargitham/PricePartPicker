import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { Popup } from '../component';

// // // //

export default {
  title: 'Components/Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>;

export const Render = () => <Popup />;
