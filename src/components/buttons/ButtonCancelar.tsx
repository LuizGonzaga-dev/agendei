import React from 'react';
import { Cancel } from '@mui/icons-material';
import { Button } from '@mui/material';

type props = {
}

const ButtonCancelar = (params: props) => {


    return (
        <Button
            variant='contained'
            size='small'
            endIcon={<Cancel/>}
            className='mt-3'
            sx={{marginRight:'10px'}}
        >cancelar</Button>
    );
}

export default ButtonCancelar;