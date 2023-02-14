import React, { useState } from 'react';

import clsx from 'clsx';
import deepEqual from 'deep-equal';

import { emptyResultPage } from '@src/constants';
import { DBPart } from '@src/db';
import {
  CustomPrice,
  KakakuItem,
  Part,
  Query,
  SearchResultPage,
} from '@src/types';

import CustomPriceForm from './CustomPriceForm';
import PartInfo from './PartInfo';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

interface SearchDialogContentProps {
  part: Part;
  resultPage?: SearchResultPage;
  searching?: boolean;
  dbPart?: DBPart;
  onSearch?: (query: Query) => void;
  onClose?: () => void;
  onUseQueryClick?: (page: SearchResultPage) => void;
  onUseResultClick?: (result: KakakuItem) => void;
  onSaveCustomPrice?: (customPrice: CustomPrice) => void;
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
  onSaveCustomPrice,
}: SearchDialogContentProps): JSX.Element {
  const [query, setQuery] = useState(resultPage.query);
  const [usingCustomPrice, setUsingCustomPrice] = useState(
    !!dbPart?.customPrice,
  );

  let usedKakakuId: string | undefined;
  let usedQuery: Query | undefined;
  if (dbPart) {
    usedKakakuId = dbPart.kakakuId;
    usedQuery = dbPart.query;
  }
  const isCurrentQueryUsed = deepEqual(query, usedQuery, { strict: true });

  return (
    <div
      className={clsx([
        usingCustomPrice ? ['w-[50vw]'] : ['w-[70vw]', 'max-w-[1200px]'],
        'flex',
        'flex-col',
        'max-h-[90vh]',
        'bg-white',
        'shadow',
        'dark:bg-gray-800',
        'rounded-lg',
        'text-white',
        'relative',
      ])}
    >
      <PartInfo part={part} onClose={onClose} />
      <div
        className={clsx(['px-4', 'py-2', 'flex', 'flex-col', 'overflow-auto'])}
      >
        <SearchInput
          query={query.query}
          fetching={searching}
          usingCustomPrice={usingCustomPrice}
          onChange={(q) =>
            setQuery(
              (prev): Query => ({
                ...prev,
                query: q,
              }),
            )
          }
          onSearch={() => onSearch?.(query)}
          onToggleCustomPriceClick={() => setUsingCustomPrice((prev) => !prev)}
        />
        {usingCustomPrice ? (
          <CustomPriceForm
            customPrice={dbPart?.customPrice}
            onSave={onSaveCustomPrice}
          />
        ) : (
          <SearchResults
            query={query}
            resultPage={resultPage}
            searching={searching}
            usedKakakuId={usedKakakuId}
            isCurrentQueryUsed={isCurrentQueryUsed}
            onFiltersChange={(filters) => {
              const newQuery: Query = {
                ...query,
                filters,
              };
              setQuery(newQuery);
              onSearch?.(newQuery);
            }}
            onUseResultClick={onUseResultClick}
            onUseQueryClick={() => onUseQueryClick?.(resultPage)}
          />
        )}
      </div>
    </div>
  );
}
