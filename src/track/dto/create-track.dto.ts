import {ApiProperty} from "@nestjs/swagger";

export class CreateTrackDto {
    @ApiProperty({example: 'BestTrack', description: "Name"})
    readonly name
    @ApiProperty({example: 'zxcursed', description: "Artist name"})
    readonly artist
    @ApiProperty({example: 'text text text', description: "description"})
    readonly text
}