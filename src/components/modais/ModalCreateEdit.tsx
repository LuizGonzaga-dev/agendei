import React, {useEffect} from  'react'
import { Dialog, DialogContent, DialogTitle, Divider, Box} from '@mui/material';
import { EventType } from '@/types/EventType';
import { useForm, SubmitHandler, Controller} from "react-hook-form";
import { z } from 'zod';
import { TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonEnviar from '../buttons/ButtonEnviar';
import DynamicAlert from '../Alert';
import {EventResponseViewModel} from '@/Interfaces/ResponseAgendaController';
import dayjs from 'dayjs';

type props = {
    event: EventType | undefined;
    open: {open: boolean, success: boolean, message: string, create: boolean};
    handleClose: () => void;
    handleEventSubmit: (event: EventType) => Promise<EventResponseViewModel>;
}

const eventTypeFormSchema = z.object({
    title: z.string().min(1, "Mínimo 1 caracteres").max(10, "Máximo 10 caracteres"),
    description: z.string().max(25, "Máximo 25 caracteres").optional(),
    start: z.date({required_error:"Obrigatório!"}),
    end: z.date({required_error: "Obrigatório!"}),
    eventId: z.number().optional()
});

const ModalCreateEdit = (params: props) => {

    const {open, handleClose, handleEventSubmit} = params;
    let {event} = params;

    if (open.create) {
        event = {
            title: '',
            description: '',
            start: dayjs().toDate(),
            end: dayjs().add(1, 'hour').toDate(),
        };
    }else{
    }

    const {
        handleSubmit, 
        control,
        formState: {errors, isSubmitting, isSubmitSuccessful},
        reset
    } = useForm<EventType>({
        resolver: zodResolver(eventTypeFormSchema),
        defaultValues: event 
    });

    const onSubmit: SubmitHandler<EventType> = async (data) => {
        const result = await handleEventSubmit(data);    
        if(result.success){
        }else{
            debugger
        }
        handleClose();
    };

    useEffect(() => {
        if (event) {
            reset({
                title: event.title,
                description: event.description,
                start:event.start,
                end: event.end,
                eventId: event.eventId
            });
        }
    }, [open, reset]);

    return (
        <Dialog 
            open={open.open}
            onClose={handleClose}
        >
            <DialogTitle className='font-bold bg-moderate-gray text-moderate-white'>
                {open.create ? "Criar " : "Editar "}evento!
            </DialogTitle>
            <Divider className='bg-intense-blue' variant='fullWidth'/>
            <DialogContent className='bg-moderate-gray'>
                <form onSubmit={handleSubmit(onSubmit)} className='gap-2'>
                    <Controller
                        name='title'
                        control={control}
                        render={({field}) => 
                            <TextField   
                                {...field}  
                                label="Título"                                
                                error={!!errors.title}
                                variant="standard"
                                helperText={errors.title ? errors.title.message : ''} 
                                fullWidth                   
                            />
                        }
                    />   
                    <Controller
                        name='description'
                        control={control}
                        render={({field}) => 
                            <TextField   
                                {...field}  
                                label="descrição"
                                error={!!errors.description}
                                variant="standard"
                                helperText={errors.description ? errors.description.message : ''} 
                                fullWidth                   
                            />
                        }
                    />  
                    <span className='flex flex-row gap-2 my-5'>
                        <Controller
                            name='start'
                            control={control}
                            render={({field}) => 
                                <TextField
                                    {...field}
                                    label="inicio"
                                    type="datetime-local"
                                    fullWidth
                                    margin="normal"
                                    value={field.value ? dayjs(field.value).format('YYYY-MM-DDTHH:mm') : dayjs().format('YYYY-MM-DDTHH:mm')}
                                    onChange={(e) => field.onChange(dayjs(e.target.value).toDate())}
                                    InputLabelProps={{ shrink: true }}
                                />
                            }
                        />  
                        <Controller
                            name='end'
                            control={control}
                            render={({field}) => 
                                <TextField
                                    {...field}
                                    label="Fim"
                                    type="datetime-local"
                                    fullWidth
                                    margin="normal"
                                    value={field.value ? dayjs(field.value).format('YYYY-MM-DDTHH:mm') : dayjs().add(1,'hour').format('YYYY-MM-DDTHH:mm')}
                                    onChange={(e) => field.onChange(dayjs(e.target.value).toDate())}
                                    InputLabelProps={{ shrink: true }}
                                />
                            }
                        />  
                    </span>  
                    <span className='hidden'>
                        <Controller
                            name='eventId'
                            control={control}
                            render={({field}) => 
                                <TextField   
                                    {...field}  
                                    label="eventId"
                                    error={!!errors.eventId}
                                    variant="standard"
                                    helperText={errors.eventId ? errors.eventId.message : ''} 
                                    fullWidth                  
                                />
                            }
                        /> 
                    </span>
                    
                    <DynamicAlert 
                        show={open.open && open.message !== ''}
                        success={open?.success ?? false}
                        message={open?.message ?? ""}
                    />

                    <ButtonEnviar isSubmitting={isSubmitting}/>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ModalCreateEdit;