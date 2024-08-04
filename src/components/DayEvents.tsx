"use client"
import Card from "./Card";
import { DD_MM_YYYY } from "@/helpers/DataHoraToString";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import {CardType} from '@/types/CardType';
import dayjs from "dayjs";

const DayEvents = (params: CardType) => {

    const {eventsToShow, onEdit, onDelete, onCreate} = params;
    const selectedDay = eventsToShow.length != 0 ? eventsToShow[0].start : null;
    
    return (
        <div id="day-events-container" className="content">
            
                <div className=" elemento flex">
                    <div className="text-lg text-center flex-1 flex items-center justify-center">Eventos do dia {selectedDay !== null ? DD_MM_YYYY(selectedDay) : ''}</div>
                    <Fab sx={{cursor:'pointer'}} onClick={()=> onCreate(dayjs(selectedDay))} size="small" color="primary" aria-label="add">
                        <Add/>
                    </Fab>
                </div>
                {
                    eventsToShow.length == 0 &&
                    <div className="text-center text-sm elemento">Click em um dia que tenha eventos para listá-los ou click em um dia sem eventos para adicionar.</div>
                }

                {eventsToShow.length > 0 && (
                    <div className="elemento card-list-container" >
                        {eventsToShow.map(e => (
                            <Card 
                                key={e.eventId}
                                event={e}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            
        </div>
    );
}

export default DayEvents;