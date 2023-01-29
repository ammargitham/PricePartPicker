import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { emptyResultPage } from '@src/constants';
import {
  KakakuItem,
  KakakuItemRating,
  Part,
  SearchResultPage,
} from '@src/types';

import SearchDialogContent from '../SearchDialogContent';

export default {
  title: 'Components/KakakuPrice/SearchDialogContent',
  component: SearchDialogContent,
} as ComponentMeta<typeof SearchDialogContent>;

const testPart: Part = {
  name: 'AMD Ryzen 5 5600X 3.7 GHz 6-Core Processor',
  partPickerId: '1234',
  type: 'cpu',
  typeName: 'CPU',
  imgUrl:
    'https://cdna.pcpartpicker.com/static/forever/images/product/3ef757133d38ac40afe75da691ba7d60.256p.jpg',
};

export const Default = (): JSX.Element => (
  <div style={{ width: '50vw' }}>
    <SearchDialogContent
      part={testPart}
      onSearch={(q) => {
        alert(q);
        return Promise.resolve(emptyResultPage);
      }}
    />
  </div>
);

export const DefaultFetching = (): JSX.Element => (
  <div style={{ width: '50vw' }}>
    <SearchDialogContent part={testPart} searching={true} />
  </div>
);

// const testResults: SearchResult[] = Array.from({ length: 10 }).map(
//   (_, i: number) => {
//     return {
//       name: `test${i}`,
//       maker: `test maker ${i}`,
//       price: 30000,
//       itemUrl: `test${i}`,
//       imgUrl: 'https://picsum.photos/120',
//     };
//   },
// );

const testResultPage: SearchResultPage = {
  query: {
    query: 'AMD Ryzen 5600X',
  },
  results: [
    {
      kakakuId: 'K0001299539',
      maker: 'AMD',
      name: 'Ryzen 5 5600X BOX',
      price: 22979,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001299539.jpg',
      itemUrl: 'https://kakaku.com/item/K0001299539/',
      releaseDate: {
        year: 2020,
        month: 11,
        day: 6,
      },
      rating: {
        rating: 4,
        ratingText: '4',
        numReviews: 33,
      } as KakakuItemRating,
    },
    {
      kakakuId: 'K0001410627',
      maker: 'マウスコンピューター',
      name: 'DAIV A5-1050Ti Ryzen 5 5600X/GTX 1050Ti/16GBメモリ/512GB NVMe SSD+1TB HDD搭載モデル #2112A5-X570W1...',
      price: 119900,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001410627.jpg',
      itemUrl: 'https://kakaku.com/item/K0001410627/',
      releaseDate: {
        year: 2021,
        month: 12,
        day: 20,
      },
    },
    {
      kakakuId: 'K0001458907',
      maker: 'アプライド',
      name: 'Katamen-417441 Ryzen 5 5600X/16GBメモリ/500GB NVMe SSD/RTX 3060Ti搭載モデル',
      price: 159800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001458907.jpg',
      itemUrl: 'https://kakaku.com/item/K0001458907/',
      releaseDate: {
        year: 2022,
        month: 7,
        day: 15,
      },
    },
    {
      kakakuId: 'K0001414187',
      maker: 'アプライド',
      name: 'Barikata-343133 Ryzen 5 5600X/8GBメモリ/500GB NVMe SSD搭載モデル',
      price: 99800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001414187.jpg',
      itemUrl: 'https://kakaku.com/item/K0001414187/',
      releaseDate: {
        year: 2022,
        month: 1,
        day: 6,
      },
    },
    {
      kakakuId: 'K0001471401',
      maker: 'アプライド',
      name: 'Sengoku-418411 Ryzen 5 5600X/16GBメモリ/512GB NVMe SSD/RTX 3050搭載モデル',
      price: 139800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001471401.jpg',
      itemUrl: 'https://kakaku.com/item/K0001471401/',
      releaseDate: {
        year: 2022,
        month: 9,
        day: 9,
      },
    },
    {
      kakakuId: 'K0001447026',
      maker: 'パソコンショップSEVEN',
      name: 'ZEFT Ryzen 5 5600X/RTX 3080/16GBメモリ/M.2 SSD 500GB 価格.com限定モデル',
      price: 271480,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001447026.jpg',
      itemUrl: 'https://kakaku.com/item/K0001447026/',
      releaseDate: {
        year: 2022,
        month: 5,
        day: 27,
      },
    },
    {
      kakakuId: 'K0001397394',
      maker: 'iiyama',
      name: 'LEVEL-M0P5-R56X-SAX Ryzen 5 5600X/16GBメモリ/500GB SSD/RTX 3060Ti/700W',
      price: 184800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001397394.jpg',
      itemUrl: 'https://kakaku.com/item/K0001397394/',
      releaseDate: {
        year: 2021,
        month: 11,
        day: 5,
      },
    },
    {
      kakakuId: 'K0001402653',
      maker: 'iiyama',
      name: 'LEVEL-R6X5-LCR56X-SAX [RGB Build] Ryzen 5 5600X/16GBメモリ/1TB SSD/RTX 3060Ti/700W',
      price: 229700,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001402653.jpg',
      itemUrl: 'https://kakaku.com/item/K0001402653/',
      releaseDate: {
        year: 2021,
        month: 11,
        day: 30,
      },
    },
    {
      kakakuId: 'K0001406192',
      maker: 'FRONTIER',
      name: 'FRGXB550/KD50 価格.com限定/Ryzen 5 5600X/32GBメモリ/512GB NVMe SSD/GTX 1660 SUPER/カスタマイズ対応',
      price: 155800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001406192.jpg',
      itemUrl: 'https://kakaku.com/item/K0001406192/',
      releaseDate: {
        year: 2021,
        month: 12,
        day: 9,
      },
    },
    {
      kakakuId: 'K0001463891',
      maker: 'アプライド',
      name: 'Barikata-417494 Ryzen 5 5600X/16GBメモリ/1TB NVMe SSD搭載モデル [White]',
      price: 129800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001463891.jpg',
      itemUrl: 'https://kakaku.com/item/K0001463891/',
      releaseDate: {
        year: 2022,
        month: 8,
        day: 1,
      },
    },
    {
      kakakuId: 'K0001415042',
      maker: 'iiyama',
      name: 'LEVEL-M0P5-R56X-RBX Ryzen 5 5600X/16GBメモリ/500GB SSD/RTX 3060/700W',
      price: 169800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001415042.jpg',
      itemUrl: 'https://kakaku.com/item/K0001415042/',
      releaseDate: {
        year: 2022,
        month: 1,
        day: 11,
      },
    },
    {
      kakakuId: 'K0001395617',
      maker: 'Dell',
      name: 'ALIENWARE AURORA Ryzen Edition R14 フルカスタマイズ Ryzen 5 5600X・16GBメモリ・512GB SSD・RX 6600 XT・Win...',
      price: 216400,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001395617.jpg',
      itemUrl: 'https://kakaku.com/item/K0001395617/',
      releaseDate: {
        year: 2021,
        month: 10,
        day: 29,
      },
    },
    {
      kakakuId: 'K0001445583',
      maker: 'iiyama',
      name: 'LEVEL-R7X6-R56X-TAX Ryzen 5 5600X/16GBメモリ/500GB SSD/RTX 3070/700W',
      price: 194800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001445583.jpg',
      itemUrl: 'https://kakaku.com/item/K0001445583/',
    },
    {
      kakakuId: 'K0001488496',
      maker: 'iiyama',
      name: 'SENSE-MWP5-R56X-INX Ryzen 5 5600X/16GBメモリ/500GB M.2 SSD/GT 1030/500W',
      price: 114800,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001488496.jpg',
      itemUrl: 'https://kakaku.com/item/K0001488496/',
    },
    {
      kakakuId: 'K0001352417',
      maker: 'パソコンショップSEVEN',
      name: 'ZEFT Ryzen 5 5600X/RTX 3060/16GBメモリ/M.2 SSD 500GB 価格.com限定モデル',
      price: 195580,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001352417.jpg',
      itemUrl: 'https://kakaku.com/item/K0001352417/',
      releaseDate: {
        year: 2021,
        month: 4,
        day: 30,
      },
    },
    {
      kakakuId: 'K0001447028',
      maker: 'パソコンショップSEVEN',
      name: 'ZEFT Ryzen 5 5600X/RTX 3060Ti/16GBメモリ/M.2 SSD 500GB 価格.com限定モデル',
      price: 197780,
      imgUrl:
        'https://img1.kakaku.k-img.com/images/productimage/ll/K0001447028.jpg',
      itemUrl: 'https://kakaku.com/item/K0001447028/',
      releaseDate: {
        year: 2022,
        month: 5,
        day: 27,
      },
    },
  ].map(
    (item) =>
      new KakakuItem(
        item.kakakuId,
        item.name,
        item.maker,
        item.price,
        item.imgUrl,
        item.itemUrl,
        item.releaseDate,
        undefined,
        item.rating,
      ),
  ),
  filterSections: [
    {
      title: 'カテゴリ',
      options: [
        {
          name: 'すべてのカテゴリ',
          filters: {},
          isActive: true,
          isChild: false,
        },
        {
          name: 'パソコン',
          count: 365,
          filters: {
            category: '0001',
          },
          isActive: false,
          isChild: false,
        },
        {
          name: '家電',
          count: 1,
          filters: {
            category: '0002',
          },
          isActive: false,
          isChild: false,
        },
        {
          name: 'カメラ',
          count: 1,
          filters: {
            category: '0003',
          },
          isActive: false,
          isChild: false,
        },
        {
          name: 'カメラ child',
          count: 1,
          filters: {
            category: '0003',
          },
          isActive: false,
          isChild: true,
        },
      ],
    },
    {
      title: '記事・特集',
      options: [
        {
          name: '新製品ニュース',
          count: 8,
          filters: {
            category: '9996',
          },
          isActive: false,
          isChild: false,
        },
        {
          name: '特集記事',
          count: 1,
          filters: {
            category: '9997',
          },
          isActive: false,
          isChild: false,
        },
      ],
    },
    {
      title: '価格',
      options: [
        {
          name: '指定なし',
          count: 0,
          filters: {},
          isActive: true,
          isChild: false,
        },
        {
          name: '～161,999円',
          count: 24,
          filters: {
            maxp: '161999',
          },
          isActive: false,
          isChild: false,
        },
        {
          name: '162,000円～179,999円',
          count: 24,
          filters: {
            maxp: '179999',
            minp: '162000',
          },
          isActive: false,
          isChild: false,
        },
        {
          name: '180,000円～197,999円',
          count: 24,
          filters: {
            maxp: '197999',
            minp: '180000',
          },
          isActive: false,
          isChild: false,
        },
        {
          name: '198,000円～',
          count: 22,
          filters: {
            minp: '198000',
          },
          isActive: false,
          isChild: false,
        },
      ],
    },
  ],
  info: {
    totalResultsCount: 30,
    pageResultStart: 1,
    pageResultEnd: 30,
  },
  pagination: {
    pages: [
      {
        text: '1',
        current: true,
      },
      {
        text: '2',
        current: false,
        filters: {
          test: 'test',
        },
      },
    ],
  },
};

export const WithResults = (): JSX.Element => {
  return (
    <div style={{ width: '70vw' }}>
      <SearchDialogContent
        part={testPart}
        resultPage={testResultPage}
        dbPart={{
          partPickerId: 'test',
          query: testResultPage.query,
          // kakakuId: 'K0001299539',
        }}
      />
    </div>
  );
};

export const WithResultsFetching = (): JSX.Element => {
  return (
    <div style={{ width: '70vw' }}>
      <SearchDialogContent
        part={testPart}
        resultPage={testResultPage}
        searching={true}
      />
    </div>
  );
};
