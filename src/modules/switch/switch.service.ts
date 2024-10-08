import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Switches } from "./schemas/switches.schema";
import { Model } from "mongoose";
import { CreateSwitchDto } from "./dtos/create-switch.dto";
import { CurrentUserDto } from "../user/dtos/current-user.dto";
import { UserGroupService } from "../user-groups/user-group.service";
import { UpdateUserGroupDto } from "../user-groups/dtos/update-user-group.dto";
import { plainToInstance } from "class-transformer";

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

	async powerOne(state: boolean, arduino_id: string) {
		const arduino = await this.findByArduinoId(arduino_id);
		arduino.is_active = state;
		return await this.switchModel.replaceOne({ _id: arduino.id }, arduino)
	}

	async findByArduinoId(arduino_id: string) {
		const _switch = await this.switchModel.findOne({ arduino_id });
		if (!_switch) throw new NotFoundException("Switch not found")
		return _switch;
	}

	async createOne(data: CreateSwitchDto, currentUser: CurrentUserDto) {
		const _switch = await this.switchModel.create({
			...data,
			is_active: false,
		});
		const userGroup = await this.userGroupService.findByUserId(currentUser.id);
		userGroup.switches.push(_switch._id)
		await this.userGroupService.updateByUserId(currentUser.id, plainToInstance(UpdateUserGroupDto, userGroup))
		return _switch;
	}
}
