import { Body, Controller, Post } from "@nestjs/common";
import { SwitchService } from "./switch.service";
import { CreateSwitchDto } from "./dtos/create-switch.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Switch")
@Controller("/switch")
export class SwitchController {
	constructor (
        private readonly switchService: SwitchService
	) {}

    @Post("/create")
	async createSwicth(@Body() request: CreateSwitchDto) {
		return this.switchService.createOne(request);
	}
}