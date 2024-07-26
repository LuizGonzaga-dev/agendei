"use client"
import { EventType } from '@/types/EventType';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { HH_MM } from '@/helpers/DataHoraToString';

type props = {
    event: EventType
}

const Card = (params: props) => {

    const {event} = params;

    return (
        <div className='flex flex-col shadow-lg border shadow-blue-500/50 border-blue-500/50 rounded px-1 py-1 mb-3 '>
            <div className='flex-1 flex flex-row px-2 py-1'>
                <div className='flex justify-center align-middle flex-1 card-title'><strong>{event.title}</strong></div>
                <EditIcon  className='cursor-pointer mr-1' fontSize='small'/>
                <DeleteIcon className='cursor-pointer' fontSize='small'/>
            </div>
            <hr className='bg-blue-500 '/>
            <div className='flex-1 flex flex-row px-2 py-1'>
                <div className='flex flex-1 flex-row card-text'>
                    <div className='flex-1'>Ínicio:</div>
                    <div className='flex-1'><strong>{HH_MM(event.start)}</strong></div>
                    <div className='flex-1'>Fim:</div>
                    <div className='flex-1'><strong>{HH_MM(event.end)}</strong></div>
                </div>
                
            </div>
            <hr className='bg-blue-500 '/>
            <div className='flex-1 px-2 py-2 card-text'>{event.description ?? "Sem descrição."}</div>
        </div>
    );
}

export default Card;
