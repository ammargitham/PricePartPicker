import React from 'react';

import clsx from 'clsx';
import browser from 'webextension-polyfill';

import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';

import { KakakuItem } from '@src/types';

import Loader from '../Icons/Loader';
import Tooltip from '../Tooltip';
import KakakuItemTooltipContent from './KakakuItemTooltipContent';

interface KakakuPriceContentProps {
  searching?: boolean;
  showSearchDialog?: boolean;
  kakakuItem?: KakakuItem;
  openDialog?: () => void;
  onEditClick?: () => void;
}

export default function KakakuPriceContent({
  searching = false,
  showSearchDialog = false,
  kakakuItem,
  openDialog,
  onEditClick,
}: KakakuPriceContentProps): JSX.Element {
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
      {!searching && kakakuItem && (
        <>
          <span className={clsx(['font-bold', 'text-sm', 'mr-2'])}>
            {kakakuItem.price
              ? `¥${kakakuItem.price.toLocaleString('ja-JP')}`
              : browser.i18n.getMessage('no_price')}
          </span>
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
      {!searching && !kakakuItem && (
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
