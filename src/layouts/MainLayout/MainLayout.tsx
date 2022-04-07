import { Container } from '@mui/material';
import React, {FC} from 'react';
import Navbar from "../../components/Navbar";
import styles from "../MainLayout/MainLayout.module.scss"
import Player from "../../components/Player/Player";

const MainLayout: FC = ({children}) => {
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