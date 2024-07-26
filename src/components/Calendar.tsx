"use client"
import React, {useState, useEffect} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CustomPickersDay from './CustomPickerDay';
import ModalDialog from './Dialog';
import { api } from '@/api/Api';
import { jwtToken, userId } from '@/api/helpers';
import { EventType } from '@/types/EventType';
import DayEvents from './DayEvents';
import { thereAreEventsOnDay, filterEventsByDay } from '@/helpers/Filters';


const Calendar = () => {

    const [selectedDates, setSelectedDates] = useState<EventType[]>([]);
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [open, setOpen] = useState(false);
    const [initialDate, setInitialDate] = useState(dayjs());
    const [alertProps, setAlertProps] = useState<{success:boolean, message: string} >({success:false,message:""});
    const [eventByDay, setEventsByDay] = useState<EventType[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
          const events = await getEvents(userId); 
          setSelectedDates(events);
        };
    
        fetchEvents();
    }, []);

    const getEvents = async (id:string) : Promise<EventType[]> => {
        
        const response = await api.get("/Agenda/index", {
            params: {userId: id},
            headers: {Authorization: jwtToken},
        });
    
        let ev : EventType[] = []
    
        if(response.data.success){
            
            ev = response.data.events.$values.map((e: EventType) => ({
                eventId: e.eventId,
                title: e.title,
                description: e.description,
                start: new Date(e.start),
                end: new Date(e.end),
                isDeleted: e.isDeleted,
                userId: e.userId
            }));
    
        }
    
        return ev;
    }

    const handleDateChange = (date: Dayjs | null) => {
        
        setValue(date);
        if (date) {
        
            if( selectedDates.length != 0 && thereAreEventsOnDay({allEvents:selectedDates, day:date})){
                setEventsByDay(filterEventsByDay({allEvents: selectedDates, day:date}));
            }else{
                setOpen(true);
            }
        }
    };

    //cria evento no banco
    const handleEventSubmit = async (event: EventType) => {
        // Envia o novo evento ao backend     
        event.userId =  parseInt(userId);
        const response = await api.post("/Agenda/create", event, {
            headers: { Authorization: jwtToken }
        });
        
        if (response.data.success) {
            // Adicionar evento à lista de eventos
            setSelectedDates([...selectedDates, event]);
            setAlertProps({success:true, message: response.data.message})
        }else{
            setAlertProps({success:false, message: response.data.message})
        }
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker 
                    orientation="portrait"
                    value={dayjs()}
                    onChange={handleDateChange}
                    
                    slots={{
                    day: (dayProps) => <CustomPickersDay {...dayProps} selectedDays={selectedDates} />,
                    }}
                />            

                <ModalDialog
                    open={open}
                    handleClose={() => setOpen(false)}
                    handleEventSubmit={handleEventSubmit}
                    initialDate={initialDate}
                    alertProps={alertProps}
                    setAlertProps={setAlertProps}
                />
            </LocalizationProvider>
            <DayEvents 
                eventsToShow={eventByDay}
            />
        </>
    );
}

export default Calendar;