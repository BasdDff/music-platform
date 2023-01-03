import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {ObjectId} from "mongoose"
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Track} from "./schemas/track.schema";
import {UserDecorator} from "../auth/user.decorator";
import {UserEntity} from "../user/types/UserEntity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Track')
@Controller("/tracks")
export class TrackController {
    constructor(private trackService: TrackService) {
    }

    @ApiOperation({summary: 'Create track'})
    @ApiResponse({status: 200, type: Track})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: "BestTrack", description: "Name"},
                artist: { type: 'string', example: "zxcursed", description: "Artist name"},
                text: { type: 'string', example: "text text text", description: "description"},
                picture: {
                    type: 'string',
                    format: 'binary',
                },
                audio: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: "picture", maxCount: 1},
        {name: "audio" , maxCount: 1}
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto, @UserDecorator() user: UserEntity) {
        const {picture, audio} = files
        console.log(user)
        return this.trackService.create(dto, picture[0], audio[0], user._id)
    }

    @ApiOperation({summary: 'search tracks by name'})
    @Get("/search")
    search(@Query("query") query: string) {
        return this.trackService.search(query)
    }

    @ApiOperation({summary: 'get tracks with pagination'})
    @Get()
    getAll(@Query("count") count: number, @Query("offset") offset: number) {
        return this.trackService.getAll(count, offset)
    }

    @ApiOperation({summary: 'get track by id'})
    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.trackService.getOne(id)
    }

    @ApiOperation({summary: 'delete track by id'})
    @ApiParam({name: "_id", type: "string", required: true, example: "624afa914bd254ee6b1a5a4b", description: "ObjectId track"})
    @UseGuards(JwtAuthGuard)
    @Delete(":_id")
    delete(@Param("_id") _id: ObjectId, @UserDecorator() user: UserEntity) {
        // @ts-ignore
        return this.trackService.delete(_id, user._id)
    }

    @ApiOperation({summary: 'add comment to track'})
    @UseGuards(JwtAuthGuard)
    @Post("/comment")
    addComment(@Body() dto: CreateCommentDto, @UserDecorator() user: UserEntity) {
        console.log(user)
        return this.trackService.addComment(dto, user._id, user.username)
    }

    @ApiOperation({summary: 'add +1 to listens to track'})
    @ApiParam({name: "_id", type: "string", required: true, example: "638f520e0b158b68dd4c537e", description: "ObjectId track"})
    @Post("/listen/:_id")
    listen(@Param("_id") _id: ObjectId) {
        return this.trackService.listen(_id)
    }
}