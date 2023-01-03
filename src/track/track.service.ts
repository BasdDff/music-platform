import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./schemas/track.schema";
import {Model, ObjectId, Types} from "mongoose"
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileService, FileType} from "../file/file.service";
import {log} from "util";

@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                private fileService: FileService
                 ) {
    }

    async create(dto: CreateTrackDto, picture, audio, userId: Types.ObjectId): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath, userId: userId})
        return track
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count))
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate("comments")
        return track
    }

    async delete(_id: ObjectId, userId: string): Promise<ObjectId> {
        const track = await this.trackModel.findById(_id)
        if (track) {
            if (track.userId === userId) {
                return track.deleteOne()
            } else {
                // @ts-ignore
                throw new HttpException("Вы можете удалить только свой трек", HttpStatus.FORBIDDEN)
            }
        }
        //const track = await this.trackModel.findByIdAndDelete(_id)
    }

    async addComment(dto: CreateCommentDto, userId: Types.ObjectId, username: string): Promise<Comment> {
        //console.log(dto)
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto, userId: userId, username: username})
        //console.log(track)
        track.comments.push(comment._id)
        console.log(track)
        await track.save()
        return comment
    }

    async listen(_id: ObjectId) {
        const track = await this.trackModel.findById(_id)
        track.listens += 1
        await track.save()
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: {$regex: new RegExp(query, "i")}
        })
        return tracks
    }
}
