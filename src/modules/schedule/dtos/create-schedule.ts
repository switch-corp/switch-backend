/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { CreateScheduleInterface } from "../interfaces/create-schedule.interface";

export class CreateScheduleDto implements CreateScheduleInterface {
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