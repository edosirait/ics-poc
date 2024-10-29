import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, DialogContentText, Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


interface SuccessDialogProps {
    open: boolean;
    onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box display="flex" flexDirection="column" alignItems="center" padding="2rem">
                <CheckCircleIcon color="success" sx={{ fontSize: 50, marginBottom: 1 }} />
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText textAlign="center">Data has been successfully updated!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default SuccessDialog;
