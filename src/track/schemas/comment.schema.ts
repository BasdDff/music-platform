import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose"
import {Track} from "./track.schema";
import {ApiProperty} from "@nestjs/swagger";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Track"})
    track: Track;

    @ApiProperty({example: '6308b748d6c1e29812db7f9e', description: "Email"})
    @Prop({
        type: String,
        required: true
    })
    userId: string

}

export const CommentSchema = SchemaFactory.createForClass(Comment);