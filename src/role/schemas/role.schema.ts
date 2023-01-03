import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import * as mongoose from "mongoose"

export type RoleDocument = Role & Document

@Schema()
export class Role {
    @ApiProperty({example: 'Admin', description: "Unique name role"})
    @Prop({
        type: String,
        required: true,
        unique: true
    })
    name: string

    @ApiProperty({example: "Administrator", description: "Description role"})
    @Prop({
        type: String
    })
    description: string

    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    // user:
}

export const RoleSchema = SchemaFactory.createForClass(Role)