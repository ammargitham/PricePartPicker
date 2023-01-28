import React, { useState } from 'react';

import clsx from 'clsx';

import { ComponentMeta } from '@storybook/react';

import Select, { Option } from '..';

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const tempOptions = Array(10)
  .fill(null)
  .map(
    (_, i): Option => ({
      key: `test${i}`,
      value: `test${i}`,
      content: `test${i}`,
    }),
  );

const tempRenderOptions = Array(10)
  .fill(null)
  .map(
    (_, i): Option => ({
      key: `test-render-${i}`,
      value: `test-render-${i}`,
      text: `test-render-${i}`,
      content: (
        <div className={clsx(['inline-flex', 'gap-1', 'items-baseline'])}>
          <span className="text-lg">Test</span>
          <span className="text-sm">{i}</span>
        </div>
      ),
    }),
  );

const allTempOptions = tempOptions.concat(tempRenderOptions);

export const Default = (): JSX.Element => {
  const [selected, setSelected] = useState<string | undefined>();
  return (
    <div>
      <div className="h-[200px]"></div>
      <Select
        placeholder="Select an option"
        options={allTempOptions}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};
