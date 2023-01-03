import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {useActions} from "../hooks/useAppDispatch";
import {useState} from "react";
import {Button, TextField} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalLogin({type = "primary", children}: { type?: string, children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [email, setEmail] = useState<string>("test@gmail.com")
    const [password, setPassword] = useState<string>("16041604")

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    console.log(email, password)

    const {login} = useActions()

    const signIn = () => {
        login({email, password})
    }

    return (
        <div>
            {type === "primary" ?
                <div onClick={handleOpen}> {children} </div>
                :
                <div onClick={handleOpen}> {children} </div>
            }
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}  style={{display: "flex"}}>
                    <TextField placeholder="email" onChange={changeEmail} value={email}/>
                    <TextField placeholder="password" onChange={changePassword} value={password}/>
                    <Button onClick={signIn}>
                        SignIn
                    </Button>
                    {/*{genres.map((genre) =>*/}
                    {/*    <div style={{marginRight: "20px"}}>*/}
                    {/*        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">*/}
                    {/*            <Link to={`/products/${genre.nameEng}`} onClick={handleClose}>*/}
                    {/*                {genre.name}*/}
                    {/*            </Link>*/}
                    {/*        </Typography>*/}
                    {/*        {genre.genreNames.map((name) =>*/}
                    {/*            <Typography id="keep-mounted-modal-description" sx={{mt: 2}}>*/}
                    {/*                <Link to={`/products/${name.nameForUrl}`} onClick={handleClose}>*/}
                    {/*                    {name.name}*/}
                    {/*                </Link>*/}
                    {/*            </Typography>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </Box>
            </Modal>
        </div>
    );
}