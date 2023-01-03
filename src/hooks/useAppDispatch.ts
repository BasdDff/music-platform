import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {allActionCreators} from "../redux/actions-creators";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(allActionCreators, dispatch)
}