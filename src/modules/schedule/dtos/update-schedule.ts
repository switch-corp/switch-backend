import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { UpdateScheduleInterface } from "../interfaces/update-schedule.interface";

export class UpdateScheduleDto implements UpdateScheduleInterface {
    @IsString()
    @IsOptional()
	@ApiProperty()
	event_name: string;

	@IsString()
    @IsOptional()
	@ApiProperty()
	event_date: string;

    @IsBoolean()
    @IsOptional()
	@ApiProperty()
	is_active: boolean;

	@IsArray()
    @IsOptional()
	@ApiProperty()
	switches: string[];
}