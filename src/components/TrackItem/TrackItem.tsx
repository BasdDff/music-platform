import React, {FC} from 'react';
import {ITrack} from '../../types/ITrack';
import {Avatar, Card, Grid, IconButton} from "@mui/material";
import styles from "./TrackItem.module.scss"
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {SERVER_ADDRESS} from "../../env";
import {useRouter} from "next/router";

interface TrackItemProps {
    track: ITrack
    active?: boolean
}

const TrackItem: FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    return (
        <Card className={styles.track}>
            <IconButton>
                {active ?
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
                {active && <div> 02:42 / 03:22 </div>}
                <IconButton>
                    <Delete/>
                </IconButton>
            </div>
        </Card>
    );
};

export default TrackItem;