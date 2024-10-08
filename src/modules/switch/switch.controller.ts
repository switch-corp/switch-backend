import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SwitchService } from "./switch.service";
import { CreateSwitchDto } from "./dtos/create-switch.dto";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CurrentUserDto } from "../user/dtos/current-user.dto";
import { PowerDto } from "./dtos/power.dto";

@ApiTags("Switch")
@Controller("/switch")
export class SwitchController {

	constructor (
        private readonly switchService: SwitchService
	) {}

	@Get("/arduino/:arduino_id")
	findSwitchByArduinoId(@Param("arduino_id") id: string) {
		return this.switchService.findByArduinoId(id)
	}

	@Post("/power/:arduino_id")
	powerOne(@Param("arduino_id") id: string, @Body() request: PowerDto ) {
		return this.switchService.powerOne(request.state, id);
	}

    @Post("/create")
	createSwicth(@Body() request: CreateSwitchDto, @CurrentUser() user: CurrentUserDto) {
		return this.switchService.createOne(request, user);
	}

}