import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

import KakakuPrice from './components/KakakuPrice';
import { parsePartListTable } from './htmlParsers';
import { Part } from './types';

let partListTable: HTMLTableElement | null;
let kakakuTotalPriceCell: HTMLTableCellElement | undefined;
let partPrices: Record<string, number | undefined> = {};

const eventListener: EventListener = async (e) => {
  // console.log(e);
  const partListDiv = e.target as HTMLDivElement | null;
  if (!partListDiv) {
    return;
  }
  const partListTableTemp = partListDiv.querySelector('table');
  if (!partListTableTemp) {
    return;
  }
  if (partListTable) {
    // unmount prev nodes
    // console.log('prev partListTable', partListTable);
    const kakakuCells = partListTable.querySelectorAll(
      'td[data-kakaku="true"]',
    );
    kakakuCells.forEach((td) => unmountComponentAtNode(td));
  }
  // reset part prices
  partPrices = {};
  partListTable = partListTableTemp;
  const parts = parsePartListTable(partListTable);
  // console.table(parts);
  // const results = await fetchPartsInfo(parts);
  // console.table(results);
  addKakakuColumns(partListTable, parts);
};

function updateTotal() {
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

function addKakakuColumns(partListTable: HTMLTableElement, parts: Part[]) {
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
  const partPickerPriceCell: HTMLTableHeaderCellElement | null =
    headerRow.querySelector('th.th__price');
  if (!partPickerPriceCell) {
    return;
  }
  const kakakuHeaderPriceCell = document.createElement('th');
  kakakuHeaderPriceCell.dataset.kakaku = 'true';
  kakakuHeaderPriceCell.innerHTML = 'kakaku.com<br>Price';
  kakakuHeaderPriceCell.style.paddingRight = '1rem';
  kakakuHeaderPriceCell.style.minWidth = '9rem';
  headerRow.insertBefore(kakakuHeaderPriceCell, partPickerPriceCell);

  const rows: NodeListOf<HTMLTableRowElement> = partListTable.querySelectorAll(
    'tbody tr.tr__product',
  );
  // console.log(rows);
  rows.forEach((row, i) => {
    const priceCell: HTMLTableCellElement | null =
      row.querySelector('td.td__price');
    if (!priceCell) {
      return;
    }
    let kakakuPriceCell = document.createElement('td');
    kakakuPriceCell.dataset.kakaku = 'true';
    kakakuPriceCell.textContent = '';
    kakakuPriceCell = row.insertBefore(kakakuPriceCell, priceCell);
    const part = parts[i];
    if (!part) {
      return;
    }
    ReactDOM.render(
      <KakakuPrice
        part={part}
        onPriceChange={(price) => {
          partPrices[part.partPickerId] = price;
          updateTotal();
        }}
      />,
      kakakuPriceCell,
    );
  });
  const totalRow: HTMLTableRowElement | null =
    partListTable.querySelector('tbody tr.tr__total');
  if (!totalRow) {
    return;
  }
  // console.log(totalRow);
  const priceCell = totalRow.querySelector('td.td__price');
  if (!priceCell) {
    return;
  }
  kakakuTotalPriceCell = document.createElement('td');
  kakakuTotalPriceCell.dataset.kakaku = 'true';
  kakakuTotalPriceCell.style.fontSize = '1.25rem';
  kakakuTotalPriceCell.style.fontWeight = '700';
  kakakuTotalPriceCell.textContent = '¥0';
  kakakuTotalPriceCell = totalRow.insertBefore(kakakuTotalPriceCell, priceCell);
  partListTable.dataset.kakaku = 'true';
}

export default function onSavePageLoaded(): void {
  const partListDiv = document.querySelector('#partlist_render');
  // console.log(partListDiv);
  if (!partListDiv) {
    console.error('partListDiv not found!');
    return;
  }
  /*
    #partlist_render div is empty on page load. The parts table is loaded async.
    So need to add a DOMSubtreeModified event listener
  */
  partListDiv.removeEventListener('DOMSubtreeModified', eventListener);
  partListDiv.addEventListener('DOMSubtreeModified', eventListener);
}
