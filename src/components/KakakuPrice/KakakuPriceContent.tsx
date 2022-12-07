import React from 'react';

import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
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
    <div className="flex flex-row items-center">
      {!showSearchDialog && searching && (
        <Loader className="w-5 h-5 text-gray-600 dark:text-slate-500" />
      )}
      {kakakuItem && (
        <>
          <span className="font-bold text-sm mr-2">
            {kakakuItem.price
              ? `¥${kakakuItem.price.toLocaleString('ja-JP')}`
              : 'No price'}
          </span>
          <Tooltip
            className="px-0 py-0 max-w-[30rem] text-sm font-light border-t-white dark:border-t-white"
            arrowClassName="!z-[1] before:!bg-white after:!bg-white
            before:!border-white after:!border-white dark:before:!border-white
            dark:after:!border-white"
            label={<KakakuItemTooltipContent kakakuItem={kakakuItem} />}
          >
            <InformationCircleIcon className="w-5 h-5 tw-block text-gray-600 dark:text-slate-500 cursor-pointer" />
          </Tooltip>
          <PencilSquareIcon
            className="ml-2 -translate-y-[1px] w-5 h-5 text-gray-600 dark:text-slate-500 cursor-pointer"
            onClick={onEditClick}
          />
        </>
      )}
      {!searching && !kakakuItem && (
        <>
          <span>No results</span>
          <MagnifyingGlassIcon
            className="ml-2 w-5 h-5 text-gray-600 dark:text-slate-500 cursor-pointer"
            onClick={openDialog}
          />
        </>
      )}
    </div>
  );
}
