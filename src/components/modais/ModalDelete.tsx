import { EventType } from '@/types/EventType';
import React from  'react'
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Typography} from '@mui/material';
import { format } from 'date-fns';
import ButtonDelete from '../buttons/ButtonDelete';

type props = {
    event: EventType | undefined;
    open: boolean;
    handleDeleteEvent: (event: EventType) => Promise<void>;
}

const ModalDelete = (params: props) => {

    const {open, event, handleDeleteEvent} = params;

    if(event === undefined){
        return;
    }
        

    return (
        <Dialog open={open}>

            <DialogTitle className='font-bold'>
                Confirme para deletar o evento abaixo!
            </DialogTitle>
            <Divider variant='fullWidth'/>
            <DialogContent>
                <DialogContentText>
                    <Box sx={{ 
                        paddingTop: '16.5px', 
                        paddingBottom: '8px', 
                        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                        '& .MuiTypography-root': { fontFamily: 'inherit', fontSize: 'inherit' }
                    }}>
                        <Typography className='mb-2' variant="body2">Título:</Typography>
                        <Typography className='font-bold' variant="body1">{event.title}</Typography>
                    </Box>
                    <Box sx={{ 
                        paddingTop: '16.5px', 
                        paddingBottom: '8px', 
                        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                        '& .MuiTypography-root': { fontFamily: 'inherit', fontSize: 'inherit' }
                    }}>
                        <Typography className='mb-2' variant="body2">Descrição:</Typography>
                        <Typography className='font-bold' variant="body1">{event.description}</Typography>
                    </Box>
                    <span className='flex flex-row gap-4'>
                        <Box sx={{ 
                            flex:'1',
                            paddingTop: '16.5px', 
                            paddingBottom: '8px', 
                            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                            '& .MuiTypography-root': { fontFamily: 'inherit', fontSize: 'inherit' }
                        }}>
                            <Typography className='mb-2' variant="body2">Início:</Typography>
                            <Typography className='font-bold' variant="body1">{format(event.start, "dd/MM/yyyy HH:mm")}</Typography>
                        </Box>
                        <Box sx={{ 
                            flex:'1',
                            paddingTop: '16.5px', 
                            paddingBottom: '8px', 
                            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                            '& .MuiTypography-root': { fontFamily: 'inherit', fontSize: 'inherit' }
                        }}>
                            <Typography className='mb-2' variant="body2">Fim:</Typography>
                            <Typography className='font-bold' variant="body1">{format(event.end, "dd/MM/yyyy HH:mm")}</Typography>
                        </Box>
                    </span>
                    
                    <ButtonDelete 
                        isSubmitting={false}
                        deleteEvent={() => handleDeleteEvent(event)}
                        event={event}
                    />
                </DialogContentText>
                
            </DialogContent>
        </Dialog>
    );
}

export default ModalDelete;