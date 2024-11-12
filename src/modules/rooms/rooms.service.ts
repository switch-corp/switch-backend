import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Rooms } from "./schemas/rooms.schema";
import { Model, Types } from "mongoose";
import { UpdateRoomRequestDto } from "./dto/update-room.dto";
import { AddSwitchesDTO } from "./dto/add.switches.dto";
import { SwitchService } from "../switch/switch.service";
import { Switches } from "../switch/schemas/switches.schema";
import { stat } from "fs/promises";

@Injectable()
export class RoomsService {
	constructor(
		@InjectModel(Rooms.name)
		private readonly roomModel: Model<Rooms>,
		private readonly switchService: SwitchService
	) {}

	async changeState(state: boolean, roomId: string) {
		const room = await this.findById(roomId);
		room.switches.map(async e => {
			return await this.switchService.powerOne(state, e.arduino_id)
		})
	}

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
		let state = true;
		let room = await this.roomModel.findById(roomId).populate("switches");;
		if (!room) throw new NotFoundException("Room not found")

		let populatedRoom = room.toObject()
		
		if (room.switches.length == 0) state = false
		if(populatedRoom.switches.find((e: Switches) => e.is_active == false)) {
			state = false
		}

		return {...populatedRoom, state}
		
	}

	async updateOne(data: UpdateRoomRequestDto, roomId: string) {
		const room = await this.roomModel.findById(roomId)
		if (!room) throw new NotFoundException("Room not found")
		Object.assign(room, data)
		return await this.roomModel.replaceOne({ _id: roomId }, room)
	}

	async addSwitch(roomId: string, ids: AddSwitchesDTO) {
		let room = await this.roomModel.findById(roomId);
		if (!room) throw new NotFoundException("Room not found");

		for (let i in ids.switches) {			
			if(room.switches.find(e => e.toString() == ids.switches[i])) {
				await this.roomModel.findByIdAndUpdate(roomId, { 
					$pull: {
						switches: ids.switches[i]
					}
				 })
			} else {
				await this.roomModel.findByIdAndUpdate(roomId, { 
					$push: {
						switches: ids.switches[i]
					}
					})
			}
		}
	}

	async deleteOne(roomId: string) {
		const room = await this.roomModel.findByIdAndDelete(roomId)
		return room;
	}

	appendSwitch(switches: string[]) {

	// 			// if(!!(room.switches.find(e => e.toString() == switchId))) {
	// 	// 	room.switches = room.switches.filter(e => e.toString() != switchId)
	// 	// } else {
	// 		return await this.roomModel.findByIdAndUpdate(roomId, {
	// 			$push: {
	// 				switches: 
	// 			}
	// 		})
	// 	// }
		
	// 	// return await this.roomModel.replaceOne({ _id: roomId }, room);
	// }
		return null
	}
}
