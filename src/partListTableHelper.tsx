import React from 'react';
import ReactDOM from 'react-dom';

import KakakuPrice from './components/KakakuPrice';
import { KakakuItem, Part } from './types';
import { getFullName, insertAfter } from './utils';

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
          if (nameCell && item) {
            updateName(nameCell, item);
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

function updateName(nameCell: HTMLTableCellElement, item: KakakuItem) {
  const kakakuName = createKakakuItemNameElement(item);
  const existing = nameCell.querySelector('a.price-part-picker.name');
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
