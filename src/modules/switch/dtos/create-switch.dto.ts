/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateSwitchInterface } from "../interfaces/create-switch.interace";

export class CreateSwitchDto implements CreateSwitchInterface {
	@IsString()
	@ApiProperty()
	name: string;

	@IsString()
	@ApiProperty()
	arduino_id: string;
}