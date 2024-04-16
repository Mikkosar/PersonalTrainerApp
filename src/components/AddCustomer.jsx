import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer({ addCustomer }) {
    const [open, setOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""

    })
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const hanldeSave = () => {
        addCustomer(newCustomer);
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    label="Firstname"
                    onChange={e => setNewCustomer({...newCustomer, firstname: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Lastname"
                    onChange={e => setNewCustomer({...newCustomer, lastname: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Street Address"
                    onChange={e => setNewCustomer({...newCustomer, streetaddress: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Postcode"
                    onChange={e => setNewCustomer({...newCustomer, postcode: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="City"
                    onChange={e => setNewCustomer({...newCustomer, city: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Email Address"
                    onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                    fullWidth
                    variant="standard"
                />           
                <TextField
                    required
                    margin="dense"
                    label="Phone number"
                    onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})}
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