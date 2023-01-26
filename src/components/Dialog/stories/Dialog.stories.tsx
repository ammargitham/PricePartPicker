import React, { useState } from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import Dialog, { DialogProps } from '..';

export default {
  title: 'Components/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: Story<DialogProps> = ({ children, ...others }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <Dialog open={open} onDismiss={() => setOpen(false)} {...others}>
        {children || 'Default'}
      </Dialog>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: 'text-black bg-white rounded p-3',
  title: 'Test title',
  children: <div>This is a test</div>,
};
