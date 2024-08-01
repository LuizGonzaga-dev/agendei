
"use client"
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthResponse } from '@/types/AuthResponse';
import { TextField } from '@mui/material';
import ButtonEnviar from '@/components/buttons/ButtonEnviar';
import { api } from '@/api/Api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import MySnackbar from '@/components/Snackbar';
import { useDispatch } from 'react-redux';
import * as userSetData from '@/redux/reducers/useReducer';
import * as eventsSetData from '@/redux/reducers/eventsReducer';
import * as useShowLoading from '@/redux/reducers/useLoading';
import SingUp from '../signUp/page';
import { useRouter } from 'next/navigation';
import { MapEventsFromApi } from '@/helpers/EventsHelper';

const passwordSchema = z.string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
  .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial');

const loginFormSchema = z.object({
    email: z.string().email({message: 'Email inválido'}),
    password: passwordSchema
});

type UserLoginType = z.infer<typeof loginFormSchema>;


const  SingIn = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showSnackbar, setShowSnackbar] = useState({message: '', success: false, open: false});

    const { handleSubmit, control,  formState: {errors, isSubmitting, isSubmitSuccessful} } = useForm<UserLoginType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {email: '', password: ''}
    });

    const handleCreateUser = async (data : UserLoginType): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/Authenticate/login", data);
        return response.data;
    }

    const onSubmit : SubmitHandler<UserLoginType> = async (data) => {
        try{
            dispatch(useShowLoading.showLoadingBackDrop());
            const result = await handleCreateUser(data);    
            // debugger
            if(result.success){
                // debugger
                //set token info
                dispatch(userSetData.setToken(result.tokenInfo?.token));
                dispatch(userSetData.setValidTo(result.tokenInfo?.validTo));

                //set events info
                const mappedEvents = MapEventsFromApi(result.events);
                dispatch(eventsSetData.setAllEvents(mappedEvents));
                router.push('/calendar')
            }else{       
                dispatch(useShowLoading.hideLoadingBackDrop());
                setShowSnackbar({success:false, open:true, message: result.message})  
            }
        }catch(error){
            // debugger
            dispatch(useShowLoading.hideLoadingBackDrop());
            setShowSnackbar({success:false, open:true, message:'Ocorreu um erro desconhecido!'})
        }
    };

    return (
        <div className='content flex items-center px-lg'>
           <div className='elemento-center img-form-container'>
               <h1 className='text-intense-blue text-lg font-mono'>Salve seus compromissos</h1>
                <img 
                    src="/schedulle-image.svg"
                    className='image-login bg-moderate-gray'
                />
                <h2 className='text-intense-blue font-mono'>Login</h2>
                <form className='bg-moderate-gray font-mono' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='email'
                        control={control}
                        render={({field}) => 
                            <TextField   
                                {...field}  
                                label="Email"    
                                type='email'
                                sx={{fontFamily:'inherit'}}                            
                                error={!!errors.email}
                                variant="standard"
                                helperText={errors.email ? errors.email.message : ''} 
                                fullWidth                   
                            />
                        }
                    />   
                    <Controller
                        name='password'
                        control={control}
                        render={({field}) => 
                            <TextField   
                                {...field}  
                                label="Senha"    
                                type='password'                            
                                error={!!errors.password}
                                variant="standard"
                                helperText={errors.password ? errors.password.message : ''} 
                                fullWidth                   
                            />
                        }
                    />   
                    <span className='flex justify-between'>
                        <div onClick={() => router.push('/signUp')} className='text-intense-blue text-md pt-6 cursor-pointer'>cadastre-se</div>
                        <ButtonEnviar isSubmitting={isSubmitting}/>
                    </span>
                </form>
                <MySnackbar
                    handleClose={() => setShowSnackbar({...showSnackbar, open:false})}
                    snackBarUpdate={showSnackbar}
                />
           </div>
        </div>
    );
}

export default SingIn;