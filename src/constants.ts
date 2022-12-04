import { SearchResultPage } from './types';

export const baseUrl = 'https://kakaku.com';
export const searchResultsPrefix = `${baseUrl}/search_results`;
export const kakakuItemPrefix = `${baseUrl}/item`;

/**
 * PC PartPicker category to Kakaku.com category mappings.
 */
export const categoryMappings: Record<string, string> = {
  cpu: '0001_0027',
  motherboard: '0001_0036',
  memory: '0001_0033',
  'video-card': '0001_0028',
  case: '0001_0032',
};

export enum Event {
  FETCH = 'fetch',
  URL_CHANGE = 'url_change',
  FETCH_PARTS_INFO = 'fetch_parts_info',
  ADD_PART_TO_DB = 'add_part_to_db',
  SUBSCRIBE_DB_PART = 'sub_db_part',
  DB_PART_RESPONSE = 'db_part_response',
  UNSUBSCRIBE_DB_PART = 'unsub_db_part',
}

export type AllowedPath = 'saved' | 'other';

export const allowedPathsRegexMap: Record<AllowedPath, RegExp> = {
  saved: /\/*user\/\S+\/saved\/*/,
  other: /test/,
};

export const pricePattern = /¥(\d*,\d*)*/;
export const datePattern = /(\d+)年\s*(\d+)月\s*(\d+)日/;
export const minMaxPattern = /(\d+)～(\d+)/;
export const starsClassPattern = /s(\d+(?:half)*)/;

export const emptyResultPage: SearchResultPage = {
  query: {
    query: '',
  },
  results: [],
  filterSections: [],
  info: {
    totalResultsCount: 0,
    pageResultStart: 0,
    pageResultEnd: 0,
  },
};
