import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
	constructor (
        private readonly configService: ConfigService
	) {}

	get port() {
		return this.configService.get<string>("app.port");
	}
}