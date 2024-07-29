import {EventType} from "@/types/EventType"
import Card from "./Card";
import { DD_MM_YYYY } from "@/helpers/DataHoraToString";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import {CardType} from '@/types/CardType'
import List from "./List";

const DayEvents = (params: CardType) => {

    const {eventsToShow, onEdit, onDelete, onCreate} = params;

    return (
        <div id="day-events-container" className="content">
            
                <div className=" elemento flex">
                    <div className="text-xl text-center flex-1">Eventos do dia</div>
                    <Fab sx={{cursor:'pointer'}} onClick={onCreate} size="small" color="primary" aria-label="add">
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