import React, {useEffect} from 'react';
import MainLayout from "../layouts/MainLayout/MainLayout";
import {useAppSelector} from "../hooks/useAppSelector";
import {useActions, useAppDispatch} from "../hooks/useAppDispatch";
import {getAuth} from "../redux/actions-creators/auth";

const Index = () => {

    // const {getAuth} = useActions()
    //
    // useEffect(() => {
    //     getAuth()
    // }, [])

    const {isInitialized} = useAppSelector(state => state.authReducer)


    // useEffect(() => {
    //
    // }, [isInitialized])

    return (
        <MainLayout>
            Главная страница
        </MainLayout>
    );
};

export default Index;

// export async function getServerSideProps({store}) {
//     await store.dispatch(await getAuth())
// }

