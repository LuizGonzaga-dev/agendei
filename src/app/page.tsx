"use client"

import * as React from 'react';
import Calendar from '@/components/Calendar';

import {Provider} from 'react-redux';
import { store } from '@/redux/store';

export default function Home() {
  return (
    <React.StrictMode>
      <Provider store={store}>
      <div id='calendar-container' className='text-moderate-white container bg-intense-gray flex-col'>
        <Calendar/>
      </div>
      </Provider>
    </React.StrictMode>
    
  );
}
