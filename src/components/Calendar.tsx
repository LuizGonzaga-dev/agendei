import React, {useState} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Badge } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import CustomPickersDay from './CustomPickerDay';



const Calendar = () => {

    const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);

    const notifications = {
        '2024-07-25': 5,
        '2024-07-26': 2,
    };

    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
        setSelectedDates(prev => {
            const isSelected = prev.some(selectedDate => date.isSame(selectedDate, 'day'));
            if (isSelected) {
            return prev.filter(selectedDate => !date.isSame(selectedDate, 'day'));
            } else {
            return [...prev, date];
            }
        });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker 
                orientation="portrait"
                value={dayjs()}
                onChange={handleDateChange}
                slots={{
                  day: (dayProps) => <CustomPickersDay {...dayProps} selectedDays={selectedDates} notifications={notifications} />,
                }}
            />            
        </LocalizationProvider>
    );
}

export default Calendar;