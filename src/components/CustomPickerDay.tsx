import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Badge } from '@mui/material';
import { Dayjs } from 'dayjs';
import { EventType } from '@/types/EventType';

interface CustomPickersDayProps extends PickersDayProps<Dayjs> {
  selectedDays: EventType[];
}

const CustomPickersDay = (props: CustomPickersDayProps) => {
  
  const { day, selectedDays, ...other } = props;
  const isSelected = selectedDays.some(selectedDay => day.isSame(selectedDay.start, 'day'));
  const notificationCount = selectedDays.filter(selectedDay => day.isSame(selectedDay.start, 'day')).length;

  return (
    <Badge badgeContent={notificationCount} color="secondary">
      <PickersDay
        {...other}
        day={day}
        selected={isSelected}
        sx={{
          backgroundColor: isSelected ? '#90caf9' : undefined,
          color: isSelected ? '#1565c0' : undefined,
          borderRadius: isSelected ? '40%' : undefined,
        }}
      />
    </Badge>
  );
};

export default CustomPickersDay;