import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";
import { UpdateUserGroupInterface } from "../interfaces/update-user-group.interface";

export class UpdateUserGroupDto implements UpdateUserGroupInterface {
    
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    users: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    schedules: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    rooms: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    switches: string[];
}