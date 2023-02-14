import React, { useMemo } from 'react';

import clsx from 'clsx';
import browser from 'webextension-polyfill';

import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';

import { CustomPrice, KakakuItem } from '@src/types';

import Loader from '../Icons/Loader';
import Tooltip from '../Tooltip';
import KakakuItemTooltipContent from './KakakuItemTooltipContent';

interface KakakuPriceContentProps {
  searching?: boolean;
  showSearchDialog?: boolean;
  kakakuItem?: KakakuItem;
  customPrice?: CustomPrice;
  openDialog?: () => void;
  onEditClick?: () => void;
}

export default function KakakuPriceContent({
  searching = false,
  showSearchDialog = false,
  kakakuItem,
  customPrice,
  openDialog,
  onEditClick,
}: KakakuPriceContentProps): JSX.Element {
  const price = useMemo(
    () => kakakuItem?.price || customPrice?.price,
    [customPrice?.price, kakakuItem?.price],
  );
  return (
    <div className={clsx(['flex', 'flex-row', 'items-center'])}>
      {!showSearchDialog && searching && (
        <Loader
          className={clsx([
            'w-5',
            'h-5',
            'text-gray-600',
            'dark:text-slate-500',
          ])}
        />
      )}
      {!searching && (kakakuItem || customPrice) && (
        <>
          <span className={clsx(['font-bold', 'text-sm', 'mr-2'])}>
            {price
              ? `¥${price.toLocaleString('ja-JP')}`
              : browser.i18n.getMessage('no_price')}
          </span>
          {kakakuItem ? (
            <Tooltip
              content={<KakakuItemTooltipContent kakakuItem={kakakuItem} />}
              trigger={
                <InformationCircleIcon
                  className={clsx([
                    'w-5',
                    'h-5',
                    'tw-block',
                    'text-gray-600',
                    'dark:text-slate-500',
                    'cursor-pointer',
                  ])}
                />
              }
              removePadding
            />
          ) : null}
          <PencilSquareIcon
            className={clsx([
              'ml-2',
              '-translate-y-[1px]',
              'w-5',
              'h-5',
              'text-gray-600',
              'dark:text-slate-500',
              'cursor-pointer',
            ])}
            onClick={onEditClick}
          />
        </>
      )}
      {!searching && !kakakuItem && !customPrice && (
        <>
          <span>{browser.i18n.getMessage('no_results')}</span>
          <MagnifyingGlassIcon
            className={clsx([
              'ml-2',
              'w-5',
              'h-5',
              'text-gray-600',
              'dark:text-slate-500',
              'cursor-pointer',
            ])}
            onClick={openDialog}
          />
        </>
      )}
    </div>
  );
}
