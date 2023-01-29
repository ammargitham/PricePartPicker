import React from 'react';

import clsx from 'clsx';
import browser from 'webextension-polyfill';

import { XMarkIcon } from '@heroicons/react/24/solid';

import { Part } from '@src/types';

interface PartInfoProps {
  part: Part;
  onClose?: () => void;
}

export default function PartInfo({
  part,
  onClose,
}: PartInfoProps): JSX.Element {
  return (
    <div
      className={clsx([
        'flex',
        'items-start',
        'justify-between',
        'p-4',
        'space-x-4',
        'border-b',
        'border-solid',
        'border-gray-300',
        'dark:border-gray-600',
      ])}
    >
      <div className={clsx(['flex', 'items-center', 'gap-4'])}>
        {part.imgUrl ? (
          <div className="flex-shrink-0">
            <img className="w-12 h-12" src={part.imgUrl} />
          </div>
        ) : null}
        <div className="flex-1 min-w-0">
          <p
            className={clsx([
              'text-sm',
              'font-medium',
              'text-gray-900',
              'truncate',
              'dark:text-white',
            ])}
          >
            {part.partPickerId ? (
              <a
                className={clsx([
                  'text-blue-600',
                  'dark:text-blue-400',
                  'visited:text-purple-600',
                  'underline',
                  'focus-visible:outline-none',
                ])}
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
      <button
        type="button"
        className={clsx([
          'text-gray-400',
          'hover:text-gray-900',
          'dark:hover:text-white',
          'bg-transparent',
          'hover:bg-gray-200',
          'dark:hover:bg-gray-600',
          'rounded-lg',
          'text-sm',
          'p-1.5',
          'ml-auto',
          'inline-flex',
          'items-center',
          'focus:outline-none',
        ])}
        onClick={onClose}
      >
        <XMarkIcon className="h-4 w-4 tw-block" />
        <span className="sr-only">
          {browser.i18n.getMessage('close_modal')}
        </span>
      </button>
    </div>
  );
}
