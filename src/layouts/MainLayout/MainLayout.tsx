import { Container } from '@mui/material';
import React, {FC, useEffect} from 'react';
import Navbar from "../../components/Navbar";
import styles from "../MainLayout/MainLayout.module.scss"
import Player from "../../components/Player/Player";
import {useActions} from "../../hooks/useAppDispatch";

const MainLayout: FC = ({children}) => {

    const {getAuth} = useActions()

    useEffect(() => {
        getAuth()
    }, [])

    return (
        <div>
            <Navbar/>
            <Container className={styles.container}>
                {children}
            </Container>
            <Player/>
        </div>
    );
};

export default MainLayout;