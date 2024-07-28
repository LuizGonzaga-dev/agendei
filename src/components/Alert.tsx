"use client"

import React, {useState} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Check, Error } from '@mui/icons-material';

export default function DynamicAlert(alertProps : {show : boolean, success:boolean, message:string}) {

    let {success, message, show} = alertProps;

    const handleClose = () => show = false;

    return (
        <>
            {
                show &&
                
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert
                        onClose={handleClose}
                        variant='filled'
                        severity={success ? 'success' : 'error'}
                        icon={success ? <Check/> : <Error/>}
                    >
                        {message}
                    </Alert>
                </Stack>

            }
        </>
    );
}