"use client"

import React, {useState} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function ActionAlerts(alertProps : {success:boolean, message:string}) {

    const {success, message} = alertProps;
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = () => {setOpen(false)}

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>

            {
                open && (
                    success ? 
                    (
                        <Alert severity="success" onClose={handleClose}>
                            {message}
                        </Alert>
                    ) : 
                    (
                        <Alert severity="error" onClose={handleClose}>
                            {message}
                        </Alert>
                    )
                )
            }
        </Stack>
    );
}