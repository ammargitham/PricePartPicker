import { SearchResultPage } from './types';

export const baseUrl = 'https://kakaku.com';
export const searchResultsPrefix = `${baseUrl}/search_results`;
export const kakakuItemPrefix = `${baseUrl}/item`;

/**
 * PC PartPicker category to Kakaku.com category mappings.
 */
export const categoryMappings: Record<string, string> = {
  cpu: '0001_0027',
  'cpu-cooler': '0001_0030',
  motherboard: '0001_0036',
  memory: '0001_0033',
  storage: '0001', // (using 'computer' category as there is no category in kakaku covering both ssd and hdd)
  'video-card': '0001_0028',
  case: '0001_0032',
  'power-supply': '0001_0035',
  os: '0001_0055',
  monitor: '0001_0015',
  'sound-card': '0001_0034',
  'wired-network-card': '0001_0037',
  'wireless-network-card': '0001_0115',
  headphones: '0001_0086',
  keyboard: '0001_0019',
  mouse: '0001_0022',
  speakers: '0001_0016',
  webcam: '0001_0111',
  'case-fan': '0001_0089',
  'fan-controller': '0001_0110',
  'thermal-paste': '0001_0111',
  'external-hard-drive': '0001', // (using 'computer' category as there is no category in kakaku covering both ssd and hdd)
  'optical-drive': '0001_0044',
  ups: '0001_0017',
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

export type AllowedPath = 'saved' | 'list';

export const allowedPathsRegexMap: Record<AllowedPath, RegExp> = {
  saved: /\/*user\/\S+\/saved\/*/,
  list: /\/*list\/*/,
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
