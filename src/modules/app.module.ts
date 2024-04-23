import { Module } from "@nestjs/common";
import { PowerModule } from "./power/power.module";

@Module({
	imports: [PowerModule]
})
export class AppModule {}
