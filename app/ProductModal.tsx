'use client';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { TextInput } from '@tremor/react';

const ProductModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <form className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
                action='/api/products' method='post'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div
                      className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <InformationCircleIcon
                        className='h-6 w-6 text-indigo-600'
                        aria-hidden='true'
                      />
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-base font-semibold leading-6 text-gray-900'
                      >
                        Añadir producto
                      </Dialog.Title>
                      <div className='mt-2'>
                        <label htmlFor='nombre' className='block text-sm font-medium text-gray-700'>Nombre</label>
                        <TextInput placeholder='Introduce el nombre' name='nombre' id='nombre' required />
                        <label htmlFor='compuesto' className='block text-sm font-medium text-gray-700'>Compuesto</label>
                        <TextInput name='compuesto' id='compuesto' />
                        <label htmlFor='tipo' className='block text-sm font-medium text-gray-700'>Tipo</label>
                        <TextInput name='tipo' id='tipo' />
                        <label htmlFor='grupo' className='block text-sm font-medium text-gray-700'>Grupo</label>
                        <TextInput name='grupo' id='grupo' />
                        <label htmlFor='para' className='block text-sm font-medium text-gray-700'>Tratamiento
                          para</label>
                        <TextInput name='para' id='para' />
                        <label htmlFor='dosis' className='block text-sm font-medium text-gray-700'>Dosis</label>
                        <TextInput name='dosis' id='dosis' />
                        <label htmlFor='cuando' className='block text-sm font-medium text-gray-700'>Cuándo</label>
                        <TextInput name='cuando' id='cuando' />
                        <label htmlFor='cultivo' className='block text-sm font-medium text-gray-700'>Cultivo</label>
                        <TextInput name='cultivo' id='cultivo' />
                        <label htmlFor='ps' className='block text-sm font-medium text-gray-700'>PS</label>
                        <TextInput name='ps' id='ps' />
                        <label htmlFor='notas' className='block text-sm font-medium text-gray-700'>Notas</label>
                        <TextInput name='notas' id='notas' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                    onClick={onClose}
                  >
                    Guardar
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProductModal;