import { unmountComponentAtNode } from 'react-dom';

import browser from 'webextension-polyfill';

import { parsePartListTable } from './htmlParsers';
import { addKakakuColumns } from './partListTableHelper';

let partListTable: HTMLTableElement | null;
let partPrices: Record<string, number | undefined> = {};
let partPickerPriceCells: HTMLTableCellElement[] = [];

const eventListener: EventListener = async (e) => {
  const target = e.target;
  if (!(target instanceof HTMLDivElement) || target.id !== 'partlist_render') {
    return;
  }
  // console.log(e);
  const partListDiv = target as HTMLDivElement | null;
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
  partPickerPriceCells = [];
  partListTable = partListTableTemp;
  const parts = parsePartListTable(partListTable);
  // console.table(parts);
  // const results = await fetchPartsInfo(parts);
  // console.table(results);
  browser.storage.sync.get('options').then((result) => {
    const options = (result.options || {}) as Record<string, unknown>;
    addKakakuColumns(
      parts,
      partListTable,
      partPrices,
      partPickerPriceCells,
      options,
    );
    addActions(options);
  });
};

function addActions(options: Record<string, unknown>) {
  const actionsDiv: HTMLDivElement | null = document.querySelector(
    'div.partlist__title--actions',
  );
  if (!actionsDiv) {
    return;
  }
  // console.log(actionsDiv);
  const isHidden = !!options.pppHidden;
  const hidePriceButton = document.createElement('button');
  hidePriceButton.dataset.kakaku = 'true';
  hidePriceButton.dataset.priceHidden = `${isHidden}`;
  hidePriceButton.classList.add('button', 'button--small');
  hidePriceButton.textContent = isHidden
    ? 'Show PartPicker prices'
    : 'Hide PartPicker prices';
  hidePriceButton.onclick = () => {
    toggleHidePrice(hidePriceButton);
    options.pppHidden = !options.pppHidden;
    browser.storage.sync.set({ options });
  };
  actionsDiv.appendChild(hidePriceButton);
}

function toggleHidePrice(hidePriceButton: HTMLButtonElement) {
  const isHidden = hidePriceButton.dataset.priceHidden === 'true';
  partPickerPriceCells.forEach((c) => {
    if (isHidden) {
      c.style.display = 'table-cell';
      return;
    }
    c.style.display = 'none';
  });
  hidePriceButton.textContent = isHidden
    ? 'Hide PartPicker prices'
    : 'Show PartPicker prices';
  hidePriceButton.dataset.priceHidden = isHidden ? 'false' : 'true';
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
