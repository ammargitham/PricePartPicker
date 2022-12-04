import React, { useRef, useState } from 'react';

import { Portal } from '@reach/portal';
import { Position, TooltipPopup, useTooltip } from '@reach/tooltip';

import { PRect } from '@src/types';

const centered: Position = (
  triggerRect?: PRect | null,
  tooltipRect?: PRect | null,
) => {
  if (!triggerRect || !tooltipRect) {
    return {};
  }
  const triggerCenter =
    (triggerRect?.left || 0) + (triggerRect?.width || 0) / 2;
  const left = triggerCenter - (tooltipRect?.width || 0) / 2;
  const maxLeft = window.innerWidth - (tooltipRect?.width || 0) - 2;
  // console.log(triggerRect, tooltipRect, triggerCenter, left, maxLeft);
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: (triggerRect?.bottom || 0) + 8 + window.scrollY,
  };
};

interface TooltipProps {
  label?: React.ReactNode;
  'aria-label'?: string;
  className?: string;
  arrowClassName?: string;
  children: React.ReactElement<React.ReactNode>;
}

export default function Tooltip({
  label,
  'aria-label': ariaLabel,
  className,
  arrowClassName,
  children,
}: TooltipProps): JSX.Element {
  const [trigger, tooltip] = useTooltip();
  const { isVisible, triggerRect } = tooltip;

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();
  const [contentHover, setContentHover] = useState(false);

  const isActuallyVisible = contentHover || isVisible;
  // const isActuallyVisible = true;

  return (
    <>
      {React.cloneElement(children, trigger)}
      {isActuallyVisible && (
        // The Triangle. We position it relative to the trigger, not the popup
        // so that collisions don't have a triangle pointing off to nowhere.
        // Using a Portal may seem a little extreme, but we can keep the
        // positioning logic simpler here instead of needing to consider
        // the popup's position relative to the trigger and collisions
        <Portal>
          <div
            className={`${arrowClassName || ''}
            w-[10px] h-[10px] absolute translate-y-[3px] z-[11]
            before:w-[10px] before:h-[10px] before:absolute
            before:bg-white before:dark:bg-gray-800
            before:content-[''] before:rotate-45
            before:border-solid before:border-gray-200 before:dark:border-gray-600
            before:border-t-[1px] before:border-l-[1px]
            after:w-[9px] after:h-[9px] after:absolute after:bg-inherit
            after:content-[''] after:rotate-45
            after:border-solid after:border-gray-200 after:dark:border-gray-600
            after:border-t-[1px] after:border-l-[1px]`}
            style={{
              left: triggerRect
                ? triggerRect.left - 5 + triggerRect.width / 2
                : undefined,
              top: triggerRect
                ? triggerRect.bottom + window.scrollY
                : undefined,
            }}
          />
        </Portal>
      )}
      <TooltipPopup
        {...tooltip}
        label={label}
        className={`${className || ''}
        absolute px-3 py-2 min-w-[5rem] max-w-[25rem]
        z-10 text-sm font-light text-gray-500 bg-white border border-gray-200
        rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
        aria-label={ariaLabel}
        position={centered}
        isVisible={isActuallyVisible}
        onPointerEnter={() => {
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
          }
          setContentHover(true);
        }}
        onPointerLeave={() => {
          timeoutIdRef.current = setTimeout(() => {
            setContentHover(false);
          }, 500);
        }}
      />
    </>
  );
}
