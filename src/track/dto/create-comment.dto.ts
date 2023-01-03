import {ObjectId} from "mongoose"
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    // @ApiProperty({example: 'user356', description: "username"})
    // readonly username: string
    @ApiProperty({example: 'text text text', description: "text comment"})
    readonly text: string
    @ApiProperty({example: '638f520e0b158b68dd4c537e', description: "track Object Id"})
    readonly trackId: ObjectId
}