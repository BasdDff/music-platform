import {forwardRef, Module} from "@nestjs/common";
import {TrackController} from "./track.controller";
import {TrackService} from "./track.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "./schemas/track.schema";
import {Comment, CommentSchema} from "./schemas/comment.schema";
import {FileService} from "../file/file.service";
import {AuthModule} from "../auth/auth.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
        forwardRef(() => AuthModule)
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService]
})
export class TrackModule {

}
