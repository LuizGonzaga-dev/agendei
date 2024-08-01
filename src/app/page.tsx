"use client"

import React, {useEffect} from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { useRouter } from 'next/navigation';

export default function Home() {

  const isLoading = useAppSelector(l => l.loading);
  const useUserData = useAppSelector(u => u.user);
  // debugger
  const router = useRouter(); 
  
  const hasToken = useUserData.token !== '';
  
  useEffect(() => {
    if (hasToken) {
      router.push('/calendar');
    } else {
      router.push('/signIn');
    }
  }, [hasToken, router]);

  return (
        <div id='calendar-container' className='text-moderate-white container bg-intense-gray flex-col'>

          <Backdrop            
            open={isLoading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >

          <CircularProgress color="inherit" />
          
          </Backdrop>
        </div> 
  );
}
