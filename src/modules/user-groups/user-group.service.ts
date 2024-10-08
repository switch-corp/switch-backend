import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserGroup } from "./schemas/user-groups.schema";
import { Model } from "mongoose";
import { UserModule } from "../user/user.module";
import { CreateUserGroupDto } from "./dtos/create-user-group.dto";
import { UpdateUserGroupDto } from "./dtos/update-user-group.dto";

@Injectable()
export class UserGroupService {

    constructor (
        @InjectModel(UserGroup.name)
        private readonly userGroupModel: Model<UserModule>
    ) {}

    async createOne(data: CreateUserGroupDto) {
        const userGroup = await this.userGroupModel.create(data);
        return userGroup;
    }

    async findByUserId(userId: string) {
        let userGroup: UserGroup[] = await this.userGroupModel.find({ isUser: true })    
        return userGroup.filter(e => e.users[0].toString() == userId)[0];
    }

    async updateOne(id: string, data: UserGroup) {
        const userGroup = await this.userGroupModel.findOne({ _id: id });
        if(!userGroup) throw new NotFoundException("User group not found");
        Object.assign(userGroup, data)
        return await this.userGroupModel.replaceOne({ _id : id }, userGroup);
    }

    async updateByUserId(userId: string, data: UpdateUserGroupDto) {
        const userGroup = await this.findByUserId(userId)
        if(!userGroup) throw new NotFoundException("User group not found");
        Object.assign(userGroup, data)
        return await this.userGroupModel.replaceOne({ _id : userGroup._id }, userGroup);
    }
}