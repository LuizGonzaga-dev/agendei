"use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

type IconButtonEditProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function IconButtonEdit({onClick} :IconButtonEditProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton aria-label="edit" size="small" onClick={onClick}>
            <EditIcon sx={{color:'#1565c0'}} fontSize="inherit" />
        </IconButton>
    </Stack>    
  );
}
