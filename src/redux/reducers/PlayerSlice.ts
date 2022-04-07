import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITrack} from "../../types/ITrack";

interface PlayerState {
    active: null | ITrack
    volume: number
    duration: number
    currentTime: number
    pause: boolean
}

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 10,
    pause: true
}

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        play(state) {
            state.pause = false
        },
        pause(state) {
            state.pause = true
        },
        active(state, action: PayloadAction<ITrack>) {
            state.active = action.payload
            state.duration = 0
            state.currentTime = 0
        },
        duration(state, action: PayloadAction<number>) {
            state.duration = action.payload
        },
        currentTime(state, action: PayloadAction<number>) {
            state.currentTime = action.payload
        },
        volume(state, action: PayloadAction<number>) {
            state.volume = action.payload
        }
    }
})

export default playerSlice.reducer