import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateRoomRequestDto {
	@IsString()
    @IsOptional()
	@ApiProperty()
	name: string;

	@IsString()
    @IsOptional()
	@ApiProperty()
	description: string;
}