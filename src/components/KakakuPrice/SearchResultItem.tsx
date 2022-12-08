import React from 'react';

import browser from 'webextension-polyfill';

import { CheckIcon } from '@heroicons/react/24/solid';

import { KakakuItem } from '@src/types';
import { getFullName, getRatingText, getReleaseDate } from '@src/utils';

import Rating from '../Rating';

interface SearchResultItemProps {
  searchResult: KakakuItem;
  isFirst: boolean;
  isLast: boolean;
  isUsed?: boolean;
  onUseClick?: () => void;
}

export default function SearchResultItem({
  searchResult,
  isFirst,
  isLast,
  isUsed,
  onUseClick,
}: SearchResultItemProps): JSX.Element {
  function getClass() {
    if (isFirst) {
      return 'pb-3 sm:pb-4';
    }
    if (isLast) {
      return 'pt-3 pb-0 sm:pt-4';
    }
    return 'py-3 sm:py-4';
  }

  return (
    <li className={`${getClass()} border-solid`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="w-12 h-12" src={searchResult.imgUrl || ''} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 !truncate dark:text-white">
            <a
              className="text-blue-600 dark:text-blue-400 visited:text-purple-600 underline"
              href={searchResult.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getFullName(searchResult.name, searchResult.maker)}
            </a>
          </p>
          <div
            className="flex flex-row flex-wrap gap-1 divide-x divide-gray-200 dark:divide-gray-700
            text-sm text-gray-500 truncate dark:text-gray-400 mt-1"
          >
            {searchResult.rating ? (
              <Rating
                rating={searchResult.rating.rating || 0}
                ratingText={getRatingText(searchResult.rating)}
              />
            ) : null}
            {searchResult.releaseDate ? (
              <div className="pr-3">
                {browser.i18n.getMessage('release_date')}:
                <span className="ml-1">
                  {getReleaseDate(searchResult.releaseDate)}
                </span>
              </div>
            ) : null}
            {/* Can be later used to add more metadata */}
            {/* <div className="px-3">2</div>
            <div className="pl-3">3</div> */}
          </div>
        </div>
        <div
          className="inline-flex flex-col items-center text-base font-semibold
          text-gray-900 dark:text-white gap-2"
        >
          <span>
            {searchResult.price
              ? `¥${searchResult.price.toLocaleString('ja-JP')}`
              : browser.i18n.getMessage('no_price')}
          </span>
          <button
            type="button"
            className={`flex flex-row items-center px-3.5 py-1.5 text-sm font-medium text-center
            ${isUsed ? 'cursor-default' : null}
            ${isUsed ? 'text-gray-900' : 'text-white'}
            ${isUsed ? 'bg-green-400' : 'bg-green-700 hover:bg-green-800'}
            ${
              isUsed
                ? 'dark:bg-green-500'
                : 'dark:bg-green-600 dark:hover:bg-green-700'
            }
            focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800
            rounded-lg`}
            onClick={isUsed ? undefined : onUseClick}
          >
            {isUsed ? <CheckIcon className="mr-2 -ml w-3.5 h-3.5" /> : null}
            <span>
              {browser.i18n.getMessage(
                isUsed ? 'using_this_item' : 'use_this_item',
              )}
            </span>
          </button>
        </div>
      </div>
    </li>
  );
}
