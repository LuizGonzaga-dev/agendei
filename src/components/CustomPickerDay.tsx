import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Dayjs } from 'dayjs';

interface CustomPickersDayProps extends PickersDayProps<Dayjs> {
  selectedDays: Dayjs[];
  notifications: Record<string, number>;
}

const CustomPickersDay = (props: CustomPickersDayProps) => {
  const { day, selectedDays, notifications, ...other } = props;
  const isSelected = selectedDays.some(selectedDay => day.isSame(selectedDay, 'day'));
  const notificationCount = notifications[day.format('YYYY-MM-DD')] || 0;

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