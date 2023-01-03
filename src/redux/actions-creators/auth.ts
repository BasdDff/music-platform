import {AppDispatch} from "../index";
import {authApi} from "../../api/auth-api";
import {authSlice} from "../reducers/AuthSlice";

export const getAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await authApi.getAuth()
        dispatch(authSlice.actions.setIsInitialized(true))
        if (response.status === 200) {
            dispatch(authSlice.actions.setIsAuth(true))
            dispatch(authSlice.actions.setUser(response.data))
        }
    } catch (err) {

    }
}

export const login = (user: {email: string, password: string}) => async (dispatch: AppDispatch) => {
    try {
        const response = await authApi.login(user)
        localStorage.setItem("token", response.data.accessToken)
        await dispatch(getAuth())
    } catch (err) {

    }
}