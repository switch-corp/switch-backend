import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";

@ApiTags("Rooms")
@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@Post("/room")
	async createRoom(@Body() request: CreateRoomDto) {
		return this.roomsService.createOne(request);
	}
}
