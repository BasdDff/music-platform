import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {trackAPI} from "./services/TrackService";
import playerReducer from "./reducers/PlayerSlice"
import authReducer from "./reducers/AuthSlice"

const rootReducer = combineReducers({
    playerReducer,
    authReducer,
    [trackAPI.reducerPath]: trackAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(trackAPI.middleware)
    })
}

const store = setupStore()

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]