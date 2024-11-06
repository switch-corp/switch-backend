import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoomsService } from "./rooms.service";
import { CreateRoomRequestDto } from "./dto/create-room.dto";
import { JwtService } from "@nestjs/jwt";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CurrentUserDto } from "../user/dtos/current-user.dto";
import { UpdateRoomRequestDto } from "./dto/update-room.dto";

@ApiTags("Rooms")
@Controller("rooms")
export class RoomsController {
	constructor(
		private readonly roomsService: RoomsService,
		private readonly jwtService: JwtService,
	) {}

	@Post("")
	async createRoom(@CurrentUser() user: CurrentUserDto, @Body() body: CreateRoomRequestDto) {
		const data = { userId: user.id, ...body };

		return this.roomsService.createOne(data);
	}

	@Get("")
	async findAll(@CurrentUser() user: CurrentUserDto) {
		return this.roomsService.findByUserId(user.id);
	}

	@Get(":id")
	async findRoom(@Param("id") id: string) {
		return this.roomsService.findById(id);
	}

	@Patch(":roomid")
	@HttpCode(HttpStatus.CREATED)
	async updateRoom(
		@Param("roomid") roomId: string,
		@Body() request: UpdateRoomRequestDto
	) {
		return this.roomsService.updateOne(request, roomId);
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
