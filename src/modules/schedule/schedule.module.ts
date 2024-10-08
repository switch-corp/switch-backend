import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ScheduleService } from "./schedule.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Schedules, SchedulesSchema } from "./schemas/schedules.schema";
import { ScheduleController } from "./schedule.controller";
import { EventEmitter } from "stream";
import { SwitchModule } from "../switch/switch.module";
import { UserGroupModule } from "../user-groups/user-groups.module";

@Module({
	imports: [
		SwitchModule,
		ScheduleModule.forRoot(),
		MongooseModule.forFeature([{
			name: Schedules.name, schema: SchedulesSchema
		}]),
		UserGroupModule
	],
	controllers: [ScheduleController],
	providers: [ScheduleService, EventEmitter]
})
export class SwitchScheduleModule {}