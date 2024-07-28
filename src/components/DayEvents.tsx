import {EventType} from "@/types/EventType"
import Card from "./Card";
import { DD_MM_YYYY } from "@/helpers/DataHoraToString";

type props = {
    eventsToShow: EventType[];
    onEdit: (event: EventType) => void;
    onDelete: (event: EventType) => void;
}

const DayEvents = (params: props) => {

    const {eventsToShow, onEdit, onDelete} = params;

    return (
        <div className="flex flex-col py-12 ">
            <div className="css-3jvy96-MuiTypography-root-MuiDatePickerToolbar-title">Eventos do dia</div>
            {
                eventsToShow.length == 0 &&
                <div className="flex flex-1 items-center css-dplwbx-MuiPickersCalendarHeader-label">Click em um dia que tenha eventos para listá-los</div>
            }
            
            {
                eventsToShow.length > 0 &&
                eventsToShow.map((e) => 
                    <Card 
                        key={e.eventId}
                        event={e}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                )
            }
        </div>
    );
}

export default DayEvents;