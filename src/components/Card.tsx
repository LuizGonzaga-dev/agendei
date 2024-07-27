"use client"
import { EventType } from '@/types/EventType';
import * as React from 'react';
import IconButtonDelete from './buttons/ButtonDelete';
import IconButtonEdit from './buttons/ButtonEdit';
import { HH_MM } from '@/helpers/DataHoraToString';
import {api} from "@/api/Api";
import {jwtToken, userId} from "@/api/helpers"

type props = {
    event: EventType
}

const Card = (params: props) => {

    const {event} = params;

    const deleteAsync = async (eventId: number | undefined) => {
        if (eventId) {
          const response = await api.delete("Agenda/delete", {
            headers: { Authorization: jwtToken },
            params: { eventId }
          });
      
          if (response.data.success) {
            //TODO
          } else {
            //TODO
          }
        }
    };

    const handleDeleteEvent = (eventId: number | undefined) => async () => {
        await deleteAsync(eventId);
    };    


    return (
        <div className='flex flex-col shadow-lg border shadow-blue-500/50 border-blue-500/50 rounded px-1 py-1 mb-3 '>
            <div className='flex-1 flex flex-row px-2 py-1'>
                <div className='flex justify-center align-middle flex-1 card-title'><strong>{event.title}</strong></div>
                {/* <IconButtonEdit onClick={handleDeleteClick(event.eventId)}/> */}
                <IconButtonDelete onClick={handleDeleteEvent(event.eventId)}/>
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
