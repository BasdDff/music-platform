import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {User, UserDocument} from "./schemas/user.schema";
import mongoose, {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import {RoleService} from "../role/role.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {GetUserDto} from "./dto/get-user.dto";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private roleService: RoleService) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.userModel.create({...dto})
        const role = await this.roleService.getRoleByValue("admin")
        console.log(role)
        //https://mongoosejs.com/docs/documents.html
        user.roles = [{name: role.name, description: role.description}]
        await user.save()
        return user
    }

    async logout() {

    }

    async refresh() {

    }

    async getCurrentUser() {

    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({email})
        return user
    }

    // async getAllUsers() {
    //     return this.userModel.find()
    // }

    async addRole(dto: AddRoleDto) {
        const isValidId = mongoose.Types.ObjectId.isValid(dto.userId)
        if (!isValidId) {
            throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
        }
        const user = await this.userModel.findOne({_id: dto.userId})
        const role = await this.roleService.getRoleByValue(dto.name)
        if (user && role) {
            if (user.roles.some(role => role.name === dto.name)) {
                //Этот ответ отсылается, когда запрос конфликтует с текущим состоянием сервера.
                throw new HttpException('У пользователя уже есть такая роль', HttpStatus.CONFLICT)
            }
            await user.updateOne({$push: {roles: {value: role.name, description: role.description}}})
            return
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userModel.findOne({_id: dto.userId})
        console.log(dto)
        console.log(user)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.ban = true
        await user.save()
        return user
    }

    async getUserById(userId) {
        const user = await this.userModel.findById(userId)
        return new GetUserDto(user)
    }

    async updatePassword(password: string) {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }

    async getAndUpdateUserInfo(user, body) {
        const currentUser = this.userModel.findById(user._id)
        return currentUser.updateOne({$set: body})
    }

    async getAllUsers(page, pageSize) {
        let countSkip = page * pageSize
        return this.userModel.find().skip(countSkip).limit(parseInt(pageSize))
    }

    async getTotalCountUsers() {
        // @ts-ignore
        return this.userModel.collection.stats().count
    }

    async search(username: string) {
        if (username) {
            return this.userModel.find({"username": {"$regex": `^${username}`, '$options': 'i'}})
        }
    }
}