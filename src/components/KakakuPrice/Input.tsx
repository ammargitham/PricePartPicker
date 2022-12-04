import React from 'react';

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
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative flex">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="search"
          className="w-full p-4 pl-10 text-sm text-gray-900 border
          border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
          focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
          dark:focus:border-blue-500"
          placeholder="Search"
          required
          value={query}
          readOnly={fetching}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700
          hover:bg-blue-800 focus:outline-none active:hover:bg-blue-900
          font-medium rounded-lg text-sm px-4 py-2
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:hover:bg-blue-800
          disabled:opacity-75 disabled:pointer-events-none inline-flex items-center"
          disabled={!query.trim() || fetching}
          onClick={onSearch}
        >
          {fetching ? (
            <Loader className="inline mr-3 w-4 h-4 text-white" />
          ) : null}
          Search
        </button>
      </div>
    </>
  );
}
