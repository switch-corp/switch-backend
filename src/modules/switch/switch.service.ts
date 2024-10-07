import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Switches } from "./schemas/switches.schema";
import { Model } from "mongoose";
import { CreateSwitchDto } from "./dtos/create-switch.dto";
import { CurrentUserDto } from "../user/dtos/current-user.dto";
import { UserGroupService } from "../user-groups/user-group.service";
import { UpdateUserGroupDto } from "../user-groups/dtos/update-user-group.dto";

@Injectable()
export class SwitchService {
	constructor(
		@InjectModel(Switches.name)
		private readonly switchModel: Model<Switches>,
		private readonly userGroupService: UserGroupService
	) {}

	async findById(_id: string) {
		const _switch = await this.switchModel.findOne({ _id });
		if (!_switch) throw new NotFoundException("Switch not found")
		return _switch;
	}

	async createOne(data: CreateSwitchDto, currentUser: CurrentUserDto) {
		const _switch = await this.switchModel.create({
			...data,
			is_active: false,
		});
		await this.userGroupService.updateByUserId(currentUser.id, new UpdateUserGroupDto(_switch.id))
		return _switch;
	}
}
