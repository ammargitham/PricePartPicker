import React from 'react';

import { PageResultInfo } from '@src/types';

interface ResultInfoProps {
  info: PageResultInfo;
}

export default function ResultInfo({ info }: ResultInfoProps): JSX.Element {
  return (
    <p className="font-light pl-2">
      <span>Showing </span>
      <span className="font-medium">{info.pageResultStart}</span>
      <span> - </span>
      <span className="font-medium">{info.pageResultEnd}</span>
      <span> of </span>
      <span className="font-medium">{info.totalResultsCount}</span>
    </p>
  );
}
