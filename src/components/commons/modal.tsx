/* eslint-disable react/jsx-no-bind */
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, ReactNode, useEffect, useState } from 'react';

type Props = {
  visible: boolean;
  title?: string;
  classContent?: string;
  classPanel?: string;
  onClose: () => void;
  afterLoad?: () => void;
  footer?: JSX.Element | ReactNode;
  children?: ReactNode;
};

export default function Modal({
  visible,
  title,
  classPanel,
  classContent,
  onClose,
  afterLoad,
  footer,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(visible);
    if (visible) setTimeout(() => afterLoad?.(), 100);
  }, [visible, afterLoad]);

  function closeModal() {
    setIsOpen(false);
    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={clsx(
              'flex min-h-full items-center justify-center p-4 text-center',
              classContent,
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all',
                  classPanel,
                )}
              >
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  {title}
                </Dialog.Title>
                {children}
                {footer ? (
                  <div>{footer}</div>
                ) : (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
