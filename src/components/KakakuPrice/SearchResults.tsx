import React from 'react';

import clsx from 'clsx';
import browser from 'webextension-polyfill';

import { CheckIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

import { KakakuItem, Query, SearchResultPage } from '@src/types';
import { getScrollbarClasses } from '@src/utils';

import Loader from '../Icons/Loader';
import Pagination from '../Pagination';
import Tooltip from '../Tooltip';
import FilterRadioSectionComponent from './FilterRadioSectionComponent';
import ResultInfo from './ResultInfo';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  query: Query;
  resultPage: SearchResultPage;
  searching: boolean;
  usedKakakuId?: string;
  isCurrentQueryUsed?: boolean;
  onFiltersChange?: (filters: Record<string, string>) => void;
  onUseResultClick?: (result: KakakuItem) => void;
  onUseQueryClick?: () => void;
}

export default function SearchResults({
  query,
  resultPage,
  searching,
  usedKakakuId,
  isCurrentQueryUsed,
  onFiltersChange,
  onUseResultClick,
  onUseQueryClick,
}: SearchResultsProps): JSX.Element {
  return (
    <div
      className={clsx([
        'flex',
        'flex-row',
        'flex-1',
        'gap-3',
        'overflow-hidden',
        'relative',
      ])}
    >
      {searching ? (
        <div
          className={clsx([
            'absolute',
            'z-[12]',
            'top-0',
            'bottom-0',
            'left-0',
            'right-0',
            'flex',
            'items-center',
            'justify-center',
            'bg-black/70',
            'overflow-hidden',
          ])}
        >
          <Loader className="w-10 h-10" />
        </div>
      ) : null}
      {resultPage.filterSections?.length ? (
        <div
          className={clsx([
            'flex',
            'flex-col',
            'gap-3',
            'min-w-[15%]',
            'max-w-[22%]',
            'overflow-auto',
            getScrollbarClasses(),
          ])}
        >
          {resultPage?.filterSections?.map((section) => (
            <FilterRadioSectionComponent
              key={section.title}
              section={section}
              disabled={searching}
              onOptionChecked={(option) => onFiltersChange?.(option.filters)}
            />
          ))}
        </div>
      ) : null}
      <div
        className={clsx([
          'flex-1',
          'overflow-auto',
          'flex',
          'flex-col',
          'gap-4',
        ])}
      >
        {resultPage && resultPage.results.length ? (
          <div
            className={clsx([
              'flex',
              'flex-row',
              'items-center',
              'gap-4',
              'mt-[4px]',
            ])}
          >
            <div className="flex-1">
              {resultPage.info ? <ResultInfo info={resultPage.info} /> : null}
            </div>
            <Tooltip
              content={browser.i18n.getMessage('use_query_tooltip')}
              trigger={
                // TODO: refactor below button into a component
                <button
                  type="button"
                  className={clsx([
                    'flex',
                    'flex-row',
                    'items-center',
                    'px-4',
                    'py-2',
                    'text-sm',
                    'font-medium',
                    'rounded-lg',
                    'focus:outline-none',
                    'focus:ring-4',
                    'focus:ring-green-300',
                    'dark:focus:ring-green-800',
                    isCurrentQueryUsed
                      ? [
                          'cursor-default',
                          'text-gray-900',
                          'bg-green-400',
                          'dark:bg-green-500',
                        ]
                      : [
                          'text-white',
                          'bg-green-700',
                          'dark:bg-green-600',
                          'hover:bg-green-800',
                          'dark:hover:bg-green-700',
                        ],
                  ])}
                  onClick={() => {
                    if (isCurrentQueryUsed) {
                      return;
                    }
                    onUseQueryClick?.();
                  }}
                >
                  {isCurrentQueryUsed ? (
                    <CheckIcon
                      className={clsx(['mr-2', '-ml', 'w-4', 'h-4'])}
                    />
                  ) : null}
                  <span>
                    {browser.i18n.getMessage(
                      isCurrentQueryUsed
                        ? 'using_current_query'
                        : 'use_current_query',
                    )}
                  </span>
                  {!isCurrentQueryUsed ? (
                    <InformationCircleIcon
                      className={clsx(['ml-2', '-mr-1', 'w-5', 'h-5'])}
                    />
                  ) : null}
                </button>
              }
            />
            <div
              className={clsx([
                'flex',
                'flex-row',
                'items-center',
                'gap-2',
                'text-gray-900',
                'dark:text-white',
              ])}
            >
              {browser.i18n.getMessage('sort')}:
              <select
                className={clsx([
                  'tw-block',
                  'w-40',
                  'mr-1',
                  'p-2',
                  'text-sm',
                  'rounded-lg',
                  'bg-gray-50',
                  'dark:bg-gray-700',
                  'border',
                  'border-gray-300',
                  'dark:border-gray-600',
                  'focus:border-blue-500',
                  'dark:focus:border-blue-500',
                  'text-gray-900',
                  'dark:text-white',
                  'focus:ring-blue-500',
                  'dark:focus:ring-blue-500',
                  'dark:placeholder-gray-400',
                ])}
                onChange={(e) => {
                  const newSort = e.target.value;
                  const newFilters = query.filters || {};
                  if (newSort) {
                    newFilters['sort'] = newSort;
                  } else {
                    delete newFilters['sort'];
                  }
                  onFiltersChange?.(newFilters);
                }}
                value={query.filters?.sort || ''}
              >
                <option value="">
                  {browser.i18n.getMessage('sort_standard')}
                </option>
                <option value="priceb">
                  {browser.i18n.getMessage('sort_price_asc')}
                </option>
                <option value="pricet">
                  {browser.i18n.getMessage('sort_price_desc')}
                </option>
                <option value="clkrank_d">
                  {browser.i18n.getMessage('sort_popularity')}
                </option>
                <option value="date">
                  {browser.i18n.getMessage('sort_date')}
                </option>
              </select>
            </div>
          </div>
        ) : null}
        {resultPage && resultPage.results.length ? (
          <div className={`overflow-auto ${getScrollbarClasses()}`}>
            <ul
              className={clsx([
                'divide-y',
                'divide-gray-300',
                'dark:divide-gray-700',
                'pl-2',
                'pr-4',
              ])}
            >
              {resultPage.results.map((r, i) => (
                <SearchResultItem
                  key={r.itemUrl}
                  searchResult={r}
                  isFirst={i === 0}
                  isLast={i === resultPage.results.length - 1}
                  isUsed={r.kakakuId === usedKakakuId}
                  onUseClick={() => onUseResultClick?.(r)}
                />
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Pagination
                pagination={resultPage.pagination}
                onPageClick={(page) => {
                  const filters = page.filters;
                  if (!filters || Object.entries(filters).length === 0) {
                    return;
                  }
                  onFiltersChange?.(filters);
                }}
              />
            </div>
          </div>
        ) : (
          <p
            className={clsx([
              'text-sm',
              'font-medium',
              'text-gray-900',
              'dark:text-white',
              'truncate',
              'mt-4',
            ])}
          >
            {browser.i18n.getMessage('no_results')}
          </p>
        )}
      </div>
    </div>
  );
}
