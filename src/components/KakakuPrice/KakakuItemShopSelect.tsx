import React, { useMemo } from 'react';

import { KakakuItemShop } from '@src/types';

import Select, { Option } from '../Select';
import KakakuItemShopListItem from './KakakuItemShopListItem';

interface KakakuItemShopSelectProps {
  shops?: KakakuItemShop[];
  value?: number;
  onChange?: (id: number) => void;
}

function KakakuItemShopSelect({
  shops,
  value,
  onChange,
}: KakakuItemShopSelectProps): JSX.Element {
  const shopOptions: Option[] = useMemo(() => {
    if (!shops) {
      return [];
    }
    return shops.map((shop): Option => {
      return {
        key: shop.id,
        value: shop.id.toString(),
        text: shop.name || '',
        content: <KakakuItemShopListItem shop={shop} />,
      };
    });
  }, [shops]);

  return (
    <Select
      placeholder={shops?.length ? 'Choose a shop' : 'No shops'}
      value={value?.toString()}
      options={shopOptions}
      disabled={!shops || !shops.length}
      onChange={(v) => onChange?.(parseInt(v, 10))}
    />
  );
}

export default KakakuItemShopSelect;
