"use client"
import { EventType } from '@/types/EventType';
import * as React from 'react';
import IconButtonDelete from './buttons/IconButtonDelete';
import IconButtonEdit from './buttons/IconButtonEdit';
import { HH_MM } from '@/helpers/DataHoraToString';

type props = {
    event: EventType;
    onEdit: (event: EventType) => void;
    onDelete: (event: EventType) => void;
}

const Card = (params: props) => {

    const {event, onEdit, onDelete} = params;

    return (
        <div className='event-card flex flex-col mt-1 shadow-md border shadow-blue-500/50 border-blue-500/50 rounded px-1 py-1 mb-3'>
            <div className='flex-1 flex flex-row px-2 py-1'>
                <div className='flex justify-center align-middle flex-1 text-lg'>{event.title}</div>
                <IconButtonEdit onClick={() => onEdit(event)}/>
                <IconButtonDelete onClick={() => onDelete(event)}/>
            </div>
            <hr className='bg-blue-500 '/>
            <div className='flex-1 flex flex-row px-2 py-1'>
                <div className='flex flex-1 flex-row card-text'>
                    <div className='flex-1 text-md'>Ínicio:</div>
                    <div className='flex-1 text-md'><strong>{HH_MM(event.start)}</strong></div>
                    <div className='flex-1 text-md'>Fim:</div>
                    <div className='flex-1 text-md'><strong>{HH_MM(event.end)}</strong></div>
                </div>
                
            </div>
            <hr className='bg-blue-500 '/>
            <div className='flex-1 px-2 py-2 card-text text-md'>{event.description ?? "Sem descrição."}</div>
        </div>
    );
}

export default Card;
