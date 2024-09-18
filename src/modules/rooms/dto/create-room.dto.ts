import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateRoomDto {
	@IsString()
	@ApiProperty()
	name: string;

	@IsString()
	@ApiProperty()
	description: string;

	@IsArray()
	@ApiProperty()
	switches: Types.ObjectId[];
}
