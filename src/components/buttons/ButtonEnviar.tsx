"use client"
import React from 'react';
import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';

type props = {
    isSubmitting : boolean;
}

const ButtonEnviar = () => {

    //const {isSubmitting} = params;

    return (
        <Button
            variant='contained'
            type='submit'
            size='small'
            endIcon={<Send/>}
            disabled={false}
            className='mt-3'
        >enviar</Button>
    );
}

export default ButtonEnviar;