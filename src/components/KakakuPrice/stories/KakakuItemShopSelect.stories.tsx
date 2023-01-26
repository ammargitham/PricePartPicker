import React, { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { KakakuItemShop } from '@src/types';

import KakakuItemShopSelect from '../KakakuItemShopSelect';

export default {
  title: 'Components/KakakuPrice/KakakuItemShopSelect',
  component: KakakuItemShopSelect,
} as ComponentMeta<typeof KakakuItemShopSelect>;

const tempShops: KakakuItemShop[] = [
  {
    id: 1,
    name: 'ドスパラ',
    shopArea: '東京',
    itemUrl:
      'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=1547&PrdKey=K0001402497&Url=https%3A%2F%2Fwww%2Edospara%2Eco%2Ejp%2F5shopping%2Fdetail%5Fparts%2Ephp%3Fbg%3D1%26br%3D21%26sbr%3D1297%26ic%3D477144%26utm%5Fsource%3Dkakaku%2Ecom%26utm%5Fmedium%3Dreferral%26utm%5Fcampaign%3Dkakaku%5Fparts%5Fcamp%26%5Fbdadid%3DJPGTE5%2E00002isv&Hash=09b55f83484a27b25043f4afae2c201e',
    price: 27980,
  },
  {
    id: 2,
    name: 'ドスパラ 123',
    shopArea: '東京 123',
    itemUrl:
      'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=1547&PrdKey=K0001402497&Url=https%3A%2F%2Fwww%2Edospara%2Eco%2Ejp%2F5shopping%2Fdetail%5Fparts%2Ephp%3Fbg%3D1%26br%3D21%26sbr%3D1297%26ic%3D477144%26utm%5Fsource%3Dkakaku%2Ecom%26utm%5Fmedium%3Dreferral%26utm%5Fcampaign%3Dkakaku%5Fparts%5Fcamp%26%5Fbdadid%3DJPGTE5%2E00002isv&Hash=09b55f83484a27b25043f4afae2c201e',
    price: 2798,
  },
  {
    id: 3,
    name: 'ドスパラ 456',
    shopArea: '東京 456',
    itemUrl:
      'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=1547&PrdKey=K0001402497&Url=https%3A%2F%2Fwww%2Edospara%2Eco%2Ejp%2F5shopping%2Fdetail%5Fparts%2Ephp%3Fbg%3D1%26br%3D21%26sbr%3D1297%26ic%3D477144%26utm%5Fsource%3Dkakaku%2Ecom%26utm%5Fmedium%3Dreferral%26utm%5Fcampaign%3Dkakaku%5Fparts%5Fcamp%26%5Fbdadid%3DJPGTE5%2E00002isv&Hash=09b55f83484a27b25043f4afae2c201e',
    price: 279180,
  },
];

export const Default = (): JSX.Element => {
  const [value, setValue] = useState<number | undefined>();
  return (
    <div className="w-[10rem]">
      <KakakuItemShopSelect
        shops={tempShops}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
