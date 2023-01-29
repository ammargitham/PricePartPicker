import cloneDeep from 'lodash/cloneDeep';

import { Event } from './constants';

export interface Part {
  name: string;
  partPickerId: string;
  imgUrl?: string;
  type?: string;
  typeName?: string;
}

export interface FetchResponse {
  ok: boolean;
  status: number;
  text?: string;
}

export interface ReleaseDate {
  year: number;
  month: number;
  day: number;
}

export interface PaymentMethods {
  card?: boolean;
  cash?: boolean;
  transfer?: boolean;
  cvs?: boolean;
  kakakuPay?: {
    card?: boolean;
    transfer?: boolean;
    cvs?: boolean;
  };
}

export interface KakakuItemShop {
  id: number;
  name?: string;
  // nameIconUrl?: string;
  shopArea?: string;
  itemUrl?: string;
  price?: number;
  // years?: number;
  // rank?: number;
  // paymentMethods?: PaymentMethods;
}

export type RatingType = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export interface KakakuItemRating {
  rating?: RatingType;
  ratingText?: string;
  numReviews?: number;
}

export class KakakuItem {
  kakakuId: string;
  name: string;
  maker?: string;
  private _price?: number;
  imgUrl?: string;
  itemUrl: string;
  releaseDate?: ReleaseDate;
  itemDetails?: string[];
  rating?: KakakuItemRating;
  shops?: KakakuItemShop[];
  selectedShopId?: number;

  constructor(
    kakakuId: string,
    name: string,
    maker: string | undefined,
    price: number | undefined,
    imgUrl: string | undefined,
    itemUrl: string,
    releaseDate?: ReleaseDate,
    itemDetails?: string[],
    rating?: KakakuItemRating,
    shops?: KakakuItemShop[],
    selectedShopId?: number,
  ) {
    this.kakakuId = kakakuId;
    this.name = name;
    this.maker = maker;
    this.price = price;
    this.imgUrl = imgUrl;
    this.itemUrl = itemUrl;
    this.releaseDate = releaseDate;
    this.itemDetails = itemDetails;
    this.rating = rating;
    this.shops = shops;
    this.selectedShopId = selectedShopId;
  }

  get price(): number | undefined {
    if (this.shops?.length && this.selectedShopId) {
      return this.shops.find((s) => s.id === this.selectedShopId)?.price;
    }
    return this._price;
  }

  set price(price: number | undefined) {
    this._price = price;
  }

  clone(): KakakuItem {
    return new KakakuItem(
      this.kakakuId,
      this.name,
      this.maker,
      this.price,
      this.imgUrl,
      this.itemUrl,
      cloneDeep(this.releaseDate),
      cloneDeep(this.itemDetails),
      cloneDeep(this.rating),
      cloneDeep(this.shops),
      this.selectedShopId,
    );
  }
}

export interface Query {
  query: string;
  filters?: Record<string, string>;
}

export interface KakakuPaginationPage {
  text: string;
  current?: boolean;
  filters?: Record<string, string>;
}

export interface KakakuPagination {
  prev?: KakakuPaginationPage;
  pages: KakakuPaginationPage[];
  next?: KakakuPaginationPage;
}

export interface PageResultInfo {
  totalResultsCount: number;
  pageResultStart: number;
  pageResultEnd: number;
}

export interface SearchResultPage {
  query: Query;
  results: KakakuItem[];
  filterSections?: FilterSectionType[];
  pagination?: KakakuPagination;
  info?: PageResultInfo;
}

export interface FilterSection {
  title: string;

  // constructor(title: string) {
  //   this.title = title;
  // }
}

export interface FilterOption {
  name: string;
  count?: number;
  filters: Record<string, string>;
  isChild: boolean;

  // constructor(name: string, count: number, filters: Record<string, string>) {
  //   this.name = name;
  //   this.count = count;
  //   this.filters = filters;
  // }
}

export interface FilterRadioSection extends FilterSection {
  options: FilterRadioOption[];

  // constructor(title: string, options: FilterRadioOption[]) {
  //   super(title);
  //   this.options = options;
  // }
}

export interface FilterRadioOption extends FilterOption {
  isActive: boolean;

  // constructor(
  //   name: string,
  //   count: number,
  //   filters: Record<string, string>,
  //   isActive: boolean,
  // ) {
  //   super(name, count, filters);
  //   this.isActive = isActive;
  // }
}

export type FilterSectionType = FilterRadioSection;
export type FilterOptionType = FilterRadioOption;

export abstract class MessageEvent {
  abstract event: Event;
}

export class FetchEvent extends MessageEvent {
  event: Event = Event.FETCH;
  url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }
}

export class UrlChangeEvent extends MessageEvent {
  event: Event = Event.URL_CHANGE;
  url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }
}

export class PartsFetchEvent extends MessageEvent {
  event: Event = Event.FETCH_PARTS_INFO;
  parts: Part[];

  constructor(parts: Part[]) {
    super();
    this.parts = parts;
  }
}
