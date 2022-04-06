import React, {FC, useState} from 'react';
import MainLayout from "../../layouts/MainLayout/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Avatar, Button, Card, Grid, TextField} from "@mui/material";
import FileUpload from "../../components/UI/FileUpload";
import {SERVER_ADDRESS} from "../../env";

const Create: FC = () => {

    const [step, setStep] = useState<number>(0)

    const [image, setImage] = useState(null)
    const [audio, setAudio] = useState(null)

    const nextStep = () => {
        setStep(step => step + 1)
    }

    const prevStep = () => {
        setStep(step => step - 1)
    }
    console.log(step)
    return (
        <MainLayout>
            <StepWrapper activeStep={step}>
                <Grid container style={{margin: "30px 0"}}>
                    <Card style={{padding: "10px", width: "100%"}}>
                        <div style={{fontSize: "1.2rem", marginBottom: "10px"}}>Загрузка трека</div>
                        {step === 0 &&
                        <Grid container direction={"row"}>
                            <TextField label="Название трека" fullWidth style={{marginBottom: "15px"}}/>
                            <TextField label="Имя автора" fullWidth style={{marginBottom: "15px"}}/>
                            <TextField label="Текст песни" fullWidth multiline/>
                        </Grid>
                        }
                        {step === 1 &&
                        <FileUpload setFile={setImage} accept="image/*">
                            <Button>Загрузить изображение</Button>
                            <Avatar
                                src={URL.createObjectURL(image)}
                                sx={{width: 300, height: 300, borderRadius: 0, marginRight: "20px", marginBottom: "20px"}}
                            />
                        </FileUpload>
                        }
                        {step === 2 &&
                        <FileUpload setFile={() => ({})} accept="audio/*">
                            <Button>Загрузить трек</Button>
                        </FileUpload>
                        }
                    </Card>
                </Grid>
            </StepWrapper>
            <Grid container justifyContent="space-between">
                <Button disabled={step === 0} onClick={prevStep} variant="outlined">Назад</Button>
                {step !== 2 &&
                <Button onClick={nextStep} variant="outlined">Далее</Button>
                }
                {step === 2 &&
                <Button variant="outlined">Отправить</Button>
                }
            </Grid>

        </MainLayout>
    );
};

export default Create;