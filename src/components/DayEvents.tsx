import React, {useState, useEffect} from "react";
import {EventType} from "@/types/EventType"
import Card from "./Card";
import { DD_MM_YYYY } from "@/helpers/DataHoraToString";

type props = {
    eventsToShow: EventType[];
}

const DayEvents = (params: props) => {

    const {eventsToShow} = params;
    const[events, setEvents] = useState<EventType[]>(eventsToShow);

    useEffect(() => {
        setEvents(eventsToShow);
    }, [eventsToShow]);

    return (
        <div className="flex flex-col py-12 ">
            <div className="css-3jvy96-MuiTypography-root-MuiDatePickerToolbar-title">Eventos do dia {eventsToShow.length > 0 ? DD_MM_YYYY(eventsToShow[0].start) : "" }</div>
            {
                events.length == 0 &&
                <div className="flex flex-1 items-center css-dplwbx-MuiPickersCalendarHeader-label">Click em um dia que tenha eventos para listá-los</div>
            }
            
            {
                events.length > 0 &&
                events.map((e) => 
                    <Card 
                        event={e}
                    />
                )
            }
        </div>
    );
}

export default DayEvents;