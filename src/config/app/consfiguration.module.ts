import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { AppConfigService } from "./configuration.service";
import * as Joi from "joi";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validationSchema: Joi.object({
				PORT: Joi.number().default(3000)
			})
		})
	],
	providers: [AppConfigService, ConfigService],
	exports: [AppConfigService, ConfigService],
})
export class AppConfigModule {}