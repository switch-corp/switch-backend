/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ versionKey: false })
export class UserGroup extends Document {
	@Prop({ required: true })
	name: string;

	@Prop({ type: [Types.ObjectId], ref: "Users", default: [] })
	users: Types.ObjectId[];

	@Prop({ type: [Types.ObjectId], ref: "Schedules", default: [] })
	schedules: Types.ObjectId[];

	@Prop({ type: [Types.ObjectId], ref: "Rooms", default: [] })
	rooms: Types.ObjectId[];

	@Prop({ type: [Types.ObjectId], ref: "Switches", default: [] })
	switches: Types.ObjectId[];

	@Prop({ required: true, default: false })
	isUser: boolean;
}

export const UserGroupSchema = SchemaFactory.createForClass(UserGroup);
