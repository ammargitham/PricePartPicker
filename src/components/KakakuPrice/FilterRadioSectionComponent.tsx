import React from 'react';

import { FilterRadioOption, FilterRadioSection } from '@src/types';

interface FilterRadioSectionComponentProps {
  section: FilterRadioSection;
  disabled?: boolean;
  onOptionChecked?: (option: FilterRadioOption) => void;
}

export default function FilterRadioSectionComponent({
  section,
  disabled,
  onOptionChecked,
}: FilterRadioSectionComponentProps): JSX.Element {
  function getLabel(option: FilterRadioOption): JSX.Element | string {
    const label = option.name;
    if (option.count === undefined) {
      return label;
    }
    return (
      <>
        {label}
        <span className="text-sm ml-1 font-thin text-slate-400 dark:text-slate-400">
          ({option.count})
        </span>
      </>
    );
  }

  return (
    <div className="w-full">
      <label className="tw-block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {section.title}
      </label>
      <ul
        className="p-0 text-sm font-medium text-gray-900 bg-white rounded-lg
        border border-gray-300 dark:bg-gray-700 dark:border-gray-600
        dark:text-white"
        aria-disabled={disabled}
      >
        {section.options.map((option, i) => {
          const id = `${section.title}_${option.name}`;
          const isLast = i === section.options.length - 1;
          return (
            <li
              key={option.name}
              className={`${isLast ? '' : 'border-b'}
              ${option.isChild ? 'ml-4' : ''}
              rounded-t-lg border-gray-200 dark:border-gray-600`}
            >
              <div className="flex items-center px-3">
                <input
                  id={id}
                  type="radio"
                  checked={option.isActive}
                  name={id}
                  readOnly={disabled}
                  className={`w-4 h-4 text-blue-600 !bg-gray-100 border-gray-300
                  !dark:bg-gray-600 dark:border-gray-500 appearance-auto rounded-full
                  ${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
                  onChange={(e) => {
                    if (disabled) {
                      return;
                    }
                    if (e.target.checked) {
                      // setCheckedOption(option);
                      onOptionChecked?.(option);
                    }
                  }}
                />
                <label
                  htmlFor={id}
                  className={`py-2 ml-2 w-full text-sm font-medium text-gray-900
                  dark:text-gray-300 cursor-pointer
                  ${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
                >
                  {getLabel(option)}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
