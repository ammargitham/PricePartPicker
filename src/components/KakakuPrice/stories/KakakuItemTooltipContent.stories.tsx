import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { KakakuItem } from '@src/types';

import KakakuItemTooltipContent from '../KakakuItemTooltipContent';

export default {
  title: 'Components/KakakuPrice/KakakuItemTooltipContent',
  component: KakakuItemTooltipContent,
} as ComponentMeta<typeof KakakuItemTooltipContent>;

const kakakuItem = new KakakuItem(
  'K0001299539',
  'Ryzen 5 5600X BOX',
  'AMD',
  22979,
  'https://img1.kakaku.k-img.com/images/productimage/l/K0001299539.jpg',
  'https://kakaku.com/item/K0001299539/',
  {
    year: 2020,
    month: 11,
    day: 6,
  },
  [
    'B550チップセット搭載のゲーミングMini-ITXマザーボード（ソケットAM4）。Ryzen 5000シリーズに対応する。',
    'test2',
  ],
  {
    rating: 3.5,
    ratingText: '3.5',
  },
  [
    {
      id: 1,
      name: 'モバイル一番',
      itemUrl:
        'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=3172&PrdKey=K0001299539&Url=http%3A%2F%2Fmobileshop%2Eshop28%2Emakeshop%2Ejp%2Fview%2Fitem%2F000000001416&Hash=75764bd35270d26904b0b591e255d07e',
    },
  ],
);

export const Default = (): JSX.Element => (
  <div
    className="min-w-[5rem] max-w-[25rem] w-fit z-10 text-gray-500
    bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400
    dark:border-gray-600 dark:bg-gray-800"
  >
    <KakakuItemTooltipContent kakakuItem={kakakuItem} />
  </div>
);
