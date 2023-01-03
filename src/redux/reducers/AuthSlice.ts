import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";

interface AuthState {
    isInitialized: boolean
    isAuth: boolean
    user: IUser
}

const initialState: AuthState = {
    isInitialized: false,
    isAuth: false,
    user: {
        username: "",
        roles: [],
        email: "",
        _id: "",
        ban: false,
        img: ""
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
    }
})

export default authSlice.reducer
