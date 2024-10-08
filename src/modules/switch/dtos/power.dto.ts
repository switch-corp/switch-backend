/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { PowerInterface } from "../interfaces/power.interface";

export class PowerDto implements PowerInterface {
	@IsBoolean()
	@ApiProperty()
	state: boolean;
}