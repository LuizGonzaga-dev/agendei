"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, Box } from '@mui/material';
import { Dayjs } from 'dayjs';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddEventDialogProps {
  open: boolean;
  handleClose: () => void;
  handleEventSubmit: (event: { start: Dayjs, end: Dayjs, title: string, description: string }) => void;
  initialDate: Dayjs;
}

const ModalDialog: React.FC<AddEventDialogProps> = ({ open, handleClose, handleEventSubmit, initialDate }) => {
  const [newEvent, setNewEvent] = React.useState({
    start: initialDate,
    end: initialDate,
    title: '',
    description: ''
  });

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    debugger;
    handleEventSubmit(newEvent);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Adicionar Evento"}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Título"
            name="title"
            fullWidth
            margin="normal"
            value={newEvent.title}
            onChange={handleEventChange}
          />
          <TextField
            label="Descrição"
            name="description"
            fullWidth
            margin="normal"
            value={newEvent.description}
            onChange={handleEventChange}
          />
          <TextField
            label="Início"
            type="datetime-local"
            name="start"
            fullWidth
            margin="normal"
            value={newEvent.start}
            onChange={handleEventChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fim"
            type="datetime-local"
            name="end"
            fullWidth
            margin="normal"
            value={newEvent.end}
            onChange={handleEventChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Adicionar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;