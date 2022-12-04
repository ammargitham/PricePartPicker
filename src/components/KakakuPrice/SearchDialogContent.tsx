import React, { useState } from 'react';

import deepEqual from 'deep-equal';

import {
  XMarkIcon,
  InformationCircleIcon,
  CheckIcon,
} from '@heroicons/react/24/solid';

import { emptyResultPage } from '@src/constants';
import { DBPart } from '@src/db';
import { KakakuItem, Part, Query, SearchResultPage } from '@src/types';

import Loader from '../Icons/Loader';
import Pagination from '../Pagination';
import Tooltip from '../Tooltip';
import FilterRadioSectionComponent from './FilterRadioSectionComponent';
import Input from './Input';
import PartInfo from './PartInfo';
import ResultInfo from './ResultInfo';
import SearchResultItem from './SearchResultItem';

interface SearchDialogContentProps {
  part: Part;
  resultPage?: SearchResultPage;
  searching?: boolean;
  dbPart?: DBPart;
  onSearch?: (query: Query) => void;
  onClose?: () => void;
  onUseQueryClick?: (page: SearchResultPage) => void;
  onUseResultClick?: (result: KakakuItem) => void;
}

export default function SearchDialogContent({
  part,
  resultPage = emptyResultPage,
  searching = false,
  dbPart,
  onSearch,
  onClose,
  onUseQueryClick,
  onUseResultClick,
}: SearchDialogContentProps): JSX.Element {
  const [query, setQuery] = useState(resultPage.query);

  let usedKakakuId: string | undefined;
  let usedQuery: Query | undefined;
  if (dbPart) {
    usedKakakuId = dbPart.kakakuId;
    usedQuery = dbPart.query;
  }
  const isCurrentQueryUsed = deepEqual(query, usedQuery, { strict: true });

  return (
    <div
      className="bg-slate-900 ring-1 ring-white/10 shadow-lg p-5 pt-0
      rounded-lg text-sm text-white relative flex flex-col max-h-[90vh]"
    >
      <PartInfo part={part} />
      <hr className="border-gray-700 -mx-5" />
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
        <span className="">Search on kakaku.com</span>
      </div>
      <Input
        query={query.query}
        fetching={searching}
        onChange={(q) =>
          setQuery(
            (prev): Query => ({
              ...prev,
              query: q,
            }),
          )
        }
        onSearch={() => onSearch?.(query)}
      />
      <div className="flex flex-row flex-1 gap-3 mt-5 overflow-hidden relative">
        {searching ? (
          <div
            className="absolute z-[12] top-0 bottom-0 left-0 right-0 flex
            items-center justify-center bg-black/70 overflow-hidden"
          >
            <Loader className="w-10 h-10" />
          </div>
        ) : null}
        {resultPage.filterSections?.length ? (
          <div
            className="flex flex-col gap-3 min-w-[15%] max-w-[22%] overflow-auto
            scrollbar-thin scrollbar-track-slate-500 scrollbar-thumb-slate-800
            scrollbar-track-rounded scrollbar-thumb-rounded"
          >
            {resultPage?.filterSections?.map((section) => (
              <FilterRadioSectionComponent
                key={section.title}
                section={section}
                disabled={searching}
                onOptionChecked={(option) => {
                  const newQuery: Query = {
                    ...query,
                    filters: option.filters,
                  };
                  setQuery(newQuery);
                  onSearch?.(newQuery);
                }}
              />
            ))}
          </div>
        ) : null}
        <div className="flex-1 overflow-auto flex flex-col gap-4">
          {resultPage && resultPage.results.length ? (
            <div className="flex flex-row items-center gap-4 mt-[4px]">
              <div className="flex-1">
                {resultPage.info ? <ResultInfo info={resultPage.info} /> : null}
              </div>
              <Tooltip
                label="The current query, category, page will be used to get the cheapest item."
                aria-label="The current query, category, page will be used to get the cheapest item."
                className="z-[999]"
                arrowClassName="z-[1000]"
              >
                {/* TODO: refactor below button into a component */}
                <button
                  type="button"
                  className={`flex flex-row items-center px-4 py-2 text-sm font-medium
                  rounded-lg
                  ${isCurrentQueryUsed ? 'cursor-default' : null}
                  ${isCurrentQueryUsed ? 'text-gray-900' : 'text-white'}
                  ${
                    isCurrentQueryUsed
                      ? 'bg-green-400'
                      : 'bg-green-700 hover:bg-green-800'
                  }
                  ${
                    isCurrentQueryUsed
                      ? 'dark:bg-green-500'
                      : 'dark:bg-green-600 dark:hover:bg-green-700'
                  }
                  focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800`}
                  onClick={() => {
                    if (isCurrentQueryUsed) {
                      return;
                    }
                    onUseQueryClick?.(resultPage);
                  }}
                >
                  {isCurrentQueryUsed ? (
                    <CheckIcon className="mr-2 -ml w-4 h-4" />
                  ) : null}
                  <span>
                    {isCurrentQueryUsed
                      ? 'Using current query'
                      : 'Use current query'}
                  </span>
                  {!isCurrentQueryUsed ? (
                    <InformationCircleIcon className="ml-2 -mr-1 w-5 h-5" />
                  ) : null}
                </button>
              </Tooltip>
              <div className="flex flex-row items-center gap-2">
                Sort:
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900
                  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                  tw-block w-40 mr-1 p-2 dark:bg-gray-700 dark:border-gray-600
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
                  onChange={(e) => {
                    const newSort = e.target.value;
                    const newFilters = query.filters || {};
                    if (newSort) {
                      newFilters['sort'] = newSort;
                    } else {
                      delete newFilters['sort'];
                    }
                    const newQuery: Query = {
                      ...query,
                      filters: newFilters,
                    };
                    setQuery(newQuery);
                    onSearch?.(newQuery);
                  }}
                  value={query.filters?.sort || ''}
                >
                  <option value="">Standard</option>
                  <option value="priceb">Price ascending</option>
                  <option value="pricet">Price descending</option>
                  <option value="clkrank_d">Popularity</option>
                  <option value="date">Release date</option>
                </select>
              </div>
            </div>
          ) : null}
          {resultPage && resultPage.results.length ? (
            <div
              className="overflow-auto scrollbar-thin scrollbar-track-slate-500
              scrollbar-thumb-slate-800 scrollbar-track-rounded scrollbar-thumb-rounded"
            >
              <ul
                className="divide-y divide-gray-200 dark:divide-gray-700
                pl-2 pr-4"
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
                    const newQuery: Query = {
                      ...query,
                      filters,
                    };
                    setQuery(newQuery);
                    onSearch?.(newQuery);
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white mt-4">
              No results
            </p>
          )}
        </div>
      </div>
      <button
        className="h-8 w-8 p-2 absolute -top-3 -right-3 rounded-full bg-white
      hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-600 ring-2 
      ring-slate-500/50 ring-inset"
        onClick={onClose}
      >
        <XMarkIcon className="h-4 w-4 tw-block" />
      </button>
    </div>
  );
}
