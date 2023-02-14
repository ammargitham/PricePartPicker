import React, { useEffect, useMemo, useState } from 'react';

import browser from 'webextension-polyfill';

import { KakakuItemShop } from '@src/types';

import Select, { Option } from '../Select';
import KakakuItemShopListItem from './KakakuItemShopListItem';

const { getMessage } = browser.i18n;

interface KakakuItemShopSelectProps {
  shops?: KakakuItemShop[];
  value?: number;
  hasCustomPrice?: boolean;
  onChange?: (id: number) => void;
}

function KakakuItemShopSelect({
  shops,
  value,
  hasCustomPrice,
  onChange,
}: KakakuItemShopSelectProps): JSX.Element {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const shopOptions: Option[] = useMemo(() => {
    if (!shops) {
      return [];
    }
    return shops.map((shop): Option => {
      return {
        key: shop.id,
        value: shop.id.toString(),
        text: shop.name || '',
        content: (isSelected) => (
          <KakakuItemShopListItem shop={shop} isSelected={isSelected} />
        ),
      };
    });
  }, [shops]);

  const placeholder = useMemo(() => {
    if (hasCustomPrice) {
      return getMessage('using_custom_price');
    }
    if (shops?.length) {
      return getMessage('choose_a_shop');
    }
    return getMessage('no_shops');
  }, [hasCustomPrice, shops?.length]);
  return (
    <Select
      placeholder={placeholder}
      value={localValue?.toString()}
      options={shopOptions}
      disabled={hasCustomPrice || !shops || !shops.length}
      onChange={(v) => {
        const tempVal = parseInt(v, 10);
        // workaround for delayed select value change
        setLocalValue(tempVal);
        onChange?.(tempVal);
      }}
    />
  );
}

export default KakakuItemShopSelect;
