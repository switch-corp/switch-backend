import { Body, Controller, Post } from "@nestjs/common";
import { SwitchService } from "./switch.service";
import { CreateSwitchDto } from "./dtos/create-switch.dto";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CurrentUserDto } from "../user/dtos/current-user.dto";

@ApiTags("Switch")
@Controller("/switch")
export class SwitchController {

	constructor (
        private readonly switchService: SwitchService
	) {}

    @Post("/create")
	async createSwicth(@Body() request: CreateSwitchDto, @CurrentUser() user: CurrentUserDto) {
		return this.switchService.createOne(request, user);
	}

}