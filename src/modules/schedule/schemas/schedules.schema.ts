/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Schedules {
  @Prop({ required: true })
  event_name: string;

  @Prop({ required: true })
  event_date: string;

  @Prop({ required: true })
  is_active: boolean;
  
  @Prop({ type: [Types.ObjectId], ref: "Switchs", default: [] })
  switches: Types.ObjectId[];
}

export const SchedulesSchema = SchemaFactory.createForClass(Schedules);