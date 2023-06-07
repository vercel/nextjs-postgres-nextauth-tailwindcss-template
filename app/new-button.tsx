'use client';

import { Button } from '@tremor/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import ProductModal from './ProductModal';
import { useCallback, useState } from 'react';

const NewButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(
    () => {
      setOpen(false);
    },
    [setOpen]
  );

  const handleClick = () => setOpen(true);
  return (
    <>
      <Button className='ml-auto' icon={PlusIcon} variant='secondary' onClick={handleClick}>Nuevo producto</Button>
      <ProductModal open={open} onClose={handleClose} />
    </>
  );
};

export default NewButton;