import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EventType} from '@/types/EventType'
import {filterEventsByDay} from '@/helpers/Filters';

interface EventsState{
    allEvents: EventType[],
    eventsInSpecificDay: EventType[],
    selectedDay: Date | null,
}

const initialState: EventsState = {
    allEvents:[],
    eventsInSpecificDay:[],
    selectedDay: null
}

const slice = createSlice({
    name: 'events',
    initialState,
    reducers:{
        //allEvents actions
        setAllEvents:(state, action) => {
            state.allEvents = action.payload;
        },
        insertIntoAllEvents: (state, action: PayloadAction<EventType>) => {
            state.allEvents.push(action.payload);
        },
        //eventsInSpecificDay actions
        setEventsInSpecificDay: ( state ) => {
            if(state.selectedDay){
                state.eventsInSpecificDay = filterEventsByDay({
                    allEvents: state.allEvents, 
                    day: state.selectedDay
                });
            }
        },        
        //selectedDay actions
        setSelectedDay: (state, action) => {
            state.selectedDay = action.payload;
        },
        //allEvents and eventsInSpecificDay actions
        removeEventById: (state, action: PayloadAction<number>) => {
            state.allEvents = state.allEvents.filter(e => e.eventId !== action.payload);
            state.eventsInSpecificDay = state.allEvents.filter(e => e.eventId !== action.payload);
        },
        updateEvent: (state, action: PayloadAction<EventType>) => {
            debugger
            let index = state.allEvents.findIndex(e => e.eventId == action.payload.eventId);
            if(index !== -1){
                state.allEvents[index] = action.payload;
            }

            index = state.eventsInSpecificDay.findIndex(e => e.eventId === action.payload.eventId);
            if(index !== -1){
                state.eventsInSpecificDay[index] = action.payload;
            }
        }
    }
})

export const {
    insertIntoAllEvents, removeEventById, setAllEvents, setEventsInSpecificDay, setSelectedDay, updateEvent
} = slice.actions;

export default slice.reducer;