import React, { useMemo } from 'react';

import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOptionProps,
} from '@reach/listbox';

import ListBoxOption from './ListBoxOption';

export interface ListOption {
  key: React.Key;
  value: ListboxOptionProps['value'];
  content: React.ReactNode;
}

interface ListBoxProps {
  placeholder?: string;
  value?: string;
  options: ListOption[];
  onChange?: (value: string) => void;
}

function ListBox({
  placeholder = 'Choose an option',
  value = '',
  options = [],
  onChange,
}: ListBoxProps): JSX.Element {
  const isPlaceholderSelected = value === '';

  const optionsWithPlaceholder = useMemo(() => {
    let optionsCopy: ListOption[] = [];
    if (options) {
      optionsCopy = [
        {
          key: '__placeholder__',
          value: '',
          content: placeholder,
        },
        ...options,
      ];
    }
    return optionsCopy;
  }, [options, placeholder]);

  const selectedOption = useMemo(() => {
    return options.find((o) => o.value === value);
  }, [options, value]);

  return (
    <div>
      <ListboxInput value={value} onChange={onChange} placeholder={placeholder}>
        <ListboxButton
          className={`
            min-h-[2.5rem] tw-block w-full relative bg-gray-50 p-2.5
            border border-gray-300
            ${
              isPlaceholderSelected
                ? 'text-gray-400 dark:text-gray'
                : 'text-gray-900 dark:text-white'
            }
            text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500 focus:outline-none
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:focus:ring-blue-500 dark:focus:border-blue-500
            after:content-[''] after:absolute after:right-2.5 after:text-xs
            after:bg-dropdown-arrow after:w-3 after:h-[0.4rem] after:bg-no-repeat
            after:top-1/2 after:-translate-y-1/2
            after:text-gray-900 dark:after:text-white
          `}
        >
          {selectedOption?.content}
        </ListboxButton>
        <ListboxPopover
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
          rounded-lg tw-block w-full
          dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white"
        >
          <ListboxList className="p-0 focus-visible:outline-none">
            {optionsWithPlaceholder.map((o, i, list) => {
              return (
                <ListBoxOption
                  key={o.key}
                  option={o}
                  isPlaceholder={o.value === ''}
                  isFirst={i === 0}
                  isLast={i === list.length - 1}
                  isSelected={value === o.value}
                />
              );
            })}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

export default ListBox;
