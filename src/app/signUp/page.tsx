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
    password: passwordSchema,
    name: z.string().min(4, 'Mínimo 4 caracteres').max(15, 'Máximo 15 caractes'),
    // phone: z.string().regex(/^\(\d{2}\) 9\d{8}$/, 'Número inválido').optional()
});

type UserLoginType = z.infer<typeof loginFormSchema>;


const  SingUp = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [showSnackbar, setShowSnackbar] = useState({message: '', success: false, open: false});

    const { handleSubmit, control,  formState: {errors, isSubmitting, isSubmitSuccessful} } = useForm<UserLoginType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {email: '', password: '', name: ''}
    });

    const handleCreateUser = async (data : UserLoginType): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/Authenticate/register", data);
        return response.data;
    }

    const onSubmit : SubmitHandler<UserLoginType> = async (data) => {
        try{
            dispatch(useShowLoading.showLoadingBackDrop());
            const result = await handleCreateUser(data);    
            // debugger
            if(result.success){
                // debugger
                //seta as informações do token
                dispatch(userSetData.setToken(result.tokenInfo?.token));
                dispatch(userSetData.setValidTo(result.tokenInfo?.validTo));
                //seta as informações dos eventos
                const mappedEvents = MapEventsFromApi(result.events);
                dispatch(eventsSetData.setAllEvents(mappedEvents));
                setShowSnackbar({success: true, open:true, message: result.message});
                router.push('/calendar');
            }else{       
                dispatch(useShowLoading.hideLoadingBackDrop());
                setShowSnackbar({success:false, open:true, message: result.message})  
            }
        }catch(error){
            dispatch(useShowLoading.hideLoadingBackDrop());
            setShowSnackbar({success:false, open:true, message:'Ocorreu um erro desconhecido!'})
        }
    };

    return (
        <div className='content flex items-center px-lg'>
           <div className='elemento-center img-form-container'>
               <h1 className='text-intense-blue text-lg font-mono'>Cadastro</h1>
                <form className='bg-moderate-gray font-mono' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='name'
                        control={control}
                        render={({field}) => 
                            <TextField   
                                {...field}  
                                label="Nome"                    
                                error={!!errors.name}
                                variant="standard"
                                helperText={errors.name ? errors.name.message : ''} 
                                fullWidth                   
                            />
                        }
                    />   
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
                    {/* <Controller
                        name='phone'
                        control={control}
                        render={({field}) => 
                            <TextField   
                                {...field}  
                                label="Telefone (opcional)"                    
                                error={!!errors.phone}
                                variant="standard"
                                helperText={errors.phone ? errors.phone.message : ''} 
                                fullWidth                   
                            />
                        }
                    />    */}
                    <span className='flex justify-between'>
                        <div onClick={() => router.back()} className='text-intense-blue text-md pt-6 cursor-pointer'>voltar</div>
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

export default SingUp;