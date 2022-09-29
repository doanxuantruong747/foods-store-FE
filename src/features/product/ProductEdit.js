import React from 'react';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormEditProductDialog from './FormEditProductDialog';


export default function ProductEdit({ productCurrent, setOpen, open }) {

    const product = productCurrent;

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Dialog open={open} onClose={handleClose}  >

            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                <FormEditProductDialog product={product} handleClose={handleClose} />
            </DialogContent>

        </Dialog>


    );
}
