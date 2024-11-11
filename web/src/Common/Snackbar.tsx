import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface propsData {
    data: string;
    open: boolean
}
export default function SnackBar({ data, open }: propsData) {


    return (
        <div>
            <Snackbar open={open} autoHideDuration={2000} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {data}
                </Alert>
            </Snackbar>
        </div>
    );
}
