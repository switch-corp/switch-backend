/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Rooms {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: "Switches", default: [] })
  switches: Types.ObjectId[];
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
