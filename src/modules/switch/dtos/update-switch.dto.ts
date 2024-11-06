import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateSwitchDto {
	@IsString()
	@ApiProperty()
	name: string;
}