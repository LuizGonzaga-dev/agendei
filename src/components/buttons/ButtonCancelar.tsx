import React from 'react';
import { Cancel } from '@mui/icons-material';
import { Button } from '@mui/material';

type props = {
}

const ButtonCancelar = (params: props) => {


    return (
        <Button
            variant='contained'
            type='submit'
            size='small'
            endIcon={<Cancel/>}
            className='mt-3'
        >cancelar</Button>
    );
}

export default ButtonCancelar;