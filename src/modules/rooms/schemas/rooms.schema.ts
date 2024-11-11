/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Switches } from "src/modules/switch/schemas/switches.schema";

@Schema({ versionKey: false })
export class Rooms {
	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	name: string;

	@Prop()
	description: string;

	@Prop({ type: [Types.ObjectId], ref: "Switches", default: [] })
	switches: Types.ObjectId[] | Switches[];
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
