import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import {Check, Error} from '@mui/icons-material';

type props = {    
    handleClose: () => void
    snackBarUpdate: {message: string, success: boolean, open: boolean}
}

const MySnackbar = (params: props) => {

    const {snackBarUpdate, handleClose} = params

    return (
        
         <Snackbar
            open={snackBarUpdate.open}
            onClose={handleClose}
            autoHideDuration={8000}
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
         >
            <Alert
                onClose={handleClose}
                variant='filled'
                severity={snackBarUpdate.success ? 'success' : 'error'}
                icon={snackBarUpdate.success ? <Check/> : <Error/>}
            >
                {snackBarUpdate.message}
            </Alert>
         </Snackbar>

        
    );
}

export default MySnackbar;