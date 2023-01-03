import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose"
import {ApiProperty} from "@nestjs/swagger";

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @ApiProperty({example: '6308b748d6c1e29812db7f9e', description: "Email"})
    @Prop({
        type: String,
        required: true
    })
    userId: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]})
    comments: Comment[]
}

export const TrackSchema = SchemaFactory.createForClass(Track);