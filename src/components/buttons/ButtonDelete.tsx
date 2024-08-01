"use client"
import React from 'react';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { EventType } from '@/types/EventType';

type props = {
    isSubmitting: boolean;
    deleteEvent: (eventTodeletId: number) => void;
    event: EventType;
}

const ButtonDelete = (params: props) => {

    const {isSubmitting, deleteEvent, event} = params;

    return (
        <Button
            onClick={() => deleteEvent(event.eventId ?? 0)}
            variant='contained'
            type='submit'
            size='small'
            endIcon={<Delete/>}
            disabled={isSubmitting}
            className='mt-3'
        >deletar</Button>
    );
}

export default ButtonDelete;