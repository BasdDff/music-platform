import React, {FC, useState} from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import {ITrack} from "../../types/ITrack";
import {Avatar, Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import $api from "../../http";
import {GetServerSideProps} from "next";
import {SERVER_ADDRESS} from "../../env";

const TrackPage = ({serverTrack}) => {

    const [track, setTrack] = useState<ITrack>(serverTrack)
    console.log(track)
    const router = useRouter()
    return (
        <MainLayout>
            <Button variant="outlined" onClick={() => router.push(`/tracks`)} style={{marginBottom: "20px"}}>
                К списку
            </Button>
            <Grid container>
                <Avatar
                    src={SERVER_ADDRESS.concat(track.picture)}
                    sx={{width: 200, height: 200, borderRadius: 0, marginRight: "20px", marginBottom: "20px"}}
                />
                <div style={{fontSize: "1.2rem"}}>
                    <div style={{marginBottom: "15px"}}>Название трека - {track.name}</div>
                    <div style={{marginBottom: "15px"}}>Исполнитель - {track.artist} </div>
                    <div>Прослушиваний - {track.listens}</div>
                </div>
            </Grid>
            <div style={{fontSize: "1.2rem", marginBottom: "5px"}}>Текст</div>
            <p style={{fontSize: "1rem", marginBottom: "20px"}}>{track.text}</p>
            <div style={{fontSize: "1.2rem", marginBottom: "10px"}}> Коментарии</div>
            <Grid container>
                <TextField label="Ваше имя" style={{width: "50%", marginBottom: "5px"}}/>
                <TextField label="Комментарий" fullWidth multiline rows={5} style={{marginBottom: "5px"}}/>
                <Button variant="outlined" style={{marginBottom: "20px"}}>
                    Отправить
                </Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div key={comment._id}>
                        <div>Автор - {comment.username}</div>
                        <div>{comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const res = await $api.get<ITrack>(`/tracks/${params.id}`)
    return {
        props: {
            serverTrack: res.data
        }
    }
}