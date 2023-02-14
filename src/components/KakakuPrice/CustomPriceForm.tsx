import React, { useMemo, useState } from 'react';

import clsx from 'clsx';
import browser from 'webextension-polyfill';

import { CustomPrice } from '@src/types';

interface CustomPriceFormProps {
  customPrice?: CustomPrice;
  onSave?: (customPrice: CustomPrice) => void;
}

interface EditableCustomPrice {
  name: string;
  url: string;
  price: string;
}

const { getMessage } = browser.i18n;

function validateCustomPrice(customPrice: EditableCustomPrice): boolean {
  const price = Number.parseFloat(customPrice.price.trim());
  return Boolean(customPrice.name.trim() && price && !Number.isNaN(price));
}

const customPriceToEditable = (
  customPrice?: CustomPrice,
): EditableCustomPrice => ({
  name: customPrice?.name ?? '',
  url: customPrice?.url ?? '',
  price: customPrice?.price ? customPrice.price.toString() : '',
});

const editableToCustomPrice = (editable: EditableCustomPrice): CustomPrice => ({
  name: editable.name,
  url: editable.url || undefined,
  price: Number.parseFloat(editable.price.trim()),
});

export default function CustomPriceForm({
  customPrice,
  onSave,
}: CustomPriceFormProps): JSX.Element {
  const [localCustomPrice, setLocalCustomPrice] = useState(
    customPriceToEditable(customPrice),
  );

  const isValid = useMemo(
    () => validateCustomPrice(localCustomPrice),
    [localCustomPrice],
  );

  return (
    <form
      className="mb-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid) {
          return;
        }
        onSave?.(editableToCustomPrice(localCustomPrice));
      }}
    >
      <div className={clsx(['mb-6'])}>
        <label
          htmlFor="product_name"
          className={clsx([
            'tw-block',
            'mb-2',
            'text-sm',
            'font-medium',
            'text-gray-900',
            'dark:text-white',
          ])}
        >
          {getMessage('product_name')}
          <span
            className={clsx([
              'ml-2',
              'text-xs',
              'font-normal',
              'text-gray-500',
              'dark:text-gray-400',
            ])}
          >
            {getMessage('required')}
          </span>
        </label>
        <input
          type="text"
          id="product_name"
          className={clsx([
            'border-input',
            '!bg-gray-50',
            'text-gray-900',
            '!text-sm',
            '!rounded-lg',
            'focus:ring-blue-500',
            'tw-block',
            'w-full',
            '!p-2.5',
            'dark:!bg-gray-700',
            'dark:placeholder-gray-400',
            'dark:text-white',
            'dark:focus:ring-blue-500',
            '!shadow-none',
          ])}
          placeholder={getMessage('product_name')}
          required
          value={localCustomPrice.name}
          onChange={({ target: { value } }) => {
            setLocalCustomPrice((prev) => ({
              ...prev,
              name: value,
            }));
          }}
        />
      </div>
      <div className={clsx(['mb-6'])}>
        <label
          htmlFor="product_url"
          className={clsx([
            'tw-block',
            'mb-2',
            'text-sm',
            'font-medium',
            'text-gray-900',
            'dark:text-white',
          ])}
        >
          {getMessage('product_url')}
        </label>
        <input
          type="text"
          id="product_url"
          className={clsx([
            'border-input',
            '!bg-gray-50',
            'text-gray-900',
            '!text-sm',
            '!rounded-lg',
            'focus:ring-blue-500',
            'tw-block',
            'w-full',
            '!p-2.5',
            'dark:!bg-gray-700',
            'dark:placeholder-gray-400',
            'dark:text-white',
            'dark:focus:ring-blue-500',
            '!shadow-none',
          ])}
          placeholder={getMessage('product_url')}
          value={localCustomPrice.url || ''}
          onChange={({ target: { value } }) => {
            setLocalCustomPrice((prev) => ({
              ...prev,
              url: value,
            }));
          }}
        />
      </div>
      <div className={clsx(['mb-6'])}>
        <label
          htmlFor="product_price"
          className={clsx([
            'tw-block',
            'mb-2',
            'text-sm',
            'font-medium',
            'text-gray-900',
            'dark:text-white',
          ])}
        >
          {getMessage('product_price')}
          <span
            className={clsx([
              'ml-2',
              'text-xs',
              'font-normal',
              'text-gray-500',
              'dark:text-gray-400',
            ])}
          >
            {getMessage('required')}
          </span>
        </label>
        <div className="flex">
          <span
            className={clsx([
              'inline-flex',
              'items-center',
              'px-3',
              'text-sm',
              'text-gray-900',
              'bg-gray-200',
              'border',
              'border-r-0',
              'border-gray-300',
              'rounded-l-md',
              'dark:bg-gray-600',
              'dark:text-gray-400',
              'dark:border-gray-600',
            ])}
          >
            ¥
          </span>
          <input
            type="number"
            id="product_price"
            className={clsx([
              'border-input',
              '!rounded-none',
              '!rounded-r-lg',
              '!bg-gray-50',
              'text-gray-900',
              'focus:!ring-blue-500',
              'tw-block',
              'flex-1',
              'min-w-0',
              'w-full',
              '!text-sm',
              '!p-2.5',
              'dark:!bg-gray-700',
              'dark:placeholder-gray-400',
              'dark:text-white',
              'dark:focus:!ring-blue-500',
              '!shadow-none',
              'outline-none',
            ])}
            required
            placeholder={getMessage('product_price')}
            value={localCustomPrice.price}
            onChange={({ target: { value } }) => {
              setLocalCustomPrice((prev) => ({
                ...prev,
                price: value,
              }));
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        className={clsx([
          'text-white',
          'bg-blue-700',
          'enabled:hover:bg-blue-800',
          'disabled:bg-blue-400',
          'focus:ring-4',
          'focus:outline-none',
          'focus:ring-blue-300',
          'font-medium',
          'rounded-lg',
          'text-sm',
          'w-full',
          'sm:w-auto',
          'px-5',
          'py-2.5',
          'text-center',
          'dark:bg-blue-600',
          'dark:enabled:hover:bg-blue-700',
          'dark:focus:ring-blue-800',
          'disabled:dark:bg-blue-500',
          'disabled:cursor-not-allowed',
        ])}
        disabled={!isValid}
      >
        {getMessage('save')}
      </button>
    </form>
  );
}
