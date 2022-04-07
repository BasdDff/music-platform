import React, {useEffect} from 'react';
import {Grid, IconButton} from "@mui/material";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import styles from "./Player.module.scss"
import TrackProgress from "../UI/TrackProgress";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {pauseTrack, playTrack, setCurrentTime, setDuration, setVolume} from "../../redux/actions-creators/player";
import {SERVER_ADDRESS} from "../../env";

let audio

const Player = () => {
    const dispatch = useAppDispatch()
    const track = {
        artist: "Artist 1",
        audio: "audio/a571650f-d631-4b23-8edc-3473154ff0a3.mp3",
        listens: 11,
        name: "Track 1",
        picture: "image/5b46a3d5-920c-4e9d-aec5-f6cc2c5d712b.png",
        text: "Text track track Text",
        _id: "6249ab52cf5851614e271004"
    }

    const {pause, volume, active, duration, currentTime} = useAppSelector(state => state.playerReducer)

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            if (active) {
                audio.src = SERVER_ADDRESS.concat(active.audio)
                audio.volume = volume / 100
                audio.onloadedmetadata = () => {
                    dispatch(setDuration(Math.ceil(audio.duration)))
                }
                audio.ontimeupdate = () => {
                    dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
                }
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAa")
                // if (!pause) {
                //     dispatch(playTrack())
                //     audio.play()
                // }
                // if (pause) {
                //     dispatch(pauseTrack())
                //     audio.pause()
                // }
            }
        }
    }, [active])

    useEffect(() => {
        if (pause) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [active, pause])

    const play = () => {
        if (pause) {
            dispatch(playTrack())
        } else {
            dispatch(pauseTrack())
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setVolume(Number(e.target.value)))
        audio.volume = Number(e.target.value) / 100
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentTime(Number(e.target.value)))
        audio.currentTime = Number(e.target.value)
    }

    if (!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause ?
                    <PlayArrow/>
                    :
                    <Pause/>
                }
            </IconButton>
            <Grid container direction="column" className={styles.track__names} style={{width: "10%"}}>
                <div className={styles.track__name} style={{marginBottom: "10px"}}>{active?.name}</div>
                <div className={styles.track__artist}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: "auto"}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default Player;