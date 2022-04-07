import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {trackAPI} from "./services/TrackService";
import playerReducer from "./reducers/PlayerSlice"

const rootReducer = combineReducers({
    playerReducer,
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