import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthConfigModule } from "src/config/auth/configuration.module";

@Module({
	imports: [
		AuthConfigModule,
		UserModule,
		JwtModule.register({
			global: true,
			signOptions: { expiresIn: "12h" },
		})
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}