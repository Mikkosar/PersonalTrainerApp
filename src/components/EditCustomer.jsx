import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer({ data, updateCustomer }) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""

    })
    

    const handleClickOpen = () => {
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const hanldeSave = () => {
        updateCustomer(data._links.customer.href, customer);
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
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
                    value={customer.firstname}
                    onChange={e => setCustomer({...customer, firstname: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Lastname"
                    value={customer.lastname}
                    onChange={e => setCustomer({...customer, lastname: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Street Address"
                    value={customer.streetaddress}
                    onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Postcode"
                    value={customer.postcode}
                    onChange={e => setCustomer({...customer, postcode: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="City"
                    value={customer.city}
                    onChange={e => setCustomer({...customer, city: e.target.value})}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Email Address"
                    value={customer.email}
                    onChange={e => setCustomer({...customer, email: e.target.value})}
                    fullWidth
                    variant="standard"
                />           
                <TextField
                    required
                    margin="dense"
                    label="Phone number"
                    value={customer.phone}
                    onChange={e => setCustomer({...customer, phone: e.target.value})}
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