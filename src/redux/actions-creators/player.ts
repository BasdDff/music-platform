import {AppDispatch} from "../index";
import { playerSlice } from "../reducers/PlayerSlice";


export const playTrack = () => async (dispatch:AppDispatch) => {
    try {
        dispatch(playerSlice.actions.play())
    } catch (err) {

    }
}

export const pauseTrack = () => async (dispatch:AppDispatch) => {
    try {
        dispatch(playerSlice.actions.pause())
    } catch (err) {

    }
}

export const setVolume = (payload: number) => async (dispatch:AppDispatch) => {
    try {
        dispatch(playerSlice.actions.volume(payload))
    } catch (err) {

    }
}

export const setCurrentTime = (payload: number) => async (dispatch:AppDispatch) => {
    try {
        dispatch(playerSlice.actions.currentTime(payload))
    } catch (err) {

    }
}

export const setDuration = (payload: number) => async (dispatch:AppDispatch) => {
    try {
        dispatch(playerSlice.actions.duration(payload))
    } catch (err) {

    }
}

export const setActiveTrack = (track) => async (dispatch:AppDispatch) => {
    try {
        dispatch(playerSlice.actions.active(track))
    } catch (err) {

    }
}

