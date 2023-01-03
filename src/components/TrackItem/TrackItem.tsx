import React, {FC} from 'react';
import {ITrack} from '../../types/ITrack';
import {Avatar, Card, Grid, IconButton} from "@mui/material";
import styles from "./TrackItem.module.scss"
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {SERVER_ADDRESS} from "../../env";
import {useRouter} from "next/router";
import {pauseTrack, playTrack, setActiveTrack} from "../../redux/actions-creators/player";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {trackAPI} from "../../redux/services/TrackService";

interface TrackItemProps {
    track: ITrack
}

const TrackItem: FC<TrackItemProps> = ({track}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {pause, active} = useAppSelector(state => state.playerReducer)

    const [deleteTrack] = trackAPI.useDeleteTrackMutation()

    const playTrackItem = () => {
        if (track._id === active?._id) {
            if (pause) {
                dispatch(playTrack())
            } else {
                dispatch(pauseTrack())
            }
        } else {
            dispatch(setActiveTrack(track))
            dispatch(playTrack())
        }
    }

    return (
        <Card className={styles.track}>
            <IconButton onClick={playTrackItem}>
                {pause ?
                    <PlayArrow/>
                    :
                    track._id === active?._id ?
                        <Pause/>
                        :
                        <PlayArrow/>
                }
            </IconButton>
            <Avatar
                src={SERVER_ADDRESS.concat(track.picture)}
                sx={{width: 70, height: 70}}
            />
            <Grid container direction="column" className={styles.track__names}>
                <div className={styles.track__name}
                     onClick={() => router.push(`/tracks/${track._id}`)}>{track.name}</div>
                <div className={styles.track__artist}>{track.artist}</div>
            </Grid>
            <div className={styles.track__duration}>
                {/*{active && <div> 02:42 / 03:22 </div>}*/}
                <IconButton onClick={() => deleteTrack(track)}>
                    <Delete/>
                </IconButton>
            </div>
        </Card>
    );
};

export default TrackItem;