import React from 'react';

interface ModalProps {
  header?: string | JSX.Element;
  content?: string | JSX.Element;
  positiveButton?: string | JSX.Element;
  negativeButton?: string | JSX.Element;
  open?: boolean;
  children?: JSX.Element;
  onDismiss?: () => void;
}

// Currently not used. Need to inject it to document body.
// Can be done later

export default function Modal({
  header,
  content,
  positiveButton,
  negativeButton,
  open,
  children,
  onDismiss,
}: ModalProps): JSX.Element {
  return (
    // Main modal
    <div
      tabIndex={-1}
      aria-hidden={open}
      className={`${open ? '' : 'hidden'} overflow-y-auto overflow-x-hidden
      fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex
      items-center justify-center`}
    >
      <div
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        onClick={onDismiss}
      />
      <div className="relative w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          {header ? (
            <div
              className="flex justify-between items-start p-4 rounded-t border-b
          dark:border-gray-600"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {header}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200
              hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex
              items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          ) : null}
          {/* Modal body */}
          {!children ? (
            <div className="p-6 space-y-6 text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {content}
            </div>
          ) : (
            children
          )}
          {/* Modal footer */}
          {positiveButton || negativeButton ? (
            <div
              className="flex items-center justify-end p-4 space-x-2 rounded-b
              border-t border-gray-200 dark:border-gray-600"
            >
              {typeof positiveButton === 'string' ? (
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {positiveButton}
                </button>
              ) : (
                positiveButton
              )}
              {typeof negativeButton === 'string' ? (
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100
                  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg
                  border border-gray-200 text-sm font-medium px-5 py-2.5
                  hover:text-gray-900 focus:z-10 dark:bg-gray-700
                  dark:text-gray-300 dark:border-gray-500 dark:hover:text-white
                  dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={onDismiss}
                >
                  {negativeButton}
                </button>
              ) : (
                negativeButton
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
