import { Module } from "@nestjs/common";
import { PowerModule } from "./power/power.module";
import { AppController } from "./app.controller";
import { SwaggerConfigModule } from "src/config/swaggger/configuration.module";
import { AppConfigModule } from "src/config/app/consfiguration.module";

@Module({
	imports: [
		AppConfigModule,
		SwaggerConfigModule,
		PowerModule,
	],
	controllers: [AppController]
})
export class AppModule {}
