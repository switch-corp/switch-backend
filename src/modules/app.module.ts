import { Module } from "@nestjs/common";
import { PowerModule } from "./power/power.module";
import { AppController } from "./app.controller";
import { SwaggerConfigModule } from "src/config/swaggger/configuration.module";
import { AppConfigModule } from "src/config/app/consfiguration.module";
import { MongoDatabaseProviderModule } from "src/providers/database/mongo/provider.module";
import { AppGateway } from "./app.gateway";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "src/common/guards/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { AuthConfigModule } from "src/config/auth/configuration.module";
import { SwitchModule } from "./switch/switch.module";
import { RoomsModule } from "./rooms/rooms.module";
// import { SwitchScheduleModule } from "./schedule/schedule.module";

@Module({
	imports: [
		AppConfigModule,
		AppGateway,
		AuthConfigModule,
		AuthModule,
		UserModule,
		RoomsModule,
		// SwitchScheduleModule,
		MongoDatabaseProviderModule,
		SwaggerConfigModule,
		SwitchModule,
		PowerModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
