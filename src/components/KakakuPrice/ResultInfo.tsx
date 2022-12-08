import React from 'react';

import browser from 'webextension-polyfill';

import { PageResultInfo } from '@src/types';

interface ResultInfoProps {
  info: PageResultInfo;
}

export default function ResultInfo({ info }: ResultInfoProps): JSX.Element {
  return (
    <p className="font-light pl-2">
      <span
        dangerouslySetInnerHTML={{
          __html: browser.i18n.getMessage('showing_x_of_x', [
            info.pageResultStart.toString(),
            info.pageResultEnd.toString(),
            info.totalResultsCount.toString(),
          ]),
        }}
      />
    </p>
  );
}
