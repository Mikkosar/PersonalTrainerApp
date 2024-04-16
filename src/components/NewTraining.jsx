import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";

export default function NewTraining({ url, saveTraining }) {
    const [open, setOpen] = useState(false);
    const [newTraining, setNewTraining] = useState({
        customer: url
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const hanldeSave = () => {
        saveTraining(newTraining);
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                New Training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle>Add New Training</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker 
                            label="Set Date And Time"
                            onChange={(date) => {
                                const isoDate = date.toISOString();
                                setNewTraining({...newTraining, date: dayjs(isoDate)});
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <TextField
                    required
                    margin="dense"
                    label="Activity"
                    onChange={e => setNewTraining({...newTraining, activity: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Duration"
                    onChange={e => setNewTraining({...newTraining, duration: e.target.value})}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={hanldeSave}>Save</Button>
            </DialogActions>
            </Dialog>
        </>
    );
}