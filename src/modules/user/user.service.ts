import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UserService {
	constructor (
        @InjectModel(Users.name)
        private readonly usersModel: Model<Users>
	) {}

	async createOne(data: CreateUserDto) {
		const user = await this.usersModel.create(data);
		return user;
	}

	async findByEmail(email: string) {
		const user = await this.usersModel.findOne({ email });
		if (!user) throw new NotFoundException("User not found");
		return await this.usersModel.findOne({ email });
	}
}