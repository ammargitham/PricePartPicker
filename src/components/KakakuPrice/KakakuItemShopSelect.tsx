import React, { useMemo } from 'react';

import { KakakuItemShop } from '@src/types';

import ListBox, { ListOption } from '../ListBox';
import KakakuItemShopListItem from './KakakuItemShopListItem';

interface KakakuItemShopSelectProps {
  shops?: KakakuItemShop[];
  value?: number;
  onChange?: (id: number) => void;
}

function KakakuItemShopSelect({
  shops = [],
  value,
  onChange,
}: KakakuItemShopSelectProps): JSX.Element {
  const shopOptions: ListOption[] = useMemo(() => {
    if (!shops) {
      return [];
    }
    return shops.map((shop): ListOption => {
      return {
        key: shop.id,
        value: shop.id.toString(),
        content: <KakakuItemShopListItem shop={shop} />,
      };
    });
  }, [shops]);

  return (
    <ListBox
      placeholder="Choose a store"
      value={value?.toString()}
      options={shopOptions}
      onChange={(v) => onChange?.(parseInt(v, 10))}
    />
  );
}

export default KakakuItemShopSelect;
