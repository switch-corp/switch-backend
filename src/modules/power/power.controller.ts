import { Controller, Get } from "@nestjs/common";
import { PowerService } from "./power.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Power")
@Controller("power")
export class PowerController {
	constructor(
        private readonly powerService: PowerService
	){}

    @Get()
    @ApiResponse({ status: 200, description: "OK" })
	randomTurn(){
		return this.powerService.turnLight();
	}
}
