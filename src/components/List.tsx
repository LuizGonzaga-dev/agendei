import React from 'react'
import Card from './Card';
import { CardType } from '@/types/CardType';

const List = (params: CardType) => {

    const {eventsToShow, onDelete, onEdit} = params;

    return (
        
            <ul>
                {
                    eventsToShow.map(e => 
                        <li  key={e.eventId}>
                            <Card 
                                event={e}
                                onDelete={onDelete}
                                onEdit={onEdit}                            
                            />
                        </li>
                    )
                }
            </ul>
        
    );

}

export default List;