/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateSwitchInterface } from "../interfaces/create-switch.interace";

export class CreateSwitchDto implements CreateSwitchInterface {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	arduino_id: string;
}