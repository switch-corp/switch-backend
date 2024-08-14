/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Switches {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    arduino_id: string;

    @Prop({ required: true })
    is_acive: boolean;
}

export const SwitchesSchema = SchemaFactory.createForClass(Switches);