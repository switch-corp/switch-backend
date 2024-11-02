import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoomsService } from "./rooms.service";
import { CreateRoomRequestDto } from "./dto/create-room.dto";
import { JwtService } from "@nestjs/jwt";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@ApiTags("Rooms")
@Controller("rooms")
export class RoomsController {
	constructor(
		private readonly roomsService: RoomsService,
		private readonly jwtService: JwtService,
	) {}

	@Post("/create")
	async createRoom(@CurrentUser() user, @Body() body: CreateRoomRequestDto) {
		const data = { userId: user.id, ...body };

		return this.roomsService.createOne(data);
	}

	@Get("/all")
	async findAll(@CurrentUser() user) {
		return this.roomsService.findByUserId(user.id);
	}

	@Get(":id")
	async findRoom(@Param("id") id: string) {
		return this.roomsService.findById(id);
	}

	@Patch(":roomid/:switchid")
	async addSwitch(
		@Param("roomid") roomid: string,
		@Param("switchid") switchid: string,
	) {
		return this.roomsService.addSwitch(roomid, switchid);
	}

	@Delete(":roomid/:switchid")
	async removeSwitch(
		@Param("roomid") roomid: string,
		@Param("switchid") switchid: string,
	) {
		return this.roomsService.removeSwitch(roomid, switchid);
	}
}
