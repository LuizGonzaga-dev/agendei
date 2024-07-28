"use client"
import React, {useState, useEffect} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CustomPickersDay from './CustomPickerDay';
import ModalDialog from './Dialog';
import { api } from '@/api/Api';
import { EventType } from '@/types/EventType';
import DayEvents from './DayEvents';
import { thereAreEventsOnDay } from '@/helpers/Filters';
import { Backdrop } from '@mui/material';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import * as eventsSetData  from '@/redux/reducers/eventsReducer';
import ModalCreateEdit from './modais/ModalCreateEdit';
import { EventsResponseType } from '@/types/EventsResponseType';
import ModalDelete from './modais/ModalDelete';

const Calendar = () => {

    const userData = useAppSelector(u => u.user);
    const eventsGetData = useAppSelector(u => u.events);
    const dispatch = useDispatch();

    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [open, setOpen] = useState(false);
    const [initialDate, setInitialDate] = useState(dayjs());
    const [alertProps, setAlertProps] = useState<{success:boolean, message: string} >({success:false,message:""});
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);

    const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>();
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<EventType | undefined>();
    const [showModalDeleteEvent, setShowModalDeleteEvent] = useState(false);
     
    // Função para abrir o modal com o evento selecionado
    const openModalEditEvent = (event: EventType): void => {
        debugger
        setSelectedEvent(event);
        setShowModalEdit(true);
    };

    const openModalDeleteEvent = (event: EventType) : void => {
        setEventToDelete(event);
        setShowModalDeleteEvent(true)
    }

    //quando carrega roda aqui pra carregar os eventos
    useEffect(() => {
        const fetchEvents = async () => {
            setShowBackDrop(true);
            const events = await getEvents(); 
            dispatch(eventsSetData.setAllEvents(events));
            setShowBackDrop(false);
        };
        fetchEvents();
    }, []);

    //ok
    const getEvents = async () : Promise<EventType[]> => {
        
        const response = await api.get("/Agenda/index", {
            params: {userId: userData.userId},
            headers: {Authorization: userData.token},
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
            dispatch(eventsSetData.setSelectedDay(date));
            if( eventsGetData.allEvents.length != 0 && thereAreEventsOnDay({allEvents:eventsGetData.allEvents, day:date.toDate()})){
                dispatch(eventsSetData.setEventsInSpecificDay());
            }else{
                setOpen(true);
            }            
        }
    };

    //cria evento no banco
    const handleEventSubmit = async (event: EventType) => {
        // Envia o novo evento ao backend     
        event.userId =  parseInt(userData.userId);
        const response = await api.post("/Agenda/create", event, {
            headers: { Authorization: userData.token }
        });
        
        if (response.data.success) {
            // Adicionar evento à lista de eventos
            dispatch(eventsSetData.insertIntoAllEvents(event));
            setAlertProps({success:true, message: response.data.message})
        }else{
            setAlertProps({success:false, message: response.data.message})
        }        
    };

    const handleEventEdit = async(event :EventType) => {
        
        const response = await api.put("/Agenda/edit", event,{
            headers:{Authorization: userData.token}
        });
        
        if(response.data.success){
            eventsSetData.updateEvent(response.data.events.$values[0]);
        }else{
            //TODO
        }
    }

    const handleEventDelete = async (event: EventType) => {
        
        const response = await api.delete("Agenda/delete", {
        headers: { Authorization: userData.token },
        params: { eventId: event.eventId }
        });
    
        if (response.data.success) {
            eventsSetData.removeEventById(event.eventId ?? 0);
        } else {
        //TODO
        }
        
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker 
                    orientation="portrait"
                    value={value}
                    onChange={handleDateChange}
                    slots={{
                    day: (dayProps) => <CustomPickersDay {...dayProps} selectedDays={eventsGetData.allEvents} />,
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

                <ModalCreateEdit 
                    open={showModalEdit && selectedEvent !== null}
                    event={selectedEvent}
                    handleClose={() => setShowModalEdit(false)}
                    handleEventSubmit={handleEventEdit}
                />

                <ModalDelete
                    open = {showModalDeleteEvent && eventToDelete !== null}
                    event={eventToDelete}
                    handleDeleteEvent={handleEventDelete}
                />
            </LocalizationProvider>
            <DayEvents 
                eventsToShow={eventsGetData.eventsInSpecificDay}
                onEdit={openModalEditEvent}
                onDelete = {openModalDeleteEvent}
            />
            <Backdrop
                open={showBackDrop}
            />
        </>
    );
}

export default Calendar;