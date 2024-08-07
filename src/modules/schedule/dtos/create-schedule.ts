/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateScheduleDto {
	@IsString()
	@ApiProperty()
	event_name: string;

	@IsDateString()
	@ApiProperty()
	event_date: Date;

	@IsArray()
	@ApiProperty()
	switches: Types.ObjectId[];
}