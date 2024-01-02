import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IModalProps } from './interface';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DeleteModal({ isOpen, disagree, agree }: IModalProps) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={disagree}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Candidate"}</DialogTitle>
        <DialogContent >
            <img src='/trash_icon.svg' />
            <DialogContentText id="alert-dialog-slide-description" style={{ marginTop: "12px"}}>
                Do you want to delete Candidate?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagree}>Disagree</Button>
          <Button onClick={agree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}