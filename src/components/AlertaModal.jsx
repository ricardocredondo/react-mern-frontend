import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import styles from '../styles/usuarios/components/AlertaModal.module.css';
import useAlerta from '../hooks/useAlerta.hooks';
const AlertaModal = () => {
  const { alerta, modalAlerta, ocultarAlerta } = useAlerta();
  return (
    <>
      <Transition appear show={modalAlerta} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-hidden"
          onClose={ocultarAlerta}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-10 text-white my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h4"
                  className={`${
                    alerta.error ? styles.error__true : styles.error__false
                  } p-4 rounded `}
                >
                  {alerta.msg}
                </Dialog.Title>

                <div>
                  <button
                    type="button"
                    className="w-full uppercase px-4 bg-transparent border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-transparent"
                    onClick={ocultarAlerta}
                  ></button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default AlertaModal;
