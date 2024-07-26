import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Dayjs } from 'dayjs';
import { EventType } from '@/types/EventType';

interface CustomPickersDayProps extends PickersDayProps<Dayjs> {
  selectedDays: EventType[];
  //notifications: Record<string, number>;
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