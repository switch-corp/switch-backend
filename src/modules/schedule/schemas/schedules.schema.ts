/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Switches } from "src/modules/switch/schemas/switches.schema";

@Schema({ versionKey: false })
export class Schedules {
  @Prop({ required: true })
  event_name: string;

  @Prop({ required: true })
  event_date: string;

  @Prop({ required: true })
  is_active: boolean;
  
  @Prop({ type: [Types.ObjectId], ref: "Switches", default: [] })
  switches: Switches;
}

export const SchedulesSchema = SchemaFactory.createForClass(Schedules);