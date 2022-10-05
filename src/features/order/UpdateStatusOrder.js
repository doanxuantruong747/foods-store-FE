import React from 'react';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FormUpdateStatusOrder from './FormUpdateStatusOrder';


export default function UpdateStatusOrder({ orderCurrent, setOpen, open }) {

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Dialog open={open} onClose={handleClose}  >

            <DialogTitle>Update Status Order</DialogTitle>

            <DialogContent >
                <FormUpdateStatusOrder orderCurrent={orderCurrent} handleClose={handleClose} />
            </DialogContent>

        </Dialog>


    );
}
