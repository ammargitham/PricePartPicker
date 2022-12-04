import React from 'react';

import { KakakuPagination, KakakuPaginationPage } from '@src/types';

interface PaginationProps {
  pagination?: KakakuPagination;
  onPageClick?: (page: KakakuPaginationPage) => void;
}

export default function Pagination({
  pagination,
  onPageClick,
}: PaginationProps): JSX.Element {
  let pages = pagination?.pages;
  if (!pages) {
    pages = [
      {
        text: '1',
        current: true,
      },
    ];
  }

  return (
    <nav className="inline-flex">
      <ul className="text-base inline-flex items-center -space-x-px px-0">
        <li
          className={`px-3 py-2 ml-0 leading-tight bg-white
          border border-gray-300 rounded-l-lg hover:bg-gray-100 
          dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
           ${
             pagination?.prev ? 'hover:cursor-pointer' : 'pointer-events-none'
           }`}
        >
          <a
            className={`hover:no-underline !text-gray-500 hover:!text-gray-700
            dark:!text-gray-400 dark:hover:!text-white
            ${pagination?.prev ? '' : '!text-gray-800 dark:!text-gray-600'}`}
            onClick={() => {
              if (!pagination?.prev) {
                return;
              }
              onPageClick?.(
                pagination?.prev || {
                  text: '',
                },
              );
            }}
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5 tw-block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
        {pages.map((page, i) => {
          const clickable =
            page.filters && Object.keys(page.filters).length !== 0;
          const disabled = !page.current && !clickable;
          return (
            <li
              key={i}
              className={`px-3 py-2 leading-tight border dark:border-gray-700 ${
                page.current
                  ? `z-10 border-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-700`
                  : `bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700`
              } ${clickable ? 'hover:cursor-pointer' : 'pointer-events-none'}`}
            >
              <a
                aria-current={page.current ? 'page' : undefined}
                className={`hover:no-underline ${
                  page.current
                    ? `!text-blue-600 hover:!text-blue-700 dark:!text-white dark:hover:!text-white`
                    : `!text-gray-500 hover:!text-gray-700 dark:!text-gray-400 dark:hover:!text-white`
                } ${disabled ? '!text-gray-800 dark:!text-gray-600' : ''}`}
                onClick={clickable ? () => onPageClick?.(page) : undefined}
              >
                {page.text}
              </a>
            </li>
          );
        })}
        <li
          className={`px-3 py-2 ml-0 leading-tight bg-white
          border border-gray-300 rounded-r-lg hover:bg-gray-100 
          dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
           ${
             pagination?.next ? 'hover:cursor-pointer' : 'pointer-events-none'
           }`}
        >
          <a
            className={`hover:no-underline !text-gray-500 hover:!text-gray-700
            dark:!text-gray-400 dark:hover:!text-white
            ${pagination?.next ? '' : '!text-gray-800 dark:!text-gray-600'}`}
            onClick={() => {
              if (!pagination?.next) {
                return;
              }
              onPageClick?.(
                pagination?.next || {
                  text: '',
                },
              );
            }}
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5 tw-block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
