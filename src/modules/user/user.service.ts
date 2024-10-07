import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./schemas/user.schema";
import { Model, Schema } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserGroupService } from "../user-groups/user-group.service";

@Injectable()
export class UserService {
	constructor (
        @InjectModel(Users.name)
        private readonly usersModel: Model<Users>,
		private readonly userGroupService: UserGroupService
	) {}

	async createOne(data: CreateUserDto) {
		const user = await this.usersModel.create(data);
		const userGroup  = await this.userGroupService.createOne(this.buildUserGroup(user._id.toString(), user.name))
		return user;
	}

	async findByEmail(email: string) {
		const user = await this.usersModel.findOne({ email });
		if (!user) throw new NotFoundException("User not found");
		return await this.usersModel.findOne({ email });
	}

	buildUserGroup(userId: string, username: string) {
		return {
			name: `grupo do ${username}`,
			users: [userId],
			schedules: [],
			rooms: [],
			switches: [],
			isUser: true
		}
	}
}