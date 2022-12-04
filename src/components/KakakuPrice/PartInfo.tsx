import React from 'react';

import { Part } from '@src/types';

interface PartInfoProps {
  part: Part;
}

export default function PartInfo({ part }: PartInfoProps): JSX.Element {
  return (
    <div className="my-4 flex items-center space-x-4">
      {part.imgUrl ? (
        <div className="flex-shrink-0">
          <img className="w-12 h-12" src={part.imgUrl} />
        </div>
      ) : null}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {part.partPickerId ? (
            <a
              className="text-blue-600 dark:text-blue-400 visited:text-purple-600 underline focus-visible:outline-none"
              href={new URL(
                `/product/${part.partPickerId}`,
                window.location.href,
              ).toString()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part.name}
            </a>
          ) : (
            part.name
          )}
        </p>
      </div>
    </div>
  );
}
