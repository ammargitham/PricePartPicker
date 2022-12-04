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
