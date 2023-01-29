import {
  datePattern,
  minMaxPattern,
  pricePattern,
  starsClassPattern,
} from './constants';
import {
  FilterRadioOption,
  FilterRadioSection,
  KakakuItem,
  KakakuItemRating,
  KakakuItemShop,
  KakakuPagination,
  KakakuPaginationPage,
  PageResultInfo,
  Part,
  Query,
  RatingType,
  ReleaseDate,
  SearchResultPage,
} from './types';

export function parseSearchResponse(
  query: Query,
  responseHtmlText: string,
): SearchResultPage {
  const parser = new DOMParser();
  const root = parser.parseFromString(responseHtmlText, 'text/html');
  // console.log(root);
  const resultElements: NodeListOf<HTMLDivElement> = root.querySelectorAll(
    'div.p-result_list > div.p-result_item',
  );
  const results: KakakuItem[] = [];
  resultElements.forEach((result) => {
    const searchResult = parseResultDiv(result);
    if (!searchResult) {
      return;
    }
    results.push(searchResult);
  });

  const filterElements: NodeListOf<HTMLDivElement> =
    root.querySelectorAll('div.p-sideSearch');
  const filterSections: FilterRadioSection[] = [];
  filterElements.forEach((filterDiv) => {
    const filterSection = parseFilterSectionDiv(filterDiv);
    if (!filterSection) {
      return;
    }
    filterSections.push(filterSection);
    // console.log(filterSection);
  });

  const pageResultInfoEle: HTMLDivElement | null = root.querySelector(
    'div.p-result_title_wrap',
  );
  let pageResultInfo: PageResultInfo = {
    totalResultsCount: 0,
    pageResultStart: 0,
    pageResultEnd: 0,
  };
  if (pageResultInfoEle) {
    const info = parsePageResultInfo(pageResultInfoEle);
    if (info) {
      pageResultInfo = info;
    }
  }
  let pagination: KakakuPagination | undefined;
  const paginationEle: HTMLUListElement | null =
    root.querySelector('ul.p-pager');
  if (paginationEle) {
    pagination = parsePagination(paginationEle);
  }

  const searchResultPage: SearchResultPage = {
    query,
    results,
    filterSections,
    info: pageResultInfo,
    pagination,
  };
  // console.log(searchResultPage);
  return searchResultPage;
}

function parsePagination(
  paginationEle: HTMLUListElement,
): KakakuPagination | undefined {
  const liElements = paginationEle.querySelectorAll('li');
  if (liElements.length === 0) {
    return;
  }
  let prev: KakakuPaginationPage | undefined;
  let next: KakakuPaginationPage | undefined;
  const pages: KakakuPaginationPage[] = [];
  liElements.forEach((li) => {
    const classList = li.classList;
    if (classList.contains('p-pager_btn_prev')) {
      // prev
      prev = parsePaginationListItem(li);
      return;
    }
    if (classList.contains('p-pager_btn_next')) {
      // next
      next = parsePaginationListItem(li);
      return;
    }
    // we know how to parse only following class li's
    if (
      !classList.contains('p-pager_num') &&
      !classList.contains('p-pager_ellipsis')
    ) {
      return;
    }
    const page = parsePaginationListItem(li);
    if (page) {
      pages.push(page);
    }
  });
  return {
    pages,
    prev,
    next,
  };
}

function parsePaginationListItem(
  li: HTMLLIElement,
  allowBlankText = false,
): KakakuPaginationPage | undefined {
  // this li can contain either anchor tag or span tag
  const child = li.firstElementChild;
  if (!child) {
    return;
  }
  const textTemp = child.textContent?.trim();
  if (!textTemp && !allowBlankText) {
    return;
  }
  const text = textTemp || '';
  const current = li.classList.contains('p-pager_num_current');
  const partial = {
    text,
    current,
  };
  if (child instanceof HTMLAnchorElement) {
    // clickable
    const a = child as HTMLAnchorElement;
    const href = a.href.trim();
    if (!href) {
      return;
    }
    // get the filters from href
    const url = new URL(href);
    const params = url.searchParams;
    params.delete('lid');
    params.delete('query');
    const filters: Record<string, string> = Object.fromEntries(params);
    return {
      ...partial,
      filters,
    };
  }
  if (child instanceof HTMLSpanElement) {
    // not clickable
    return partial;
  }
}

function parsePageResultInfo(
  pageResultInfoEle: HTMLDivElement,
): PageResultInfo | undefined {
  const infoEle = pageResultInfoEle.querySelector('span.p-result_title_sub');
  if (!infoEle) {
    return;
  }
  const totalCountElement = infoEle.querySelector('span.p-result_title_num');
  if (!totalCountElement) {
    return;
  }
  const totalCountStr = totalCountElement.textContent
    ?.trim()
    ?.replaceAll(',', '');
  if (!totalCountStr) {
    return;
  }
  const totalCount = parseInt(totalCountStr, 10);
  if (isNaN(totalCount)) {
    return;
  }
  const noMinMaxInfo: PageResultInfo = {
    totalResultsCount: totalCount,
    pageResultStart: 0,
    pageResultEnd: 0,
  };
  // infoEle should have at least 2 nodes;
  if (infoEle.childNodes.length <= 1) {
    return noMinMaxInfo;
  }
  const minMaxEle = infoEle.childNodes[1];
  const minMaxStr = minMaxEle.textContent?.trim();
  if (!minMaxStr) {
    return noMinMaxInfo;
  }
  const match = minMaxStr.match(minMaxPattern);
  let min = 0;
  let max = 0;
  if (match && match.length >= 3) {
    const minTemp = parseInt(match[1].trim(), 10);
    if (!isNaN(minTemp)) {
      min = minTemp;
    }
    const maxTemp = parseInt(match[2].trim(), 10);
    if (!isNaN(maxTemp)) {
      max = maxTemp;
    }
  }
  return {
    totalResultsCount: totalCount,
    pageResultStart: min,
    pageResultEnd: max,
  };
}

function parseResultDiv(result: HTMLDivElement): KakakuItem | undefined {
  if (result.querySelector('p.p-result_item_mall')) {
    // ad
    return;
  }
  const itemMaker = result.querySelector('p.p-item_maker');
  let maker: string | undefined;
  if (itemMaker) {
    maker = itemMaker.textContent?.trim();
    if (
      maker &&
      maker.charAt(0) === '[' &&
      maker.charAt(maker.length - 1) === ']'
    ) {
      maker = maker.substring(1, maker.length - 1);
    }
  }
  const itemNameNode = result.querySelector('p.p-item_name');
  if (!itemNameNode) {
    // throw Error('No name found!');
    return;
  }
  const itemName = itemNameNode?.textContent?.trim();
  if (!itemName) {
    // throw Error('No name found!');
    return;
  }
  const itemPriceSpan = result.querySelector('span.p-item_price_num');
  if (!itemPriceSpan) {
    // throw Error('No price found!');
    return;
  }
  const itemPriceString = itemPriceSpan?.textContent?.trim();
  let itemPrice: number | undefined;
  if (itemPriceString) {
    if (!itemPriceString.includes('価格情報無し')) {
      itemPrice = parsePrice(itemPriceString);
    }
  }
  const itemImg: HTMLImageElement | null = result.querySelector(
    'img.p-item_visual_entity',
  );
  let itemImgUrl = '';
  if (itemImg) {
    itemImgUrl = itemImg.getAttribute('data-src') || '';
  }
  const itemLink: HTMLAnchorElement | null = result.querySelector(
    'a.p-result_item_btn_link',
  );
  let itemUrl = '';
  let kakakuId = '';
  if (itemLink) {
    itemUrl = itemLink.href;
    if (itemUrl) {
      const parsed = new URL(itemUrl);
      parsed.hash = '';
      parsed.search = '';
      const paths = parsed.pathname.split('/').filter(Boolean);
      if (paths.length) {
        kakakuId = paths[paths.length - 1];
      }
      itemUrl = parsed.toString();
    }
  }

  if (!kakakuId) {
    // throw Error('kakakuId not found!');
    return;
  }

  const itemDateNode: HTMLParagraphElement | null = result.querySelector(
    'div.p-item_rate > p.p-item_date',
  );
  let releaseDate: ReleaseDate | undefined;
  if (itemDateNode) {
    // console.log(itemDateNode.textContent);
    let releaseDateStr = itemDateNode.textContent?.trim();
    // Note: The `：` character below is a single japanese character
    if (releaseDateStr?.startsWith('発売日：')) {
      releaseDateStr = releaseDateStr.substring(4).trim();
      // console.log(releaseDate);
      if (releaseDateStr) {
        releaseDate = parseReleaseDate(releaseDateStr);
      }
    }
  }

  const itemRating = getResultItemRating(result);

  return new KakakuItem(
    kakakuId,
    itemName,
    maker,
    itemPrice,
    itemImgUrl,
    itemUrl,
    releaseDate,
    undefined,
    itemRating,
  );
}

function getResultItemRating(
  result: HTMLDivElement,
): KakakuItemRating | undefined {
  const itemRatingNode = result.querySelector('p.p-item_star');
  // console.log('itemRatingNode', itemRatingNode);
  const ratingText = itemRatingNode
    ?.querySelector('span.p-item_star_rating_num')
    ?.textContent?.trim();
  const numReviewsStr = itemRatingNode
    ?.querySelector('span.p-item_star_count')
    ?.textContent?.trim();
  let numReviews: number | undefined;
  if (
    numReviewsStr &&
    numReviewsStr.startsWith('(') &&
    numReviewsStr.endsWith(')')
  ) {
    numReviews = parseInt(
      numReviewsStr.substring(1, numReviewsStr.length - 1),
      10,
    );
    if (isNaN(numReviews)) {
      numReviews = undefined;
    }
  }
  const starClassList = itemRatingNode?.classList;
  let rating: RatingType | undefined;
  if (starClassList && starClassList.length >= 2) {
    let starClass = starClassList[1];
    const starPrefix = 'p-item_star-';
    if (starClass.startsWith(starPrefix)) {
      starClass = starClass.substring(starPrefix.length);
      let ratingNum = parseInt(starClass, 10);
      if (!isNaN(ratingNum)) {
        ratingNum /= 10;
        rating = Math.min(Math.max(ratingNum, 0), 5) as RatingType;
      } else {
        rating = undefined;
      }
    }
  }
  return {
    rating,
    numReviews,
    ratingText,
  };
}

function parsePrice(itemPriceString: string) {
  const match = itemPriceString.match(pricePattern);
  if (match && match.length >= 2 && match[1]) {
    return parseInt(match[1].replaceAll(',', ''), 10);
  }
}

function parseReleaseDate(releaseDateStr: string): ReleaseDate | undefined {
  const match = releaseDateStr.match(datePattern);
  // console.log(match);
  if (match && match.length >= 4) {
    const [, yearStr, monthStr, dayStr] = match;
    // console.log(year, month, date);
    if (yearStr && monthStr && dayStr) {
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      const day = parseInt(dayStr, 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return {
          year,
          month,
          day,
        };
      }
    }
  }
}

function parseFilterSectionDiv(filterDiv: HTMLDivElement) {
  // console.log(filterDiv);
  const filterTitleEle = filterDiv.querySelector('p.c-sTtl-1_lines');
  if (!filterTitleEle) {
    return;
  }
  const ul: HTMLUListElement | null = filterDiv.querySelector(
    'ul.p-searchInput-radio',
  );
  if (!ul) {
    return;
  }
  const liElements = ul.querySelectorAll('li');
  const options: FilterRadioOption[] = [];
  liElements.forEach((li) => {
    const filterOption = parseRadioFilterOption(li);
    if (filterOption) {
      options.push(filterOption);
    }
  });
  const filterRadioSection: FilterRadioSection = {
    title: filterTitleEle.textContent || '',
    options,
  };
  return filterRadioSection;
}

function parseRadioFilterOption(li: HTMLLIElement) {
  const child = li.firstElementChild;
  if (
    !child ||
    (!(child instanceof HTMLSpanElement) &&
      !(child instanceof HTMLAnchorElement))
  ) {
    return;
  }
  const name = child.childNodes[0].textContent?.trim();
  if (!name) {
    return;
  }
  let count: number | undefined;
  const itemNumSpan = child.querySelector('span.item_num');
  if (itemNumSpan) {
    const countStr = itemNumSpan.textContent?.trim().replace(/\D/g, '');
    if (countStr) {
      count = parseInt(countStr, 10);
      if (isNaN(count)) {
        count = 0;
      }
    }
  }
  let filters: Record<string, string> = {};
  if (child instanceof HTMLSpanElement) {
    const onClick = child.getAttribute('onclick');
    // console.log(onClick);
    if (onClick) {
      const match = onClick.match(/GILocation\.ChangeLocation\('(\S+)'\)/);
      if (match) {
        const resultStr = match[1];
        const result = Array.from(resultStr.matchAll(/([^\=\|]+)\=([^\|]+)/g));
        result.forEach((r) => {
          const key = r[1];
          if (key === 'lid' || key === 'query') {
            // ignore 'lid' and 'query' filters
            return;
          }
          filters[key] = r[2];
        });
      }
    }
  } else {
    // anchor ele
    const a = child as HTMLAnchorElement;
    const href = a.href.trim();
    if (!href) {
      return;
    }
    const url = new URL(href);
    const params = url.searchParams;
    params.delete('lid');
    params.delete('query');
    filters = Object.fromEntries(params);
  }
  const classList = li.classList;
  const isActive = classList.contains('is-active');
  if (!isActive && (!filters || Object.entries(filters).length === 0)) {
    return;
  }
  const filterOption: FilterRadioOption = {
    name,
    count,
    filters,
    isActive,
    isChild: classList.contains('item_child'),
  };
  return filterOption;
}

export function parsePartListTable(
  partListTable: HTMLTableElement,
): (Part | undefined)[] {
  const parts: (Part | undefined)[] = [];
  const rows: NodeListOf<HTMLTableRowElement> =
    partListTable.querySelectorAll('tr.tr__product');
  rows.forEach((tr) => {
    const part = parsePartRow(tr);
    if (!part) {
      parts.push(undefined);
      return;
    }
    parts.push(part);
  });
  return parts;
}

function parsePartRow(tr: HTMLTableRowElement): Part | undefined {
  const typeCell = tr.querySelector('td.td__component');
  const typeHref = typeCell?.querySelector('a')?.href;
  let type: string | undefined;
  if (typeHref) {
    const typePath = new URL(typeHref).pathname;
    const pathSplits = typePath.split('/');
    if (pathSplits.length >= 3) {
      type = pathSplits[2];
    }
  }
  const nameCell = tr.querySelector('td.td__name');
  if (!nameCell) {
    return;
  }
  const nameAnchorEle = nameCell?.querySelector('a');
  if (!nameAnchorEle || !nameAnchorEle.textContent) {
    return;
  }
  const nameHref = nameAnchorEle?.href;
  let partPickerId: string | undefined;
  if (nameHref) {
    const partPath = new URL(nameHref).pathname;
    const pathSplits = partPath.split('/');
    if (pathSplits.length >= 3) {
      partPickerId = pathSplits[2];
    }
  }
  if (!partPickerId) {
    return;
  }
  const imgUrl = tr.querySelector('td.td__image')?.querySelector('img')?.src;
  const part: Part = {
    partPickerId,
    type,
    typeName: typeCell?.textContent?.trim(),
    name: nameAnchorEle.textContent.trim(),
    imgUrl,
  };
  return part;
}

export function parseKakakuItemResponse(
  kakakuId: string,
  itemUrl: string,
  responseHtmlText: string,
): KakakuItem | undefined {
  const parser = new DOMParser();
  const root = parser.parseFromString(responseHtmlText, 'text/html');
  // console.log(root);
  const maker = root.querySelector('li.makerLabel a')?.textContent?.trim();
  // console.log('maker', maker);
  const releaseDateStr = root
    .querySelector('div.releaseDateWrap')
    ?.textContent?.trim();
  // console.log('releaseDate', releaseDateStr);
  let releaseDate: ReleaseDate | undefined;
  if (releaseDateStr) {
    releaseDate = parseReleaseDate(releaseDateStr);
    // console.log('releaseDate', releaseDate);
  }
  const titleBox = root.querySelector('#titleBox');
  if (!titleBox) {
    return;
  }
  const name = titleBox.querySelector('div.boxL')?.textContent?.trim();
  if (!name) {
    return;
  }
  // console.log('name', name);
  const itemDetailElements: NodeListOf<HTMLLIElement> =
    titleBox.querySelectorAll('ul.itemviewDetailList > li');
  const itemDetails: string[] = [];
  itemDetailElements.forEach((li) => {
    const content = li.textContent;
    if (!content) {
      return;
    }
    itemDetails.push(content);
  });
  // console.log(itemDetails);
  const productInfoEle = root.querySelector('#productAll');
  if (!productInfoEle) {
    return;
  }
  // console.log('productInfoEle', productInfoEle);
  const imgUrl = (
    productInfoEle.querySelector('#imgBox img') as HTMLImageElement | null
  )?.src;
  const priceStr = productInfoEle
    .querySelector('#priceBox span.priceTxt')
    ?.textContent?.trim();
  let price: number | undefined;
  if (priceStr) {
    price = parsePrice(priceStr);
    if (price && isNaN(price)) {
      price = undefined;
    }
  }
  const itemRating = parseKakakuItemRating(productInfoEle);
  // console.log('price', price);
  const priceTable: HTMLTableElement | null =
    root.querySelector('table.p-priceTable');
  const shops = parseShopsFromPriceTable(priceTable);
  return new KakakuItem(
    kakakuId,
    name,
    maker,
    price,
    imgUrl,
    itemUrl,
    releaseDate,
    itemDetails,
    itemRating,
    shops,
  );
}

function parseShopsFromPriceTable(
  priceTable?: HTMLTableElement | null,
): KakakuItemShop[] {
  if (!priceTable) {
    return [];
  }
  const shops: KakakuItemShop[] = [];
  for (const row of priceTable.rows) {
    const shop = parseShopRow(row);
    if (shop) {
      shops.push(shop);
    }
  }
  // console.log(shops);
  return shops;
}

function parseShopRow(row: HTMLTableRowElement): KakakuItemShop | undefined {
  const cells = row.cells;
  if (cells.length < 5) {
    return;
  }
  if (cells[0].tagName.toLowerCase() === 'th') {
    return;
  }
  const priceStr = cells[1]
    .querySelector('p.p-PTPrice_price')
    ?.textContent?.trim();
  const price = priceStr ? parsePrice(priceStr) : undefined;

  const storeCell = cells[4];

  const shopNameAnchor = storeCell.querySelector(
    'p.p-PTShopData_name > a.p-PTShopData_name_link',
  ) as HTMLAnchorElement | undefined;
  const shopLink = shopNameAnchor?.href;
  if (!shopLink) {
    return;
  }
  const id = getShopId(shopLink);
  if (isNaN(id)) {
    return;
  }
  const shopName = shopNameAnchor?.textContent?.trim();

  // const shopNameIcon = (
  //   storeCell.querySelector(
  //     'a.p-PTShopData_name_link > img.p-PTShopData_name_link_icon',
  //   ) as HTMLImageElement | null
  // )?.src;

  let shopArea = storeCell
    .querySelector('span.p-PTShopData_name_area')
    ?.textContent?.trim();
  if (shopArea && shopArea.startsWith('(') && shopArea.endsWith(')')) {
    shopArea = shopArea.substring(1, shopArea.length - 1);
  }

  // const yearsStr = storeCell
  //   .querySelector('p.p-PTShopData_year > button.p-PTShopData_year_btn')
  //   ?.textContent?.trim();
  // let years: number | undefined;
  // if (yearsStr) {
  //   years = parseInt(yearsStr, 10);
  //   if (isNaN(years)) {
  //     years = undefined;
  //   }
  // }

  // const rankStr = storeCell
  //   .querySelector('p.p-PTShopData_rank > button.p-PTShopData_rank_btn')
  //   ?.textContent?.trim();
  // let rank: number | undefined;
  // if (rankStr && rankStr.startsWith('TOP')) {
  //   rank = parseInt(rankStr.substring(3), 10);
  //   if (isNaN(rank)) {
  //     rank = undefined;
  //   }
  // }

  // const paymentMethods = parsePaymentMethods(storeCell);

  // console.log(shopArea);
  const shopItemLinkEle: HTMLAnchorElement | null = storeCell.querySelector(
    'div.p-PTShop_btn a.p-PTShopData_name_link',
  );
  const shopItemUrl = shopItemLinkEle?.href?.trim();
  // console.log(shopItemPageUrl);
  return {
    id,
    name: shopName,
    // nameIconUrl: shopNameIcon,
    shopArea,
    itemUrl: shopItemUrl,
    price,
    // years,
    // rank,
    // paymentMethods,
  };
}

function getShopId(shopLink: string) {
  const shopUrl = new URL(shopLink);
  const pathname = shopUrl.pathname;
  const splits = pathname.split('/');
  return parseInt(splits[2], 10);
}

// function parsePaymentMethods(cell: HTMLTableCellElement): PaymentMethods {
//   const allPaymentsSpans: NodeListOf<HTMLSpanElement> = cell.querySelectorAll(
//     'div.p-PTPay_option_cont2 > span.p-PTPayCont',
//   );
//   const paymentMethods: PaymentMethods = {};
//   allPaymentsSpans.forEach((span) => {
//     const { classList } = span;
//     if (!classList.contains('is-on')) {
//       return;
//     }
//     if (classList.contains('p-PTPayCont-card')) {
//       paymentMethods.card = true;
//       return;
//     }
//     if (classList.contains('p-PTPayCont-cash')) {
//       paymentMethods.cash = true;
//       return;
//     }
//     if (classList.contains('p-PTPayCont-transfer')) {
//       paymentMethods.transfer = true;
//       return;
//     }
//     if (classList.contains('p-PTPayCont-cvs')) {
//       paymentMethods.cvs = true;
//       return;
//     }
//     if (classList.contains('p-PTPayCont-kakakuPay-card')) {
//       if (paymentMethods.kakakuPay) {
//         paymentMethods.kakakuPay.card = true;
//       } else {
//         paymentMethods.kakakuPay = { card: true };
//       }
//       return;
//     }
//     if (classList.contains('p-PTPayCont-kakakuPay-transfer')) {
//       if (paymentMethods.kakakuPay) {
//         paymentMethods.kakakuPay.transfer = true;
//       } else {
//         paymentMethods.kakakuPay = { transfer: true };
//       }
//       return;
//     }
//     if (classList.contains('p-PTPayCont-kakakuPay-cvs')) {
//       if (paymentMethods.kakakuPay) {
//         paymentMethods.kakakuPay.cvs = true;
//       } else {
//         paymentMethods.kakakuPay = { cvs: true };
//       }
//       return;
//     }
//   });
//   return paymentMethods;
// }

function parseKakakuItemRating(
  productInfoEle: Element,
): KakakuItemRating | undefined {
  const detailBox = productInfoEle.querySelector('#detailBox');
  if (!detailBox) {
    return parseKakakuItemRatingAlternate(productInfoEle);
  }
  const ratingParentEle: HTMLDivElement | null = detailBox.querySelector(
    'li.ovReview dd.onReview div.revnum',
  );
  // console.log(ratingParentEle);
  if (!ratingParentEle) {
    return;
  }
  return getRatingFromParent(ratingParentEle);
}

function parseStarsClass(starsClass: string) {
  const match = starsClass.trim().match(starsClassPattern);
  // console.log(match);
  if (!(match && match.length >= 2 && match[1])) {
    return;
  }
  let ratingStr = match[1];
  const hasHalf = ratingStr.endsWith('half');
  if (hasHalf) {
    ratingStr = ratingStr[0];
  }
  const rating = parseInt(ratingStr, 10);
  if (isNaN(rating)) {
    return;
  }
  if (hasHalf) {
    return (rating + 0.5) as RatingType;
  }
  return Math.min(Math.max(rating, 0), 5) as RatingType;
}

function parseKakakuItemRatingAlternate(
  productInfoEle: Element,
): KakakuItemRating | undefined {
  const ratingParentEle = productInfoEle.querySelector('#ovBtnBox li.review');
  if (!ratingParentEle) {
    return;
  }
  return getRatingFromParent(ratingParentEle);
}

function getRatingFromParent(
  ratingParentEle: Element,
): KakakuItemRating | undefined {
  const ratingText = ratingParentEle
    .querySelector('span[itemprop="ratingValue"]')
    ?.textContent?.trim();
  // console.log(ratingText);
  const numReviewsStr = ratingParentEle
    .querySelector('span[itemprop="reviewCount"]')
    ?.textContent?.trim();
  const numReviews = numReviewsStr ? parseInt(numReviewsStr, 10) : undefined;
  // console.log(numReviews);
  const starsEle = ratingParentEle.querySelector('span.stars');
  // console.log(starsEle);
  const starsClassList = starsEle?.classList;
  let rating: RatingType | undefined;
  starsClassList?.forEach((s) => {
    if (rating !== undefined) {
      // already found rating. exit.
      return;
    }
    rating = parseStarsClass(s);
  });
  return {
    rating,
    ratingText,
    numReviews,
  };
}
