import browser from 'webextension-polyfill';

import {
  categoryMappings,
  emptyResultPage,
  kakakuItemPrefix,
  searchResultsPrefix,
} from './constants';
import { parseKakakuItemResponse, parseSearchResponse } from './htmlParsers';
import {
  FetchEvent,
  FetchResponse,
  KakakuItem,
  Part,
  Query,
  SearchResultPage,
} from './types';

async function fetchProxy(url: string) {
  // console.log('fetching', url);
  const event = new FetchEvent(url);
  return (await browser.runtime.sendMessage(event)) as Promise<FetchResponse>;
}

function getSearchUrl(query: string, filters?: Record<string, string>) {
  let url = `${searchResultsPrefix}/${query}/`;
  if (filters && Object.keys(filters).length !== 0) {
    url = `${url}?${new URLSearchParams(filters).toString()}`;
  }
  return url;
}

function getKakakuItemUrl(kakakuId: string) {
  return `${kakakuItemPrefix}/${kakakuId}/`;
}

export async function fetchPartsInfo(
  parts: Part[],
): Promise<SearchResultPage[]> {
  if (!parts.length) {
    return [];
  }
  const promises = parts.map(searchPart);
  return await Promise.all(promises);
}

function searchPart(part: Part): Promise<SearchResultPage> {
  const query = partToQuery(part);
  return searchKakaku(query);
}

export function partToQuery(part: Part): Query {
  const partType = part.type;
  let category: string | undefined;
  if (partType) {
    category = categoryMappings[partType];
  }
  let filters: Record<string, string> | undefined = undefined;
  if (category) {
    filters = { category };
  }
  const query: Query = {
    query: part.name,
    filters,
  };
  return query;
}

export async function searchKakaku(query: Query): Promise<SearchResultPage> {
  // console.log(query);
  if (!query.query) {
    return emptyResultPage;
  }
  const url = getSearchUrl(query.query, query.filters);
  // console.log(url);
  const response = await fetchProxy(url);
  // console.log(response);
  if (!response.ok || !response.text) {
    return {
      ...emptyResultPage,
      query,
    };
  }
  return parseSearchResponse(query, response.text);
}

export async function getKakakuItem(
  kakakuId: string,
): Promise<KakakuItem | undefined> {
  // console.log(kakakuId);
  if (!kakakuId) {
    return;
  }
  const url = getKakakuItemUrl(kakakuId);
  // console.log(url);
  const response = await fetchProxy(url);
  // console.log(response);
  if (!response.ok || !response.text) {
    return;
  }
  // console.log(response.text);
  return parseKakakuItemResponse(kakakuId, url, response.text);
}
