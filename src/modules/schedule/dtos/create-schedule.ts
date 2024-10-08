/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsString } from "class-validator";

export class CreateScheduleDto {
	@IsString()
	@ApiProperty()
	event_name: string;

	@IsString()
	@ApiProperty()
	event_date: string;

	@IsArray()
	@ApiProperty()
	switches: string[];
}