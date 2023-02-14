import React from 'react';

import clsx from 'clsx';
import browser from 'webextension-polyfill';

import { KakakuItemShop } from '@src/types';

interface KakakuItemShopListItemProps {
  shop: KakakuItemShop;
  isSelected?: boolean;
}

function KakakuItemShopListItem({
  shop,
  isSelected,
}: KakakuItemShopListItemProps): JSX.Element {
  // const rankBadgeColor = useMemo(() => {
  //   switch (shop.rank) {
  //     case 5:
  //       return 'gold';
  //     case 10:
  //       return 'light-gold';
  //     default:
  //       return 'default';
  //   }
  // }, [shop.rank]);

  // const yearsBadgeColor = useMemo(() => {
  //   if (!shop.years) {
  //     return 'default';
  //   }
  //   if (shop.years >= 1 && shop.years <= 9) {
  //     return 'bronze';
  //   }
  //   if (shop.years >= 10 && shop.years <= 14) {
  //     return 'silver';
  //   }
  //   return 'gold';
  // }, [shop.years]);

  // const crownIcon = useMemo(
  //   () => (
  //     <svg className="w-3 h-3 mr-1" x="0px" y="0px" viewBox="0 0 220 220">
  //       <path
  //         d="M220,98.865c0-12.728-10.355-23.083-23.083-23.083s-23.083,10.355-23.083,23.083c0,5.79,2.148,11.084,5.681,15.14
  //         l-23.862,21.89L125.22,73.002l17.787-20.892l-32.882-38.623L77.244,52.111l16.995,19.962l-30.216,63.464l-23.527-21.544
  //         c3.528-4.055,5.671-9.344,5.671-15.128c0-12.728-10.355-23.083-23.083-23.083C10.355,75.782,0,86.137,0,98.865
  //         c0,11.794,8.895,21.545,20.328,22.913l7.073,84.735H192.6l7.073-84.735C211.105,120.41,220,110.659,220,98.865z"
  //       />
  //     </svg>
  //   ),
  //   [],
  // );

  return (
    <div
      // hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white
      // px-4 py-2
      className={clsx([
        'inline-flex',
        'flex-row',
        'gap-10',
        'items-center',
        'justify-between',
        'w-full',
        'min-w-[12rem]',
        'text-sm',
        isSelected ? ['text-white'] : ['text-black', 'dark:text-white'],
      ])}
    >
      <div className={clsx(['flex', 'flex-col', 'gap-3'])}>
        <div className={clsx(['flex', 'flex-row', 'gap-2', 'items-center'])}>
          <span>{shop.name || ''}</span>
          {shop.shopArea ? (
            <span
              className={clsx(['text-gray-400', 'dark:text-gray-400'])}
            >{`(${shop.shopArea})`}</span>
          ) : null}
          {/*
            {shop.nameIconUrl ? (
              <img className="w-4 h-4" src={shop.nameIconUrl} />
            ) : null}
            {shop.years ? (
              <Badge color={yearsBadgeColor}>{`${shop.years} years`}</Badge>
            ) : null}
            {shop.rank ? (
              <Badge color={rankBadgeColor}>
                <div className="flex flex-row items-center">
                  {crownIcon}
                  {`TOP ${shop.rank}`}
                </div>
              </Badge>
            ) : null}
          */}
        </div>
        {/* 
          <div className="flex flex-row gap-2">
            <Badge color="dark-green" disabled={!shop.paymentMethods?.card}>
              Card
            </Badge>
            <Badge color="dark-green" disabled={!shop.paymentMethods?.cash}>
              COD
            </Badge>
            <Badge color="dark-green" disabled={!shop.paymentMethods?.transfer}>
              Transfer
            </Badge>
            <Badge color="dark-green" disabled={!shop.paymentMethods?.cvs}>
              Conbini
            </Badge>
          </div>
          {shop.paymentMethods?.kakakuPay ? (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-left">kakaku.com Pay</span>
              <div className="flex flex-row gap-2">
                <Badge
                  color="dark-green"
                  disabled={!shop.paymentMethods?.kakakuPay?.card}
                >
                  Card
                </Badge>
                <Badge
                  color="dark-green"
                  disabled={!shop.paymentMethods?.kakakuPay?.transfer}
                >
                  Transfer
                </Badge>
                <Badge
                  color="dark-green"
                  disabled={!shop.paymentMethods?.kakakuPay?.cvs}
                >
                  Conbini
                </Badge>
              </div>
            </div>
          ) : null}
        */}
      </div>
      <span className={clsx(['text-lg', 'font-semibold'])}>
        {shop.price !== undefined
          ? `¥${shop.price.toLocaleString('ja-JP')}`
          : browser.i18n.getMessage('no_price')}
      </span>
    </div>
  );
}

export default KakakuItemShopListItem;
