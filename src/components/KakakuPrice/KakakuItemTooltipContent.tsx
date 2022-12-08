import React from 'react';

import browser from 'webextension-polyfill';

import { KakakuItem } from '@src/types';
import { getFullName, getRatingText, getReleaseDate } from '@src/utils';

import Rating from '../Rating';

interface KakakuItemTooltipContentProps {
  kakakuItem: KakakuItem;
}

export default function KakakuItemTooltipContent({
  kakakuItem,
}: KakakuItemTooltipContentProps): JSX.Element {
  return (
    <div className="w-full rounded-t-lg">
      {kakakuItem.imgUrl && (
        <a
          className="tw-block p-2 rounded-t-lg bg-white -translate-y-[1px]"
          href={kakakuItem.itemUrl}
        >
          <img
            className="m-auto min-h-[8rem] max-h-[12rem]"
            src={kakakuItem.imgUrl}
            alt="Image"
          />
        </a>
      )}
      <div className="p-5">
        <a href={kakakuItem.itemUrl}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {getFullName(kakakuItem.name, kakakuItem.maker)}
          </h5>
        </a>
        <Rating
          className="mt-2.5 mb-5"
          rating={kakakuItem.rating?.rating || 0}
          ratingText={getRatingText(kakakuItem.rating)}
        />
        {kakakuItem.releaseDate || (kakakuItem.itemDetails?.length || 0) > 0 ? (
          <ul
            className="space-y-1 px-4 mb-5 list-disc list-outside text-gray-500
          dark:text-gray-400"
          >
            {kakakuItem.releaseDate ? (
              <li>
                {browser.i18n.getMessage('release_date')}:
                <span className="ml-1">
                  {getReleaseDate(kakakuItem.releaseDate)}
                </span>
              </li>
            ) : null}
            {kakakuItem.itemDetails?.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {kakakuItem.price
              ? `¥${kakakuItem.price.toLocaleString('ja-JP')}`
              : 'No price information'}
          </span>
          {kakakuItem.shop && kakakuItem.shop.name ? (
            <span className="text-sm text-gray-400 ml-4">
              <span className="font-light ">
                {browser.i18n.getMessage('sold_by')}
              </span>
              <span className="ml-1 text-gray-900 dark:text-white">
                {kakakuItem.shop.name}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
