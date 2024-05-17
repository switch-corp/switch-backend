import { Controller, Get, Logger } from "@nestjs/common";
import { PowerService } from "./power.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Power")
@Controller("power")
export class PowerController {
	constructor(
        private readonly powerService: PowerService
	){}

	private readonly logger: Logger = new Logger(PowerController.name);

    @Get()
    @ApiResponse({ status: 200, description: "OK" })
	randomTurn(){
		this.logger.log("Turning light");
		return this.powerService.turnLight();
	}
}
