import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateRoomRequestDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsString()
	@ApiProperty()
	@IsNotEmpty()
	description: string;

	@IsArray()
	@IsNotEmpty()
	@ApiProperty()
	switches: Types.ObjectId[];
}

export class CreateRoomDto {
	@IsString()
	@ApiProperty()
	userId: string;

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
