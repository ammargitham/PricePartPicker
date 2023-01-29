import React from 'react';

import clsx from 'clsx';
import browser from 'webextension-polyfill';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import Loader from '../Icons/Loader';

interface InputProps {
  query: string;
  fetching: boolean;
  onChange: (query: string) => void;
  onSearch: () => void;
}

export default function Input({
  query,
  fetching,
  onChange,
  onSearch,
}: InputProps): JSX.Element {
  return (
    <>
      <label
        htmlFor="search"
        className={clsx([
          'mb-2',
          'text-sm',
          'font-medium',
          'text-gray-900',
          'sr-only',
          'dark:text-white',
        ])}
      >
        {browser.i18n.getMessage('search')}
      </label>
      <div className="relative flex">
        <div
          className={clsx([
            'absolute',
            'inset-y-0',
            'left-0',
            'flex',
            'items-center',
            'pl-3',
            'pointer-events-none',
          ])}
        >
          <MagnifyingGlassIcon
            className={clsx([
              'w-5',
              'h-5',
              'text-gray-500',
              'dark:text-gray-400',
            ])}
          />
        </div>
        <input
          type="search"
          id="search"
          className={clsx([
            'w-full',
            'p-4',
            'pl-10',
            'rounded-lg',
            'text-sm',
            'text-gray-900',
            'dark:text-white',
            'bg-gray-50',
            'dark:bg-gray-700',
            'border',
            'border-gray-300',
            'dark:border-gray-600',
            'focus:border-blue-500',
            'dark:focus:border-blue-500',
            'focus:ring-blue-500',
            'dark:focus:ring-blue-500',
            'dark:placeholder-gray-400',
          ])}
          placeholder={browser.i18n.getMessage('search')}
          required
          value={query}
          readOnly={fetching}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="submit"
          className={clsx([
            'text-white',
            'absolute',
            'right-2.5',
            'bottom-2.5',
            'bg-blue-700',
            'dark:bg-blue-600',
            'hover:bg-blue-800',
            'dark:hover:bg-blue-700',
            'active:hover:bg-blue-900',
            'dark:active:hover:bg-blue-800',
            'focus:outline-none',
            'font-medium',
            'rounded-lg',
            'text-sm',
            'px-4',
            'py-2',
            'disabled:opacity-75',
            'disabled:pointer-events-none',
            'inline-flex',
            'items-center',
          ])}
          disabled={!query.trim() || fetching}
          onClick={onSearch}
        >
          {fetching ? (
            <Loader
              className={clsx(['inline', 'mr-3', 'w-4', 'h-4', 'text-white'])}
            />
          ) : null}
          {browser.i18n.getMessage('search')}
        </button>
      </div>
    </>
  );
}
