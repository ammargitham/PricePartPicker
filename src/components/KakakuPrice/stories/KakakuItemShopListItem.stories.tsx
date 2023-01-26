import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { KakakuItemShop } from '@src/types';

import KakakuItemShopListItem from '../KakakuItemShopListItem';

export default {
  title: 'Components/KakakuPrice/KakakuItemShopListItem',
  component: KakakuItemShopListItem,
} as ComponentMeta<typeof KakakuItemShopListItem>;

const tempShop: KakakuItemShop = {
  id: 1,
  name: 'ドスパラ',
  // nameIconUrl: 'https://img1.kakaku.k-img.com/images/icon_kaago.gif',
  shopArea: '東京',
  itemUrl:
    'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=1547&PrdKey=K0001402497&Url=https%3A%2F%2Fwww%2Edospara%2Eco%2Ejp%2F5shopping%2Fdetail%5Fparts%2Ephp%3Fbg%3D1%26br%3D21%26sbr%3D1297%26ic%3D477144%26utm%5Fsource%3Dkakaku%2Ecom%26utm%5Fmedium%3Dreferral%26utm%5Fcampaign%3Dkakaku%5Fparts%5Fcamp%26%5Fbdadid%3DJPGTE5%2E00002isv&Hash=09b55f83484a27b25043f4afae2c201e',
  price: 27980,
  // years: 16,
  // rank: 5,
  // paymentMethods: {
  //   card: true,
  //   cash: true,
  //   transfer: false,
  //   cvs: true,
  //   kakakuPay: {
  //     card: true,
  //   },
  // },
};

export const Default = (): JSX.Element => (
  <div className="bg-white divide-y divide-gray-100 rounded shadow w-fit dark:bg-gray-700">
    <ul className="px-0 py-1 text-sm text-gray-700 dark:text-gray-200">
      <KakakuItemShopListItem shop={tempShop} />
    </ul>
  </div>
);
