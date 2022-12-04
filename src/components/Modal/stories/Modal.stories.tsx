import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import Modal from '..';

export default {
  title: 'Components/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Default = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setOpen(true)}
      >
        Toggle modal
      </button>
      <Modal
        open={open}
        onDismiss={() => setOpen(false)}
        content="Test content"
      />
    </>
  );
};
