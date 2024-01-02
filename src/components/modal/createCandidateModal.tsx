import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, TextareaAutosize } from '@mui/material';
import { ICandidateInfo, CreateCandidateDataAPI } from '@/apis/candidate';
import { AppContext } from '@/pages/_app';
import styles from './modal.module.css'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface ICreateCandidateDataModalProps {
    isOpen: boolean
    onClose: () => void
    refetch: () => void
}

let defaultValue = {
    candidateDescription: "",
    candidateID: "",
    candidateName: "",
    voteScore: 0,
}

export default function CreateCandidateDataModal({ isOpen, onClose, refetch }: ICreateCandidateDataModalProps) {
    const [validated, setValidated] = React.useState<boolean>(false)
    const [candidateData, setCandidateData] = React.useState<ICandidateInfo>(defaultValue)
    const { alertError, alertSuccess } = React.useContext(AppContext);

    const handleUpdateCandidateData = () => {
        setValidated(true)
        if(candidateData.candidateDescription && candidateData.candidateName ){
            CreateCandidateDataAPI(candidateData).then(() => {alertSuccess?.("Create Candidate Data Success");setCandidateData(defaultValue);refetch()}).catch((e: any) => alertError?.(JSON.stringify(e?.message), e?.response?.status))
        }
        onClose()
    }

    return (
        <React.Fragment>
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className={styles.edit_modal}>
                <TextField 
                    id="outlined-required"
                    label="UserName"
                    error={!candidateData?.candidateName && validated}
                    value={candidateData?.candidateName}
                    onChange={(e)=>{ setCandidateData({ ...candidateData, candidateName: e.target.value }) }}
                    style={{ width: "100%" }}
                />
                <h4 style={{ marginTop: "12px" }}> Description </h4>
                <TextareaAutosize 
                    required={!candidateData?.candidateDescription && validated}
                    value={candidateData?.candidateDescription}
                    maxLength={255}
                    onChange={(e)=>{ setCandidateData({ ...candidateData, candidateDescription: e.target.value }) }}
                    style={{ width: "300px", height: "250px", overflow: "auto" }}
                />
            </div>
            <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpdateCandidateData}>Create</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
  );
}