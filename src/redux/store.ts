import {configureStore} from '@reduxjs/toolkit';
import useReducer from './reducers/useReducer';
import eventsReducer from './reducers/eventsReducer';


export const store = configureStore({
    reducer:{
        user: useReducer,
        events: eventsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;