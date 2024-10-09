import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("App")
@Controller("app")
export class AppController {
    @Get("/healthcheck")
	healthCheck() {
		return { status: 200 };
	}
}
