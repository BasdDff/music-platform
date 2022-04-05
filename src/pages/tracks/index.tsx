import React from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import {Box, Button, Card, Grid} from "@mui/material";
import {useRouter} from "next/router";
import {trackAPI} from "../../redux/services/TrackService";
import List from '../../components/UI/List';
import {ITrack} from '../../types/ITrack';
import TrackItem from '../../components/TrackItem/TrackItem';

const Index = () => {
    const router = useRouter()

    const {data: tracks, error, isLoading} = trackAPI.useFetchTracksQuery(10)

    return (
        <MainLayout>
            <Grid>
                <Card>
                    <Box p={1}>
                        <Grid container justifyContent="space-between">
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push("/tracks/create")}>
                                Загрузить
                            </Button>
                        </Grid>
                    </Box>
                    <Grid container direction="column">
                        <Box p={1}>
                            <List items={tracks} renderItem={(track: ITrack) => <TrackItem track={track} key={track._id}/>}/>
                        </Box>
                    </Grid>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;