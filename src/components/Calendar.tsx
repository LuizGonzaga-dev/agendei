"use client"
import React, {useState, useEffect} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import CustomPickersDay from './CustomPickerDay';
import { api } from '@/api/Api';
import { EventType } from '@/types/EventType';
import DayEvents from './DayEvents';
import { thereAreEventsOnDay } from '@/helpers/Filters';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import * as eventsSetData  from '@/redux/reducers/eventsReducer';
import ModalCreateEdit from './modais/ModalCreateEdit';
import ModalDelete from './modais/ModalDelete';
import MySnackbar from './Snackbar';
import { EventResponseViewModel } from '@/Interfaces/ResponseAgendaController';
import 'dayjs/locale/pt-br';

const Calendar = () => {

    const userData = useAppSelector(u => u.user);
    const eventsGetData = useAppSelector(u => u.events);
    const dispatch = useDispatch();

    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);

    const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>();
    const [showModalCreateEdit, setShowModalCreateEdit] = useState({open: false, success: false, message: '', create: false});
    const [eventToDelete, setEventToDelete] = useState<EventType | undefined>();
    const [showModalDeleteEvent, setShowModalDeleteEvent] = useState(false);

    const [snackbarUpdate, setSnackbarUpdate] = useState({message: '', success: false, open: false});
     
    // Função para abrir o modal com o evento selecionado
    const openModalEditEvent = (event: EventType): void => {
        setSelectedEvent(event);
        setShowModalCreateEdit({...showModalCreateEdit, open:true, create: false});
    };

    const openModalCreateEvent = (clickedDay: Dayjs) : void => {
        setSelectedEvent({title:'', start:clickedDay.toDate(), end: clickedDay.add(1,'hour').toDate(), eventId:0, description:''});
        setShowModalCreateEdit({...showModalCreateEdit, create:true, open:true})
    }

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
            if( eventsGetData.allEvents.length != 0 && thereAreEventsOnDay({allEvents:eventsGetData.allEvents, day:date.toDate()})){
                dispatch(eventsSetData.filterByDate(date.toDate()));

            }else{
                //setOpen(true);
                openModalCreateEvent(date);
                // setShowModalCreateEdit({...showModalCreateEdit, open:true, create: true});
            }            
        }
    };

    //cria evento no banco
    const handleEventSubmit = async (event: EventType) => {
        // Envia o novo evento ao backend     
        event.userId =  parseInt(userData.userId);
        const response = await api.post<Promise<EventResponseViewModel>>("/Agenda/create", event, {
            headers: { Authorization: userData.token }
        }).then(r => r.data);
        
        if (response.success) {
            dispatch(eventsSetData.insertIntoAllEvents(response.events.$values[0]));
            dispatch(eventsSetData.filterByDate(event.start));//atualiza lista
            setSnackbarUpdate({open:true, success: true, message: response.message});
        }else{
            setSnackbarUpdate({open: true, success: false, message: response.message});
        }        
        
        return response;
    };

    const handleEventEdit = async (event :EventType) =>  {

        setShowBackDrop(true);

        const response = await api.put<Promise<EventResponseViewModel>>("/Agenda/edit", event,{
            headers:{Authorization: userData.token}
        }).then(e => e.data);
        
        setShowBackDrop(false);

        if(response.success){
            dispatch(eventsSetData.updateEvent(response.events.$values[0]));
            setSnackbarUpdate({open:true, success: true, message: response.message});
        }else{
            setSnackbarUpdate({open: true, success: false, message: response.message});
        }

        return response;
    }

    const handleEventDelete = async (event: EventType) => {
        
        setShowBackDrop(true);
        const response = await api.delete<Promise<EventResponseViewModel>>("Agenda/delete", {
            headers: { Authorization: userData.token },
            params: { eventId: event.eventId }
        }).then(r => r.data);
        setShowBackDrop(false);

        if (response.success) {
            dispatch(eventsSetData.removeEventById(event.eventId ?? 0));
            dispatch(eventsSetData.filterByDate(event.start))
            setSnackbarUpdate({success: true, open: true, message:response.message});
        } else {
            setSnackbarUpdate({open: true, message: response.message, success: false});
        }
        
    };

    return (
        <>
            <div className='content'>
                <div className='elemento-center'>
                    <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                        <StaticDatePicker 
                            orientation="portrait"
                            value={value}
                            onChange={handleDateChange}                        
                            slots={{
                            day: (dayProps) => <CustomPickersDay {...dayProps} selectedDays={eventsGetData.allEvents} />,              
                            }}
                    />   </LocalizationProvider>
                </div>
            </div>
            
            <DayEvents 
                eventsToShow={eventsGetData.eventsInSpecificDay}
                onEdit={openModalEditEvent}
                onDelete = {openModalDeleteEvent}    
                onCreate={openModalCreateEvent}         
            />
            
            
            <Backdrop            
                open={showBackDrop}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <MySnackbar
                snackBarUpdate={snackbarUpdate}
                handleClose={() => setSnackbarUpdate({...snackbarUpdate, open: false})}
            />

            <ModalCreateEdit 
                open={showModalCreateEdit}
                event={selectedEvent}
                handleClose={() => setShowModalCreateEdit({...showModalCreateEdit, open:false, create: false})}
                handleEventSubmit={showModalCreateEdit.create ? handleEventSubmit: handleEventEdit}
            />

            <ModalDelete
                open = {showModalDeleteEvent && eventToDelete !== null}
                handleClose={() => setShowModalDeleteEvent(false)}
                event={eventToDelete}
                handleDeleteEvent={handleEventDelete}
            />             
                  
        </>
    );
}

export default Calendar;