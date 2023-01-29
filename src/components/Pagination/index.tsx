import React from 'react';

import clsx from 'clsx';

import { KakakuPagination, KakakuPaginationPage } from '@src/types';

interface PaginationProps {
  pagination?: KakakuPagination;
  onPageClick?: (page: KakakuPaginationPage) => void;
}

interface GetAnchorClassesProps {
  disabled?: boolean;
  selected?: boolean;
  clickable?: boolean;
}

const getAnchorClasses = ({
  disabled,
  selected,
  clickable,
}: GetAnchorClassesProps) => {
  const actualClickable = selected ? false : clickable;
  return clsx([
    'tw-block',
    'px-3',
    'py-2',
    'ml-0',
    'border',
    'hover:no-underline',
    'leading-tight',
    'relative',
    actualClickable && [
      'hover:bg-gray-100',
      'hover:text-gray-700',
      'dark:hover:bg-gray-700',
      'dark:hover:text-white',
      'hover:cursor-pointer',
    ],
    selected
      ? [
          'z-10',
          'text-blue-600',
          'border-blue-300',
          'bg-blue-50',
          'dark:border-gray-700',
          'dark:bg-gray-700',
          'dark:text-white',
        ]
      : [
          'bg-white',
          'text-gray-500',
          'border-gray-300',
          'dark:bg-gray-800',
          'dark:text-gray-400',
          'dark:border-gray-700',
          disabled && ['text-gray-500/50', 'dark:text-gray-400/50'],
        ],
  ]);
};

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
    <nav>
      <ul
        className={clsx(['inline-flex', 'items-center', '-space-x-px', 'px-0'])}
      >
        <li>
          <a
            className={clsx([
              'rounded-l-lg',
              getAnchorClasses({
                disabled: !pagination?.prev,
                clickable: !!pagination?.prev,
              }),
            ])}
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
              className={clsx(['w-5', 'h-5', 'tw-block'])}
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
            <li key={i}>
              <a
                aria-current={page.current ? 'page' : undefined}
                className={`${getAnchorClasses({
                  disabled,
                  selected: !!page.current,
                  clickable,
                })}`}
                onClick={clickable ? () => onPageClick?.(page) : undefined}
              >
                {page.text}
              </a>
            </li>
          );
        })}
        <li>
          <a
            className={clsx([
              'rounded-r-lg',
              getAnchorClasses({
                disabled: !pagination?.next,
                clickable: !!pagination?.next,
              }),
            ])}
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
              className={clsx(['w-5', 'h-5', 'tw-block'])}
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
