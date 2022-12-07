import { KakakuItemRating, ReleaseDate } from './types';

export function zip<T, U>(a: T[], b: U[]): [T, U][] {
  return a.map((k, i): [T, U] => [k, b[i]]);
}

export function range(start: number, stop: number, step = 1): number[] {
  return Array<number>(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
}

export function getFullName(name: string, maker?: string): string {
  let str = '';
  if (maker) {
    str = maker + ' ';
  }
  str += name;
  return str;
}

export function getReleaseDate(releaseDate?: ReleaseDate): string {
  if (!releaseDate) {
    return '';
  }
  const { year, month, day } = releaseDate;
  const padMonth = month.toString().padStart(2, '0');
  const padDay = day.toString().padStart(2, '0');
  return `Release date: ${year}-${padMonth}-${padDay}`;
}

export function getRatingText(rating?: KakakuItemRating): string {
  if (!rating || !rating.ratingText) {
    return '';
  }
  const { ratingText, numReviews } = rating;
  let str = ratingText;
  if (numReviews) {
    str = `${str} (${numReviews})`;
  }
  return str;
}

export function insertAfter<T extends HTMLElement>(
  newNode: T,
  existingNode: Node,
): T | null {
  const parent = existingNode.parentNode;
  if (!parent) {
    return null;
  }
  return parent.insertBefore(newNode, existingNode.nextSibling);
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export function htmlToElement(html: string): Element {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return template.content.firstElementChild!;
}

export function getScrollbarClasses(): string {
  return `scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded
  scrollbar-track-gray-200 scrollbar-thumb-gray-400
  dark:scrollbar-track-slate-500 dark:scrollbar-thumb-slate-900`;
}
