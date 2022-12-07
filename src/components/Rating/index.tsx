import React from 'react';

import { RatingType } from '@src/types';

export interface RatingProps {
  className?: string;
  rating: RatingType;
  ratingText: string;
}

const starPath = `
M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969
0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z
`;

export default function Rating({
  className,
  rating,
  ratingText,
}: RatingProps): JSX.Element {
  const fullStarCount = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStarCount = 5 - fullStarCount - (hasHalfStar ? 1 : 0);

  return (
    <div className={`inline-flex items-center ${className || ''}`}>
      {Array.from({ length: fullStarCount }).map((_v, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={starPath}></path>
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad">
              <stop offset="50%" className="stop-color-yellow-300" />
              <stop
                offset="50%"
                className="stop-color-gray-300 dark:stop-color-gray-500"
              />
            </linearGradient>
          </defs>
          <path fill="url(#grad)" d={starPath}></path>
        </svg>
      )}
      {Array.from({ length: emptyStarCount }).map((_v, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className="w-5 h-5 text-gray-300 dark:text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={starPath}></path>
        </svg>
      ))}
      {ratingText.trim() ? (
        <span
          className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2
          px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
        >
          {ratingText}
        </span>
      ) : null}
    </div>
  );
}
