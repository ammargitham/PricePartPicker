import React, { useEffect, useState } from 'react';

import { Dialog } from '@reach/dialog';

import { addPartProxy } from '@src/dbHelper';
import useKakakuSearch from '@src/hooks/useKakakuSearch';
import { Part } from '@src/types';

import KakakuPriceContent from './KakakuPriceContent';
import SearchDialogContent from './SearchDialogContent';

interface KakakuPriceProps {
  part: Part;
  onPriceChange?: (price?: number) => void;
}

export default function KakakuPrice({
  part,
  onPriceChange,
}: KakakuPriceProps): JSX.Element {
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const { kakakuItem, searching, resultPage, dbPart, search } =
    useKakakuSearch(part);

  // const hasResults = !!resultPage?.results.length;

  const openDialog = () => setShowSearchDialog(true);
  const closeDialog = () => setShowSearchDialog(false);

  useEffect(() => {
    onPriceChange?.(kakakuItem?.price);
  }, [kakakuItem?.price, onPriceChange]);

  return (
    <>
      <KakakuPriceContent
        searching={searching}
        showSearchDialog={showSearchDialog}
        kakakuItem={kakakuItem}
        openDialog={openDialog}
        onEditClick={openDialog}
      />
      {showSearchDialog && (
        <Dialog
          className="w-[70vw] max-w-[1200px]"
          isOpen
          onDismiss={closeDialog}
        >
          <SearchDialogContent
            part={part}
            resultPage={resultPage}
            searching={searching}
            dbPart={dbPart}
            onClose={closeDialog}
            onSearch={search}
            onUseQueryClick={(page) => {
              // console.log(page);
              addPartProxy({ part, query: page.query });
              closeDialog();
            }}
            onUseResultClick={(r) => {
              // console.log(r);
              addPartProxy({ part, searchResult: r });
              closeDialog();
            }}
          />
        </Dialog>
      )}
    </>
  );
}
