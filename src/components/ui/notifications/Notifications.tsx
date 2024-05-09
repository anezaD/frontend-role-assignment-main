import Snackbar from '@mui/material/Snackbar';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

export default function Notifications({name,id,team}: {name:string,id:number,team:string } ) {

    const isMobile = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(false);
    const [color,setColor] = useState<string>('teal');
     
    useEffect(() => {
            setOpen(true);
            team === "blue" ? setColor('red') : setColor( "blue");
    }, [id]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            ContentProps={{
                style: {
                    backgroundColor: color,
                     opacity: 0.8,
                },
            }}
            autoHideDuration={3000}
            onClose={handleClose}
            message={`${name} you lost!`}
            anchorOrigin={{
                vertical: isMobile ? 'top' : 'bottom', 
                horizontal: isMobile ? 'center' : 'right',  
            }}
        />
    );
}
