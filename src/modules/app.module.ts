import { Module } from "@nestjs/common";
import { PowerModule } from "./power/power.module";
import { AppController } from "./app.controller";

@Module({
	imports: [PowerModule],
	controllers: [AppController]
})
export class AppModule {}
