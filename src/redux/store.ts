import {configureStore} from '@reduxjs/toolkit';
import useReducer from './reducers/useReducer';
import eventsReducer from './reducers/eventsReducer';
import loadingReducer from './reducers/useLoading';


export const store = configureStore({
    reducer:{
        user: useReducer,
        events: eventsReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;