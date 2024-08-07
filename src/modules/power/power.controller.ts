import { Controller, Get } from "@nestjs/common";
import { PowerService } from "./power.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiReponseDecorator } from "src/common/interceptors/decorators/api-response.decorator";
import { isPublic } from "../auth/decorators/isPulic.decorator";

@isPublic()
@ApiTags("Power")
@Controller("power")
export class PowerController {
	constructor(
        private readonly powerService: PowerService
	){}

    @Get()
    @ApiResponse({ status: 200, description: "OK" })
	@ApiReponseDecorator()
	randomTurn(){
		return this.powerService.turnLight();
	}
}
