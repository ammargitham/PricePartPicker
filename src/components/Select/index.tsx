import React, {
  ForwardedRef,
  Key,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

import clsx from 'clsx';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import {
  Arrow,
  Content,
  Icon,
  ItemText,
  Portal,
  Item as RadixItem,
  SelectItemProps as RadixSelectItemProps,
  SelectProps as RadixSelectProps,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';

type ContentType = ReactNode | ((isSelected?: boolean) => ReactNode);

export interface Option {
  key: Key;
  value: RadixSelectItemProps['value'];
  text?: string;
  content: ContentType;
}

interface SelectProps {
  placeholder?: string;
  options: Option[];
  value?: RadixSelectProps['value'];
  disabled?: boolean;
  onChange?: (value: string) => void;
}

function renderOption(option: Option, isSelected?: boolean): ReactNode {
  if (typeof option.content === 'function') {
    return option.content(isSelected);
  }
  return option.content;
}

export default function Select({
  placeholder,
  options,
  value,
  disabled,
  onChange,
}: SelectProps): JSX.Element {
  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  const renderValue = useCallback((): ReactNode => {
    if (!selectedOption) {
      return null;
    }
    if (selectedOption.text) {
      return selectedOption.text;
    }
    return renderOption(selectedOption, true);
  }, [selectedOption]);

  return (
    <Root value={value} disabled={disabled} onValueChange={onChange}>
      <Trigger
        className={clsx([
          'w-48',
          'inline-flex',
          'items-center',
          'justify-between',
          'gap-[5px]',
          'p-2.5',
          'bg-gray-50',
          'border',
          'border-gray-300',
          'text-gray-900',
          'text-sm',
          'rounded-lg',
          'focus:outline-none',
          'focus:ring-blue-500',
          'focus:border-blue-500',
          'dark:bg-gray-700',
          'dark:border-gray-600',
          'data-[placeholder]:text-gray-400',
          'dark:data-[placeholder]:text-gray-400',
          'dark:text-white',
          'dark:focus:ring-blue-500',
          'dark:focus:border-blue-500',
        ])}
      >
        <span
          className={clsx([
            'overflow-hidden',
            'text-clip',
            'whitespace-nowrap',
          ])}
        >
          <Value placeholder={placeholder}>{renderValue()}</Value>
        </span>
        <Icon className={clsx(['text-gray-900', 'dark:text-gray-400'])}>
          <ChevronDownIcon className={clsx(['w-4', 'h-4', 'tw-block'])} />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          className={clsx([
            'min-w-[12rem]',
            'text-sm',
            'font-medium',
            'text-gray-900',
            'bg-white',
            'border',
            'border-gray-200',
            'rounded-lg',
            'dark:bg-gray-700',
            'dark:border-gray-600',
            'dark:text-white',
            'overflow-hidden',
            'shadow-md',
            'z-[999]',
          ])}
        >
          <ScrollUpButton className="select-scroll-icon">
            <ChevronUpIcon className={clsx(['tw-block', 'h-6'])} />
          </ScrollUpButton>
          <Viewport className={clsx(['p-1', 'space-y-1'])}>
            {options.map((o) => (
              <Item key={o.key} option={o} isSelected={o.value === value} />
            ))}
          </Viewport>
          <ScrollDownButton className="select-scroll-icon">
            <ChevronDownIcon className={clsx(['tw-block', 'h-6'])} />
          </ScrollDownButton>
          <Arrow />
        </Content>
      </Portal>
    </Root>
  );
}

interface ItemProps {
  option: Option;
  isSelected?: boolean;
}

function ItemComponent(
  { option, isSelected }: ItemProps,
  forwardedRef: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  return (
    <RadixItem
      ref={forwardedRef}
      value={option.value}
      className={clsx([
        'px-4',
        'py-2',
        'rounded-lg',
        'select-none',
        'cursor-pointer',
        isSelected && ['bg-blue-700', 'dark:bg-gray-800', 'text-white'],
        !isSelected && [
          'hover:bg-gray-100',
          'dark:hover:bg-gray-600',
          'hover:text-blue-700',
          'focus:text-blue-700',
        ],
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-700',
        'dark:border-gray-600',
        'dark:hover:text-white',
        'dark:focus:ring-gray-500',
        'dark:focus:text-white',
      ])}
    >
      <ItemText>{renderOption(option, isSelected)}</ItemText>
    </RadixItem>
  );
}

const Item = React.forwardRef(ItemComponent);
