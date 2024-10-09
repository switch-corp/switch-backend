import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Rooms } from "./schemas/rooms.schema";
import { Model } from "mongoose";

@Injectable()
export class RoomsService {
	constructor(
		@InjectModel(Rooms.name)
		private readonly roomModel: Model<Rooms>,
	) {}

	async createOne(data: CreateRoomDto) {
		const room = await this.roomModel.create({ ...data });
		return room;
	}

	async findByUserId(userId: string) {
		const rooms = await this.roomModel.find({ userId });
		let list = await Promise.all(
			rooms.map(async room => {
				return await room.populate("switches");
			})
		);
		
		return list;
	}

	async findById(roomId: string) {
		const rooms = await this.roomModel.findById(roomId);
		return rooms;
	}

	async addSwitch(roomId: string, switchId: string) {
		const room = await this.roomModel.findByIdAndUpdate(
			roomId,
			{
				$push: { switches: switchId },
			},
			{ new: true },
		);
		return room;
	}

	async removeSwitch(roomId: string, switchId: string) {
		const room = await this.roomModel.findByIdAndUpdate(
			roomId,
			{
				$pull: { switches: switchId },
			},
			{ new: true },
		);
		return room;
	}
}
