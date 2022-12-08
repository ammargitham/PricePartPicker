import browser from 'webextension-polyfill';

import { parsePartListTable } from './htmlParsers';
import { addKakakuColumns } from './partListTableHelper';
import { htmlToElement } from './utils';

let partListTable: HTMLTableElement | null;
let partPrices: Record<string, number | undefined> = {};
let partPickerPriceCells: HTMLTableCellElement[] = [];

export default function onListPageLoaded(): void {
  partListTable = document.querySelector('.partlist > table');
  // console.log(partListTable);
  if (!partListTable) {
    return;
  }
  partPrices = {};
  partPickerPriceCells = [];
  const parts = parsePartListTable(partListTable);
  // console.log(parts);
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
}

function addActions(options: Record<string, unknown>) {
  const actionsULEle: HTMLUListElement | null = document.querySelector(
    'ul.actionBox.actionBox__options',
  );
  if (!actionsULEle) {
    return;
  }
  const isHidden = !!options.pppHidden;
  const icons = getIcons();
  const anchor = document.createElement('a');
  anchor.dataset.kakaku = 'true';
  anchor.dataset.priceHidden = `${isHidden}`;
  anchor.href = '#';
  anchor.appendChild(isHidden ? icons[0] : icons[1]);
  const text: string = browser.i18n.getMessage(
    isHidden ? 'show_pcpartpicker_prices' : 'hide_pcpartpicker_prices',
  );
  const textNode = document.createTextNode(text);
  anchor.appendChild(textNode);
  anchor.onclick = (e) => {
    e.preventDefault();
    toggleHidePrice(anchor, icons);
    options.pppHidden = !options.pppHidden;
    browser.storage.sync.set({ options });
  };
  const li = document.createElement('li');
  li.appendChild(anchor);
  actionsULEle.appendChild(li);
}

function toggleHidePrice(anchor: HTMLAnchorElement, icons: SVGElement[]) {
  const isHidden = anchor.dataset.priceHidden === 'true';
  partPickerPriceCells.forEach((c) => {
    if (isHidden) {
      // show it
      c.style.display = 'table-cell';
      return;
    }
    // hide it
    c.style.display = 'none';
  });
  // update colspan of 'add component' cells and hide/show extra total rows
  if (partListTable) {
    const tds: NodeListOf<HTMLTableCellElement> =
      partListTable.querySelectorAll('td.td__addComponent');
    tds.forEach((c) => {
      c.colSpan = isHidden ? 11 : 7;
    });

    const extraTotalRows: NodeListOf<HTMLTableRowElement> =
      partListTable.querySelectorAll('tr.tr__total:not(.tr__total--final)');
    extraTotalRows.forEach((tr) => {
      tr.style.display = isHidden ? 'table-row' : 'none';
    });

    const finalTotalRow: HTMLTableRowElement | null =
      partListTable.querySelector('tr.tr__total.tr__total--final');
    if (finalTotalRow) {
      const firstChild =
        finalTotalRow.firstElementChild as HTMLTableCellElement | null;
      if (firstChild) {
        firstChild.colSpan = isHidden ? 9 : 4;
      }
    }
  }
  anchor.replaceChild(isHidden ? icons[1] : icons[0], anchor.childNodes[0]);
  anchor.childNodes[1].textContent = browser.i18n.getMessage(
    isHidden ? 'hide_pcpartpicker_prices' : 'show_pcpartpicker_prices',
  );
  anchor.dataset.priceHidden = isHidden ? 'false' : 'true';
}

function getIcons() {
  const eyeIcon = htmlToElement(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke="#B8B8C8"
      fill="transparent"
      viewBox="0 0 24 24"
      stroke-width="3"
      class="icon"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `) as SVGElement;
  eyeIcon.style.stroke = '#B8B8C8';
  eyeIcon.style.fill = 'transparent';
  const eyeSlashIcon = htmlToElement(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke="#B8B8C8"
      fill="transparent"
      viewBox="0 0 24 24"
      stroke-width="3"
      class="icon"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  `) as SVGElement;
  eyeSlashIcon.style.stroke = '#B8B8C8';
  eyeSlashIcon.style.fill = 'transparent';
  return [eyeIcon, eyeSlashIcon];
}
