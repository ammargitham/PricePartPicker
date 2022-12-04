import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { KakakuItem } from '@src/types';

import KakakuPriceContent from '../KakakuPriceContent';

export default {
  title: 'Components/KakakuPrice/KakakuPriceContent',
  component: KakakuPriceContent,
} as ComponentMeta<typeof KakakuPriceContent>;

const getPartPickerTable = (component: JSX.Element) => {
  return (
    <div
      className="dark-mode"
      style={{
        backgroundColor: '#282838',
        color: 'white',
      }}
    >
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
                      <th className="th__price">Price</th>
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
                      <td className="td__price">
                        <h6 className="xs-block md-hide">Price</h6>¥28480.00
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

const kakakuItem: KakakuItem = {
  itemUrl: 'https://kakaku.com/item/K0001299539/',
  kakakuId: 'K0001299539',
  name: 'Ryzen 5 5600X BOX',
  price: 22979,
  imgUrl: 'https://img1.kakaku.k-img.com/images/productimage/l/K0001299539.jpg',
  maker: 'AMD',
  releaseDate: {
    year: 2020,
    month: 11,
    day: 6,
  },
  itemDetails: ['test1', 'test2'],
  shop: {
    name: 'モバイル一番',
    itemUrl:
      'https://c.kakaku.com/forwarder/forward.aspx?ShopCD=3172&PrdKey=K0001299539&Url=http%3A%2F%2Fmobileshop%2Eshop28%2Emakeshop%2Ejp%2Fview%2Fitem%2F000000001416&Hash=75764bd35270d26904b0b591e255d07e',
  },
};

export const WithItem = (): JSX.Element =>
  getPartPickerTable(<KakakuPriceContent kakakuItem={kakakuItem} />);
