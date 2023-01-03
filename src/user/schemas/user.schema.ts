import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import * as mongoose from "mongoose"
import {Role} from "../../role/schemas/role.schema";

export type UserDocument = User & Document

@Schema()
export class User extends mongoose.Document { //extends для ._id в типах

    // @Prop()
    // _id: mongoose.Schema.Types.ObjectId

    @ApiProperty({example: 'email@gmail.com', description: "Email"})
    @Prop({
        type: String,
        required: true,
        unique: true,
        max: 50
    })
    email: string

    @ApiProperty({example: "qwerty123", description: "Password"})
    @Prop({
        type: String,
        required: true
    })
    password: String

    @Prop({
        type: Array,
    })
    roles: Role[]

    @ApiProperty({example: "true / false", description: "Забанен или нет"})
    @Prop({
        type: Boolean,
        default: false
    })
    ban: boolean

    @ApiProperty({example: "alexden345"})
    @Prop({
        type: String,
        default: "",
        max: 50
    })
    username: string

    @ApiProperty({example: "Аватарка профиля"})
    @Prop({
        type: String,
        default: ""
    })
    img: string
}

export const UserSchema = SchemaFactory.createForClass(User)