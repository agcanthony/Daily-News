
import Button from '@mui/material/Button';
import SendIcon from 'mdi-material-ui/Send';
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export default function BusyButton(props){
    
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        setBusy(props.busy);
    }, [props.busy]);

    return(
        <Button type={props.type} size='large'
        variant='contained'
        sx={{ marginBottom: 7 }} 
        disabled={busy} 
        endIcon={<SendIcon />}>
            {busy ? <Spinner animation="border" size="sm"/> : null}
            &nbsp;
            {props.label}
        </Button>
    )
}