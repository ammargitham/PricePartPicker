import React, { ReactNode } from 'react';

import clsx from 'clsx';

import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';

export interface DialogProps {
  className?: string;
  open?: boolean;
  title?: ReactNode;
  trigger?: ReactNode;
  hideCloseButton?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
}

function Dialog({
  className,
  open,
  title,
  trigger,
  hideCloseButton,
  onDismiss,
  children,
}: DialogProps): JSX.Element {
  return (
    <Root
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onDismiss?.();
        }
      }}
    >
      {trigger ? <Trigger>{trigger}</Trigger> : null}
      <Portal>
        <Overlay
          className={clsx([
            'bg-black/50',
            'fixed',
            'inset-0',
            'animate-overlay',
          ])}
        />
        <Content
          className={clsx([
            className,
            'shadow-md',
            'fixed',
            'top-1/2',
            'left-1/2',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'focus:outline-none',
            'animate-contentShow',
            'z-[999]',
          ])}
        >
          {title ? (
            <Title className={clsx(['m-0', 'font-medium', 'text-base'])}>
              {title}
            </Title>
          ) : null}
          {children}
          {!hideCloseButton ? (
            <Close
              className={clsx(['h-4', 'w-4', 'absolute', 'top-2', 'right-2'])}
            >
              <XMarkIcon className="tw-block" />
            </Close>
          ) : null}
        </Content>
      </Portal>
    </Root>
  );
}

export default Dialog;
