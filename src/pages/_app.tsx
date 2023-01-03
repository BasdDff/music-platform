import "../styles/globals.css"
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from '../redux/index'
import React, {useEffect} from "react";
import {useActions} from "../hooks/useAppDispatch";
import $api from "../http";
import {ITrack} from "../types/ITrack";

export default function MyApp({ Component, pageProps }: AppProps) {

    // const {getAuth} = useActions()
    //
    // useEffect(() => {
    //     getAuth()
    // }, [])

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

// export async function getServerSideProps() {
//     const res = await $api.get<ITrack>(`/user`)
//     return {
//         props: {
//             serverTrack: res.data
//         }
//     }
// }