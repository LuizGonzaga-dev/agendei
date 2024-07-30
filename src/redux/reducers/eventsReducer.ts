import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EventType} from '@/types/EventType'
import dayjs from 'dayjs';

interface EventsState{
    allEvents: EventType[],
    eventsInSpecificDay: EventType[]
}

const initialState: EventsState = {
    allEvents:[],
    eventsInSpecificDay:[]
}

const slice = createSlice({
    name: 'newEvents',
    initialState,
    reducers:{
        //allEvents actions
        setAllEvents:(state, action) => {
            state.allEvents = action.payload;
        },
        insertIntoAllEvents: (state, action: PayloadAction<EventType>) => {
            state.allEvents.push(action.payload);
        },  
        //allEvents and eventsInSpecificDay actions
        removeEventById: (state, action: PayloadAction<number>) => {
            state.allEvents = state.allEvents.filter(e => e.eventId !== action.payload);
            state.eventsInSpecificDay = state.allEvents.filter(e => e.eventId !== action.payload);
        },
        updateEvent: (state, action: PayloadAction<EventType>) => {            
            let index = state.allEvents.findIndex(e => e.eventId == action.payload.eventId);
            if(index !== -1){
                state.allEvents[index] = action.payload;
            }

            index = state.eventsInSpecificDay.findIndex(e => e.eventId === action.payload.eventId);
            if(index !== -1){
                state.eventsInSpecificDay[index] = action.payload;
            }
        },
        filterByDate: (state, action: PayloadAction<Date>) => {
            const djs = dayjs(action.payload);
            state.eventsInSpecificDay = state.allEvents.filter(e => djs.isSame(dayjs(e.start), 'day'));
        },
    }
})

export const {
    insertIntoAllEvents, removeEventById, setAllEvents, updateEvent, filterByDate
} = slice.actions;

export default slice.reducer;