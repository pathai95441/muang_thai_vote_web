import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export enum SeverityEnum {
    error = "error",
    warning = "warning",
    info = "info",
    success = "success"
  }

interface ISnackBarProps {
    severity?: SeverityEnum
    isOpen: boolean
    message?: string
}

export default function CustomizedSnackBars({ severity, isOpen, message }: ISnackBarProps) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpen} >
        {isOpen ? (
            <Alert severity={severity} sx={{ width: '100%' }}>
              {message}
            </Alert>
        ): <div></div>}
      </Snackbar>
    </Stack>
  );
}