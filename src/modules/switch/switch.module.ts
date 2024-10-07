import { Module } from "@nestjs/common";
import { SwitchController } from "./switch.controller";
import { SwitchService } from "./switch.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SwitchesSchema, Switches } from "./schemas/switches.schema";
import { SwitchGateway } from "./switch.gateway";
import { UserGroupModule } from "../user-groups/user-groups.module";

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: Switches.name, schema: SwitchesSchema
		}]),
		UserGroupModule
	],
	controllers: [SwitchController],
	providers: [SwitchService, SwitchGateway],
	exports: [SwitchService, SwitchGateway]
})
export class SwitchModule {}