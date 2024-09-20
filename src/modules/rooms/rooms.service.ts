import { Injectable } from "@nestjs/common";
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
}
