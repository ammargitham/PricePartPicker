import { useCallback, useEffect, useState } from 'react';

import { DBPart } from '@src/db';
import { getKakakuItem, partToQuery, searchKakaku } from '@src/fetchHelper';
import { KakakuItem, Part, Query, SearchResultPage } from '@src/types';

import useDbPart from './useDbPart';

interface KakakuSearch {
  searching: boolean;
  resultPage?: SearchResultPage;
  kakakuItem?: KakakuItem;
  dbPart?: DBPart;
  search: (query: Query) => void;
}

export default function useKakakuSearch(part: Part): KakakuSearch {
  const [searching, setSearching] = useState(false);
  const [resultPage, setResultPage] = useState<SearchResultPage>();
  const [kakakuItem, setKakakuItem] = useState<KakakuItem>();

  const dbPart = useDbPart(part);

  const search = useCallback(
    (query: Query, firstResultCallback?: (result?: KakakuItem) => void) => {
      // console.log('searching', query.query);
      setSearching(true);
      searchKakaku(query)
        .then((page) => {
          setResultPage(page);
          if (firstResultCallback) {
            if (!page.results.length) {
              firstResultCallback();
              return;
            }
            firstResultCallback(page.results[0]);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setSearching(false));
    },
    [],
  );

  const getKakakuItemById = useCallback(
    (kakakuId: string, updateQuery?: boolean) => {
      setSearching(true);
      getKakakuItem(kakakuId)
        .then((kakakuItem) => {
          // console.log('done', kakakuItem);
          setKakakuItem(kakakuItem);
          if (updateQuery) {
            setResultPage((prev) => {
              let temp = {};
              if (prev) {
                temp = prev;
              }
              return {
                ...temp,
                query: {
                  query: kakakuItem?.name,
                },
                results: [kakakuItem],
              } as SearchResultPage;
            });
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setSearching(false));
    },
    [],
  );

  const searchAndSetResult = useCallback(
    (query: Query) => {
      search(query, (result) => {
        // console.log('first result', result);
        if (!result) {
          return;
        }
        const { kakakuId } = result;
        // now search using kakakuId
        getKakakuItemById(kakakuId);
      });
    },
    [getKakakuItemById, search],
  );

  const startSearch = useCallback(() => {
    // console.log(dbPart);
    if (!dbPart) {
      // search using part info and set result
      searchAndSetResult(partToQuery(part));
      return;
    }
    // search using dbPart info
    const { kakakuId, query } = dbPart;
    if (kakakuId) {
      // search using kakaku id
      getKakakuItemById(kakakuId, true);
      return;
    }
    if (query) {
      // search using query and set result
      searchAndSetResult(query);
      return;
    }
  }, [dbPart, getKakakuItemById, part, searchAndSetResult]);

  useEffect(() => {
    // delayed search, waiting for dbPart if any
    const timeoutId = setTimeout(() => {
      startSearch();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [startSearch]);

  return {
    searching,
    resultPage,
    kakakuItem,
    dbPart,
    search,
  };
}
