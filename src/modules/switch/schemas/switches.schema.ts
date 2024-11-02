/* eslint-disable indent */
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty} from '@nestjs/swagger';

@Schema({versionKey: false})
export class Switches {
  @ApiProperty({example: 'switch-do-quarto'})
  @Prop({required: true})
  name: string;

  @ApiProperty({example: '1234567890'})
  @Prop({required: true})
  arduino_id: string;

  @ApiProperty({example: true})
  @Prop({required: true})
  is_active: boolean;
}

export const SwitchesSchema = SchemaFactory.createForClass(Switches);
