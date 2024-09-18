/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";

@Schema({ versionKey: false })
export class Users {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre<Users>("save", async function () {
	const salt = await bcrypt.genSalt(10);
	const hashpwd = await bcrypt.hash(this.password, salt);

	this.password = hashpwd;
});
