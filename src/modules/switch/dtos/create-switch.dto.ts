/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSwitchDto {
	@IsString()
	@ApiProperty()
	name: string;

	@IsString()
	@ApiProperty()
	arduino_id: string;
}