import React, { useState } from 'react';

import { ComponentMeta } from '@storybook/react';

import { KakakuItem, KakakuItemShop } from '@src/types';

import KakakuItemShopSelect from '../KakakuItemShopSelect';
import KakakuPriceContent from '../KakakuPriceContent';

export default {
  title: 'Components/KakakuPrice/KakakuPriceContent',
  component: KakakuPriceContent,
} as ComponentMeta<typeof KakakuPriceContent>;

const getPartPickerTable = (
  component: JSX.Element,
  shops?: KakakuItemShop[],
  shopId?: number,
  onShopIdChange?: (id: number) => void,
) => {
  return (
    <div className="wrapper wrapper__pageContent">
      <div
        id="user-saved-partlists"
        className="main-content xs-col-12 md-col-9 lg-col-9 p-4"
      >
        <div id="partlist_render">
          <div className="partlist__wrapper">
            <div className="block">
              <div className="block partlist partlist--view clearfix">
                <table className="xs-col-12" data-kakaku="true">
                  <thead>
                    <tr>
                      <th className="th__component">Component</th>
                      <th></th>
                      <th className="th__selection" colSpan={2}>
                        Selection
                      </th>
                      <th
                        data-kakaku="true"
                        style={{ paddingRight: '1rem', minWidth: '9rem' }}
                      >
                        kakaku.com
                        <br />
                        Price
                      </th>
                      <th data-kakaku="true" className="th__where">
                        Where
                      </th>
                      <th className="th__buy"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tr__product">
                      <td className="td__component">
                        <a href="/products/cpu/">CPU</a>
                      </td>
                      <td className="td__placement--empty"></td>
                      <td className="td__image">
                        <a
                          href="https://pcpartpicker.com/product/g94BD3/amd-ryzen-5-5600x-37-ghz-6-core-processor-100-100000065box"
                          className=""
                        >
                          <img
                            src="https://cdna.pcpartpicker.com/static/forever/images/product/3ef757133d38ac40afe75da691ba7d60.256p.jpg"
                            className=""
                            alt="AMD Ryzen 5 5600X 3.7 GHz 6-Core Processor"
                          />
                        </a>
                      </td>
                      <td className="td__name">
                        <a href="https://pcpartpicker.com/product/g94BD3/amd-ryzen-5-5600x-37-ghz-6-core-processor-100-100000065box">
                          AMD Ryzen 5 5600X 3.7 GHz 6-Core Processor
                        </a>
                      </td>
                      <td data-kakaku="true">{component}</td>
                      <td data-kakaku="true" className="td__where">
                        <h6 className="xs-block md-hide">Where</h6>
                        <KakakuItemShopSelect
                          shops={shops}
                          value={shopId}
                          onChange={onShopIdChange}
                        />
                      </td>
                      <td className="td__buy">
                        <a className="button button--small button--success button--disabled">
                          Buy
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NoResults = (): JSX.Element =>
  getPartPickerTable(<KakakuPriceContent />);

export const Searching = (): JSX.Element =>
  getPartPickerTable(<KakakuPriceContent searching />);

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
  ['test1', 'test2'],
  undefined,
  [
    {
      id: 1,
      name: 'モバイル一番',
      itemUrl:
        'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=3172&PrdKey=K0001299539&Url=http%3A%2F%2Fmobileshop%2Eshop28%2Emakeshop%2Ejp%2Fview%2Fitem%2F000000001416&Hash=75764bd35270d26904b0b591e255d07e',
      price: 12000,
    },
    {
      id: 2,
      name: 'モバイル一番 123',
      itemUrl:
        'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=3172&PrdKey=K0001299539&Url=http%3A%2F%2Fmobileshop%2Eshop28%2Emakeshop%2Ejp%2Fview%2Fitem%2F000000001416&Hash=75764bd35270d26904b0b591e255d07e',
      price: 18000,
    },
  ],
  2,
);

export const WithItem = (): JSX.Element => {
  const [shopId, setShopId] = useState<number | undefined>(
    kakakuItem.selectedShopId,
  );

  return getPartPickerTable(
    <KakakuPriceContent kakakuItem={kakakuItem} />,
    kakakuItem.shops,
    shopId,
    (v) => {
      kakakuItem.selectedShopId = v;
      setShopId(v);
    },
  );
};
