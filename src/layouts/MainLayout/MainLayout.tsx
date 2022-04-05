import { Container } from '@mui/material';
import React, {FC} from 'react';
import Navbar from "../../components/Navbar";
import styles from "../MainLayout/MainLayout.module.scss"

const MainLayout: FC = ({children}) => {
    return (
        <div>
            <Navbar/>
            <Container className={styles.container}>
                {children}
            </Container>
        </div>
    );
};

export default MainLayout;