import React from 'react';
import ReactDOM from 'react-dom';

import browser from 'webextension-polyfill';

import KakakuPrice from './components/KakakuPrice';
import KakakuItemShopSelect from './components/KakakuPrice/KakakuItemShopSelect';
import { addPartProxy } from './dbHelper';
import { CustomPrice, KakakuItem, Part } from './types';
import { getFullName, htmlToElement, insertAfter } from './utils';

const { getMessage } = browser.i18n;

function updateTotal(
  kakakuTotalPriceCell: HTMLTableCellElement | null,
  partPrices: Record<string, number | undefined>,
) {
  if (!kakakuTotalPriceCell) {
    return;
  }
  // console.log(partPrices);
  const total = Object.values(partPrices).reduce((prev, price) => {
    if (!price) {
      return prev;
    }
    return (prev || 0) + price;
  }, 0);
  kakakuTotalPriceCell.textContent = `¥${
    total ? total.toLocaleString('ja-JP') : 0
  }`;
}

export function addKakakuColumns(
  parts: (Part | undefined)[],
  partListTable: HTMLTableElement | null,
  partPrices: Record<string, number | undefined>,
  partPickerPriceCells?: HTMLTableCellElement[],
  options?: Record<string, unknown>,
): void {
  // console.log(parts);
  if (!partListTable) {
    return;
  }
  if (partListTable.dataset.kakaku === 'true') {
    // columns already added
    return;
  }
  // console.log(partListTable);
  const headerRow: HTMLTableRowElement | null = partListTable.querySelector(
    'thead tr:first-child',
  );
  // console.log(headerRow);
  if (!headerRow) {
    return;
  }
  // cells in the list page table
  const otherHeaderPriceCells: NodeListOf<HTMLTableCellElement> =
    headerRow.querySelectorAll(
      'th.th__base, th.th__promo, th.th__shipping, th.th__tax, th.th__settings, th.th__where',
    );
  otherHeaderPriceCells.forEach((cell) => {
    partPickerPriceCells?.push(cell);
    if (options?.pppHidden) {
      cell.style.display = 'none';
    }
  });
  const partPickerPriceCell: HTMLTableHeaderCellElement | null =
    headerRow.querySelector('th.th__price');
  if (!partPickerPriceCell) {
    return;
  }
  partPickerPriceCells?.push(partPickerPriceCell);
  if (options?.pppHidden) {
    partPickerPriceCell.style.display = 'none';
  }
  const kakakuHeaderPriceCell = createKakakuPriceHeaderCell();
  insertAfter(kakakuHeaderPriceCell, partPickerPriceCell);

  // add where column for saved parts list table
  const whereHeaderCell = createWhereHeaderCell();
  insertAfter(whereHeaderCell, kakakuHeaderPriceCell);

  // fix buy col width
  const buyHeader: HTMLTableCellElement | null =
    headerRow.querySelector('th.th__buy');
  if (buyHeader) {
    buyHeader.style.width = 'auto';
  }

  const totalRow: HTMLTableRowElement | null = partListTable.querySelector(
    'tbody tr.tr__total--final',
  );
  if (!totalRow) {
    return;
  }
  // console.log(totalRow);
  const priceCell: HTMLTableCellElement | null =
    totalRow.querySelector('td.td__price');
  if (!priceCell) {
    return;
  }
  partPickerPriceCells?.push(priceCell);
  if (options?.pppHidden) {
    priceCell.style.display = 'none';
  }
  const kakakuTotalPriceCell = createTotalPriceCell();
  insertAfter(kakakuTotalPriceCell, priceCell);

  const rows: NodeListOf<HTMLTableRowElement> = partListTable.querySelectorAll(
    'tbody tr.tr__product',
  );
  // console.log(rows);
  rows.forEach((row, i) => {
    // cells in the list page table
    const otherPriceCells: NodeListOf<HTMLTableCellElement> =
      row.querySelectorAll(
        'td.td__base, td.td__promo, td.td__shipping, td.td__tax, td.td__settings, td.td__where, td.td__locked',
      );
    otherPriceCells.forEach((cell) => {
      partPickerPriceCells?.push(cell);
      if (options?.pppHidden) {
        cell.style.display = 'none';
      }
    });

    const priceCell: HTMLTableCellElement | null =
      row.querySelector('td.td__price');
    if (!priceCell) {
      return;
    }
    partPickerPriceCells?.push(priceCell);
    if (options?.pppHidden) {
      priceCell.style.display = 'none';
    }
    const kakakuPriceCell = createPriceCell();
    insertAfter(kakakuPriceCell, priceCell);

    const whereCell = createWhereCell();
    insertAfter(whereCell, kakakuPriceCell);

    const nameCell: HTMLTableCellElement | null =
      row.querySelector('td.td__name');

    const buyButton: HTMLAnchorElement | null = row.querySelector(
      'td.td__buy > a.button',
    );

    const part = parts[i];
    if (!part) {
      return;
    }
    ReactDOM.render(
      <KakakuPrice
        part={part}
        onItemChange={(item, customPrice) => {
          partPrices[part.partPickerId] = item?.price || customPrice?.price;
          updateTotal(kakakuTotalPriceCell, partPrices);
          if (nameCell) {
            updateName(nameCell, item, customPrice);
          }
          if (buyButton) {
            updateBuyButton(buyButton, item);
          }
          updateWhere({
            whereCell,
            item,
            customPrice,
            onChange: (id) => {
              if (!item) {
                return;
              }
              const clonedItem = item.clone();
              clonedItem.selectedShopId = id;
              addPartProxy({
                part,
                kakakuItem: clonedItem,
              });
            },
          });
        }}
      />,
      kakakuPriceCell,
    );
  });

  if (options?.pppHidden) {
    // update colspans
    const tds: NodeListOf<HTMLTableCellElement> =
      partListTable.querySelectorAll('td.td__addComponent');
    tds.forEach((c) => {
      c.colSpan = 7;
    });

    // hide base and shipping rows
    const extraTotalRows: NodeListOf<HTMLTableRowElement> =
      partListTable.querySelectorAll('tr.tr__total:not(.tr__total--final)');
    extraTotalRows.forEach((tr) => {
      tr.style.display = 'none';
    });

    const finalTotalRow: HTMLTableRowElement | null =
      partListTable.querySelector('tr.tr__total.tr__total--final');
    if (finalTotalRow) {
      const firstChild =
        finalTotalRow.firstElementChild as HTMLTableCellElement | null;
      if (firstChild) {
        firstChild.colSpan = 4;
      }
    }
  }

  partListTable.dataset.kakaku = 'true';
}

function createKakakuPriceHeaderCell() {
  const kakakuHeaderPriceCell = document.createElement('th');
  kakakuHeaderPriceCell.dataset.kakaku = 'true';
  const kakakuDotCom = browser.i18n.getMessage('kakaku_com');
  const priceIntlStr = browser.i18n.getMessage('Price');
  kakakuHeaderPriceCell.innerHTML = `${kakakuDotCom}<br>${priceIntlStr}`;
  kakakuHeaderPriceCell.style.paddingRight = '1rem';
  kakakuHeaderPriceCell.style.minWidth = '9rem';
  return kakakuHeaderPriceCell;
}

function createWhereHeaderCell() {
  const whereHeaderCell = document.createElement('th');
  whereHeaderCell.dataset.kakaku = 'true';
  const kakakuDotCom = browser.i18n.getMessage('kakaku_com');
  const whereStr = browser.i18n.getMessage('where');
  whereHeaderCell.innerHTML = `${kakakuDotCom}<br>${whereStr}`;
  whereHeaderCell.style.paddingRight = '1rem';
  whereHeaderCell.style.minWidth = '9rem';
  return whereHeaderCell;
}

function createTotalPriceCell() {
  const kakakuTotalPriceCell = document.createElement('td');
  kakakuTotalPriceCell.dataset.kakaku = 'true';
  kakakuTotalPriceCell.style.fontSize = '1.25rem';
  kakakuTotalPriceCell.style.fontWeight = '700';
  kakakuTotalPriceCell.textContent = '¥0';
  return kakakuTotalPriceCell;
}

function createPriceCell() {
  const kakakuPriceCell = document.createElement('td');
  kakakuPriceCell.dataset.kakaku = 'true';
  kakakuPriceCell.textContent = '';
  return kakakuPriceCell;
}

function createWhereCell() {
  const whereCell = document.createElement('td');
  whereCell.dataset.kakaku = 'true';
  ReactDOM.render(<KakakuItemShopSelect />, whereCell);
  return whereCell;
}

function updateName(
  nameCell: HTMLTableCellElement,
  item?: KakakuItem,
  customPrice?: CustomPrice,
) {
  const existing = nameCell.querySelector('a.price-part-picker.name');
  if (!item && !customPrice) {
    if (existing) {
      // remove the name
      existing.remove();
    }
    return;
  }
  const kakakuName = createKakakuItemNameElement(item, customPrice);
  if (existing) {
    nameCell.replaceChild(kakakuName, existing);
    return;
  }
  nameCell.appendChild(kakakuName);
}

function createKakakuItemNameElement(
  item?: KakakuItem,
  customPrice?: CustomPrice,
) {
  const a = document.createElement('a');
  if (!item && !customPrice) {
    return a;
  }
  if (item) {
    a.href = item.itemUrl;
  } else if (customPrice && customPrice.url) {
    a.href = customPrice.url;
  }
  a.classList.add(
    'price-part-picker',
    'name',
    'tw-block',
    '!text-sm',
    '!font-normal',
    'italic',
    'mt-1',
  );
  if (customPrice && !customPrice.url) {
    // make anchor act as normal text, if no url
    a.classList.add(
      'hover:no-underline',
      'hover:!text-[#191b2a]',
      'hover:dark:!text-white',
    );
  }
  const span = document.createElement('span');
  span.classList.add('kakaku', 'mr-1', 'text-gray-600', 'dark:text-slate-400');
  if (item) {
    span.textContent = `${getMessage('kakaku_com')}:`;
  } else if (customPrice) {
    span.textContent = `${getMessage('custom')}:`;
  }
  a.appendChild(span);
  let textContent = '';
  if (item) {
    textContent = getFullName(item.name, item.maker);
  } else if (customPrice) {
    textContent = customPrice.name;
  }
  const text = document.createTextNode(textContent);
  a.appendChild(text);
  return a;
}

const newTabIcon = htmlToElement(`
  <svg xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    class="w-6 h-6 ml-1 icon"
    style="fill: transparent; vertical-align: sub;"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25
      2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    />
  </svg>
`);

function updateBuyButton(buyButton: HTMLAnchorElement, item?: KakakuItem) {
  if (!item) {
    buyButton.href = '#';
    buyButton.textContent = 'Buy';
    buyButton.classList.add('button--disabled');
    buyButton.classList.remove('whitespace-nowrap');
    const icon = buyButton.querySelector('svg.icon');
    if (icon) {
      buyButton.removeChild(icon);
    }
    return;
  }
  const shopUrl = item.shops?.find(
    (s) => s.id === item.selectedShopId,
  )?.itemUrl;
  buyButton.target = '_blank';
  buyButton.rel = 'noopener noreferrer';
  buyButton.href = shopUrl || item.itemUrl;
  const firstChild = buyButton.firstChild;
  if (firstChild) {
    firstChild.textContent = browser.i18n.getMessage(
      shopUrl ? 'go_to_shop_page' : 'go_to_product_page',
    );
  }
  buyButton.classList.remove('button--disabled');
  buyButton.classList.add('whitespace-nowrap');
  const icon = buyButton.querySelector('svg.icon');
  if (icon) {
    return;
  }
  buyButton.appendChild(newTabIcon.cloneNode(true));
}

interface UpdateWhereProps {
  whereCell: HTMLTableCellElement;
  item?: KakakuItem;
  customPrice?: CustomPrice;
  onChange?: (id: number) => void;
}

function updateWhere({
  whereCell,
  item,
  customPrice,
  onChange,
}: UpdateWhereProps) {
  ReactDOM.render(
    <KakakuItemShopSelect
      shops={item?.shops}
      value={item?.selectedShopId}
      hasCustomPrice={!!customPrice}
      onChange={onChange}
    />,
    whereCell,
  );
}
