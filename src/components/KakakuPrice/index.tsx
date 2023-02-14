import React, { useEffect, useState } from 'react';

import { addPartProxy } from '@src/dbHelper';
import useKakakuSearch from '@src/hooks/useKakakuSearch';
import { CustomPrice, KakakuItem, Part } from '@src/types';

import Dialog from '../Dialog';
import KakakuPriceContent from './KakakuPriceContent';
import SearchDialogContent from './SearchDialogContent';

interface KakakuPriceProps {
  part: Part;
  onItemChange?: (kakakuItem?: KakakuItem, customPrice?: CustomPrice) => void;
}

export default function KakakuPrice({
  part,
  onItemChange,
}: KakakuPriceProps): JSX.Element {
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const { kakakuItem, searching, resultPage, dbPart, search } =
    useKakakuSearch(part);

  const openDialog = () => setShowSearchDialog(true);
  const closeDialog = () => setShowSearchDialog(false);

  useEffect(() => {
    onItemChange?.(kakakuItem, dbPart?.customPrice);
  }, [dbPart?.customPrice, kakakuItem, onItemChange]);

  return (
    <>
      <KakakuPriceContent
        searching={searching}
        showSearchDialog={showSearchDialog}
        kakakuItem={kakakuItem}
        customPrice={dbPart?.customPrice}
        openDialog={openDialog}
        onEditClick={openDialog}
      />
      {showSearchDialog && (
        <Dialog open hideCloseButton onDismiss={closeDialog}>
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
              addPartProxy({ part, kakakuItem: r });
              closeDialog();
            }}
            onSaveCustomPrice={(customPrice) => {
              addPartProxy({ part, customPrice });
              closeDialog();
            }}
          />
        </Dialog>
      )}
    </>
  );
}
