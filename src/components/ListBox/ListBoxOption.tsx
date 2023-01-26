import React from 'react';

import { ListboxOption } from '@reach/listbox';

import { ListOption } from '.';

interface ListBoxOptionProps {
  option: ListOption;
  isPlaceholder?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isSelected?: boolean;
}

function ListBoxOption({
  option,
  isPlaceholder = false,
  isFirst = false,
  isLast = false,
  isSelected = false,
}: ListBoxOptionProps): JSX.Element {
  let roundedClass = 'rounded-lg';
  // keep rounded if there's only 1 option (when isFirst and isLast are both true)
  if (!(isFirst && isLast)) {
    if (isFirst) {
      roundedClass = 'rounded-t-lg';
    } else if (isLast) {
      roundedClass = 'rounded-b-lg';
    } else {
      roundedClass = '';
    }
  }
  let textColorClass = 'text-gray-900 dark:text-white';
  if (isPlaceholder) {
    textColorClass = 'text-gray-400 dark:text-gray';
  }
  let hoverFocusTextColorClass = `
  hover:text-blue-700 dark:hover:text-white
  focus:text-blue-700 dark:focus:text-white
`;
  if (isPlaceholder) {
    hoverFocusTextColorClass = `
    hover:text-gray-400 dark:hover:text-gray
    focus:text-gray-400 dark:focus:text-gray
  `;
  }
  const cursorClass = isPlaceholder ? 'cursor-default' : 'cursor-pointer';
  const hoverBgClass = isPlaceholder
    ? ''
    : 'hover:bg-gray-100 dark:hover:bg-gray-600';
  let selectedBgClass = '';
  if (isSelected && !isPlaceholder) {
    selectedBgClass = 'bg-gray-100 dark:bg-gray-600';
  }

  return (
    <ListboxOption
      className={`
      tw-block w-full px-4 py-2
      border-b border-gray-200
      ${roundedClass}
      ${textColorClass}
      ${hoverFocusTextColorClass}
      ${cursorClass}
      ${hoverBgClass}
      ${selectedBgClass}
      focus:outline-none focus:ring-2 focus:ring-blue-700
      dark:border-gray-600 dark:focus:ring-gray-500
    `}
      value={option.value}
      disabled={isPlaceholder}
    >
      {option.content}
    </ListboxOption>
  );
}

export default ListBoxOption;
