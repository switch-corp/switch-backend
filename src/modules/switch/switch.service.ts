import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Switches } from "./schemas/switches.schema";
import { Model } from "mongoose";
import { CreateSwitchDto } from "./dtos/create-switch.dto";

@Injectable()
export class SwitchService {
	constructor (
        @InjectModel(Switches.name)
        private readonly switchModel: Model<Switches>
	) {}

	async findById(_id: string) {
		const _switch = await this.switchModel.findOne({ _id });
		if(!_switch) {
			throw new NotFoundException("Switch not found");
		}
		return _switch;
	}

	async createOne(data: CreateSwitchDto) {
		const _switch = await this.switchModel.create({ ...data, is_acive: false });
		return _switch;
	}
}