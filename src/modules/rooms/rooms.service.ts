import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Rooms } from "./schemas/rooms.schema";
import { Model, Types } from "mongoose";
import { UpdateRoomRequestDto } from "./dto/update-room.dto";

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
		const room = await this.roomModel.findById(roomId);
		return room.populate("switches");
	}

	async updateOne(data: UpdateRoomRequestDto, roomId: string) {
		const room = await this.roomModel.findById(roomId)
		if (!room) throw new NotFoundException("Room not found")
		Object.assign(room, data)
		return await this.roomModel.replaceOne({ _id: roomId }, room)
	}

	async addSwitch(roomId: string, switchId: string) {
		let room = await this.roomModel.findById(roomId);
		if (!room) throw new NotFoundException("Room not found");		
		if(!!(room.switches.find(e => e.toString() == switchId))) {
			room.switches = room.switches.filter(e => e.toString() != switchId)
		} else {
			return await this.roomModel.findByIdAndUpdate(roomId, {
				$push: {
					switches: switchId
				}
			})
		}
		
		return await this.roomModel.replaceOne({ _id: roomId }, room);
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
