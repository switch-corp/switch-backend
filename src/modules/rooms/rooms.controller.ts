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
import { AddSwitchesDTO } from "./dto/add.switches.dto";
import { PowerDto } from "../switch/dtos/power.dto";
import { isPublic } from "../auth/decorators/isPulic.decorator";

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

	@Post("/power/:roomId")
	async changeState(@Body() state: PowerDto, @Param("roomId") roomId: string) {
		return this.roomsService.changeState(state.state, roomId);
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

	@Patch(":roomid/switches")
	@HttpCode(HttpStatus.NO_CONTENT)
	async addSwitch(
		@Param("roomid") roomid: string,
		@Body() switchid: AddSwitchesDTO,
	) {
		return this.roomsService.addSwitch(roomid, switchid);
	}

	@Delete(":roomid")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteRoom(
		@Param("roomid") roomid: string
	) {
		return this.roomsService.deleteOne(roomid);
	}
}
