import {Card, Grid, Step, StepLabel, Stepper} from '@mui/material';
import React, {FC} from 'react';

interface StepWrapperProps {
    activeStep: number
}

const steps = ["Информация о треке", "Загрузите обложку", "Загрузите трек"]

const StepWrapper: FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step key={index} completed={activeStep > index}>
                        <StepLabel>
                            {step}
                        </StepLabel>
                    </Step>
                )}
            </Stepper>
            {children}
        </div>
    );
};

export default StepWrapper;