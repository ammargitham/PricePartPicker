import React, { ReactNode } from 'react';

import clsx from 'clsx';

import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from '@radix-ui/react-tooltip';

interface TooltipProps {
  trigger: ReactNode;
  content: ReactNode;
  removePadding?: boolean;
}

export default function Tooltip({
  trigger,
  content,
  removePadding,
}: TooltipProps): JSX.Element {
  return (
    <Provider>
      <Root>
        <Trigger asChild>{trigger}</Trigger>
        <Portal>
          <Content
            className={clsx([
              'bg-white',
              'dark:bg-gray-700',
              'text-black',
              'dark:text-white',
              'text-sm',
              'font-medium',
              'shadow-sm',
              'rounded-lg',
              'min-w-[5rem]',
              'max-w-[25rem]',
              {
                'px-3': !removePadding,
                'py-2': !removePadding,
              },
              'border',
              'border-gray-200',
              'dark:border-gray-600',
              'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
              'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
              'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
              'data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade',
              'will-change-[transform,opacity]',
            ])}
          >
            {content}
            <Arrow className={clsx(['fill-white', 'dark:fill-gray-700'])} />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
}
