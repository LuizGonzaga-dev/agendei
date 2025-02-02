"use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type IconButtonDeleteProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function IconButtonDelete({onClick}: IconButtonDeleteProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton aria-label="delete" size="small" onClick={onClick}>
        <DeleteIcon sx={{color:'#1565c0'}} fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}
