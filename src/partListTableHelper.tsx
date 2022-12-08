import React from 'react';
import ReactDOM from 'react-dom';

import KakakuPrice from './components/KakakuPrice';
import { KakakuItem, Part } from './types';
import { getFullName, htmlToElement, insertAfter } from './utils';

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
      'th.th__base, th.th__promo, th.th__shipping, th.th__tax, th.th__settings',
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
  const kakakuHeaderPriceCell = document.createElement('th');
  kakakuHeaderPriceCell.dataset.kakaku = 'true';
  kakakuHeaderPriceCell.innerHTML = 'kakaku.com<br>Price';
  kakakuHeaderPriceCell.style.paddingRight = '1rem';
  kakakuHeaderPriceCell.style.minWidth = '9rem';
  // headerRow.insertBefore(kakakuHeaderPriceCell, partPickerPriceCell);
  insertAfter(kakakuHeaderPriceCell, partPickerPriceCell);

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
  const kakakuTotalPriceCell = document.createElement('td');
  kakakuTotalPriceCell.dataset.kakaku = 'true';
  kakakuTotalPriceCell.style.fontSize = '1.25rem';
  kakakuTotalPriceCell.style.fontWeight = '700';
  kakakuTotalPriceCell.textContent = '¥0';
  // kakakuTotalPriceCell = totalRow.insertBefore(kakakuTotalPriceCell, priceCell);
  insertAfter(kakakuTotalPriceCell, priceCell);

  const rows: NodeListOf<HTMLTableRowElement> = partListTable.querySelectorAll(
    'tbody tr.tr__product',
  );
  // console.log(rows);
  rows.forEach((row, i) => {
    // cells in the list page table
    const otherPriceCells: NodeListOf<HTMLTableCellElement> =
      row.querySelectorAll(
        'td.td__base, td.td__promo, td.td__shipping, td.td__tax, td.td__settings',
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
    const kakakuPriceCell = document.createElement('td');
    kakakuPriceCell.dataset.kakaku = 'true';
    kakakuPriceCell.textContent = '';
    // kakakuPriceCell = row.insertBefore(kakakuPriceCell, priceCell);
    insertAfter(kakakuPriceCell, priceCell);

    // get name cell
    const nameCell: HTMLTableCellElement | null =
      row.querySelector('td.td__name');

    const buyButton: HTMLAnchorElement | null = row.querySelector(
      'td.td__buy > a.button',
    );

    const whereCell: HTMLTableCellElement | null =
      row.querySelector('td.td__where');

    const part = parts[i];
    if (!part) {
      return;
    }
    ReactDOM.render(
      <KakakuPrice
        part={part}
        onItemChange={(item) => {
          partPrices[part.partPickerId] = item?.price;
          updateTotal(kakakuTotalPriceCell, partPrices);
          if (nameCell) {
            updateName(nameCell, item);
          }
          if (buyButton) {
            updateBuyButton(buyButton, item);
          }
          if (whereCell) {
            updateWhere(whereCell, item);
          }
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

function updateName(nameCell: HTMLTableCellElement, item?: KakakuItem) {
  const existing = nameCell.querySelector('a.price-part-picker.name');
  if (!item) {
    if (existing) {
      // remove the name
      existing.remove();
    }
    return;
  }
  const kakakuName = createKakakuItemNameElement(item);
  if (existing) {
    nameCell.replaceChild(kakakuName, existing);
    return;
  }
  nameCell.appendChild(kakakuName);
}

function createKakakuItemNameElement(item: KakakuItem) {
  const a = document.createElement('a');
  a.href = item.itemUrl;
  a.classList.add('price-part-picker', 'name');
  const span = document.createElement('span');
  span.classList.add('kakaku');
  span.textContent = 'kakaku.com:';
  a.appendChild(span);
  const text = document.createTextNode(getFullName(item.name, item.maker));
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
    const icon = buyButton.querySelector('svg.icon');
    if (icon) {
      buyButton.removeChild(icon);
    }
    return;
  }
  buyButton.target = '_blank';
  buyButton.rel = 'noopener noreferrer';
  buyButton.href = (item.shop && item.shop.itemUrl) || item.itemUrl;
  const firstChild = buyButton.firstChild;
  if (firstChild) {
    firstChild.textContent =
      item.shop && item.shop.itemUrl ? 'Go to shop page' : 'Go to product page';
  }
  buyButton.classList.remove('button--disabled');
  const icon = buyButton.querySelector('svg.icon');
  if (icon) {
    return;
  }
  buyButton.appendChild(newTabIcon.cloneNode(true));
}

function updateWhere(whereCell: HTMLTableCellElement, item?: KakakuItem) {
  // remove any kakaku link previously present
  const kakakuLink = whereCell.querySelector('a[data-kakaku="true"]');
  kakakuLink?.remove();

  if (!item || !item.shop) {
    // un-hide any other link
    const originalLink = whereCell.querySelector('a');
    if (originalLink) {
      originalLink.style.display = 'block';
      return;
    }
    // add td--empty class
    whereCell.classList.add('td--empty');
    return;
  }
  // hide any link already present
  const originalLink = whereCell.querySelector('a');
  if (originalLink) {
    originalLink.style.display = 'none';
  }
  // add our kakaku link
  const link = document.createElement('a');
  link.dataset['kakaku'] = 'true';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.href = item.shop.itemUrl || '';
  link.textContent = item.shop.name || '';
  link.style.width = 'auto';
  whereCell.classList.remove('td--empty');
  whereCell.appendChild(link);
}
