import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schemas/user.schema";
import { IsEmailAlreadyinUseConstraint } from "src/common/constraints/is-email-already-in-use.constraint";

@Module({
	imports: [
		MongooseModule.forFeature([{
			name: Users.name, schema: UsersSchema
		}])
	],
	controllers: [UserController],
	providers: [UserService, IsEmailAlreadyinUseConstraint],
	exports: [UserService]
})
export class UserModule {} 