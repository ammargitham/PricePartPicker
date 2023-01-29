import React from 'react';

import clsx from 'clsx';
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
  const selectedShop = kakakuItem.selectedShopId
    ? kakakuItem.shops?.find((s) => s.id === kakakuItem.selectedShopId)
    : undefined;
  return (
    <div className={clsx(['w-full', 'rounded-t-lg', 'translate-y-[1px]'])}>
      {kakakuItem.imgUrl && (
        <a
          className={clsx([
            'tw-block',
            'p-2',
            'rounded-t-lg',
            'bg-white',
            '-translate-y-[1px]',
          ])}
          href={kakakuItem.itemUrl}
        >
          <img
            className={clsx(['m-auto', 'min-h-[8rem]', 'max-h-[12rem]'])}
            src={kakakuItem.imgUrl}
            alt="Image"
          />
        </a>
      )}
      <div className="p-5">
        <a href={kakakuItem.itemUrl}>
          <h5
            className={clsx([
              'text-xl',
              'font-semibold',
              'tracking-tight',
              'text-gray-900',
              'dark:text-white',
            ])}
          >
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
            className={clsx([
              'space-y-1',
              'px-4',
              'mb-5',
              'list-disc',
              'list-outside',
              'text-gray-500',
              'dark:text-gray-400',
            ])}
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
          <span
            className={clsx([
              'text-3xl',
              'font-bold',
              'text-gray-900',
              'dark:text-white',
            ])}
          >
            {kakakuItem.price
              ? `¥${kakakuItem.price.toLocaleString('ja-JP')}`
              : 'No price information'}
          </span>
          {selectedShop ? (
            <span className={clsx(['text-sm', 'text-gray-400', 'ml-4'])}>
              <span className="font-light ">
                {browser.i18n.getMessage('sold_by')}
              </span>
              <span
                className={clsx(['ml-1', 'text-gray-900', 'dark:text-white'])}
              >
                {selectedShop.name || ''}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
