"use client"

import React, {useEffect} from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import { useRouter } from 'next/navigation';

export default function Home() {

  const loading = useAppSelector(l => l.loading);
  const useUserData = useAppSelector(u => u.user);
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
    <>
      <div id='calendar-container' className='text-moderate-white container bg-intense-gray flex-col'>
      </div> 
      
      <Backdrop            
        open={loading.show}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </>
  );
}
