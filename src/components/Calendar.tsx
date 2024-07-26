import React, {useState} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Badge } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import CustomPickersDay from './CustomPickerDay';
import ModalDialog from './Dialog';



const Calendar = () => {

    const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [open, setOpen] = useState(false);
    const [initialDate, setInitialDate] = useState(dayjs());

    const notifications = {
        '2024-07-25': 5,
        '2024-07-26': 2,
    };

    // esse so marca a bolinha
    // const handleDateChange = (date: Dayjs | null) => {
    //     debugger
    //     if (date) {
    //     setSelectedDates(prev => {
    //         const isSelected = prev.some(selectedDate => date.isSame(selectedDate, 'day'));
    //         if (isSelected) {
    //         return prev.filter(selectedDate => !date.isSame(selectedDate, 'day'));
    //         } else {
    //         return [...prev, date];
    //         }
    //     });
    //     }
    // };

    const handleDateChange = (date: Dayjs | null) => {
        debugger
        setValue(date);
        if (date) {
        
            setOpen(true);
        }
    };

    const handleEventSubmit = async (event: { start: Dayjs, end: Dayjs, title: string, description: string }) => {
        // // Enviar o novo evento ao backend
        // const response = await api.post("/Agenda/create", event, {
        //   headers: { Authorization: `${process.env.JWT_TOKEN}` }
        // });
    
        // if (response.data.success) {
        //   // Adicionar evento à lista de eventos
        //   setSelectedDates([...selectedDates, dayjs(event.start)]);
        // }
    };

    return (
        <>

            {/* <ModalDialog
                open={open}
                handleClose={() => setOpen(false)}
                handleEventSubmit={handleEventSubmit}
                initialDate={initialDate}
            /> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker 
                    orientation="portrait"
                    value={dayjs()}
                    onChange={handleDateChange}
                    
                    slots={{
                    day: (dayProps) => <CustomPickersDay {...dayProps} selectedDays={selectedDates} notifications={notifications} />,
                    }}
                />            

                <ModalDialog
                    open={open}
                    handleClose={() => setOpen(false)}
                    handleEventSubmit={handleEventSubmit}
                    initialDate={initialDate}
                />
            </LocalizationProvider>

        </>
    );
}

export default Calendar;