import { Module } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Rooms, RoomsSchema } from "./schemas/rooms.schema";
import { RoomsController } from "./rooms.controller";
import { SwitchModule } from "../switch/switch.module";

@Module({
	imports: [
		SwitchModule,
		MongooseModule.forFeature([
			{
				name: Rooms.name,
				schema: RoomsSchema,
			},
		]),
	],
	providers: [RoomsService],
	controllers: [RoomsController],
	exports: [RoomsService],
})
export class RoomsModule {}
