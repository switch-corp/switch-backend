import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CraeteUserGroupInterface } from "../interfaces/create-user-group.interface";

export class CreateUserGroupDto implements CraeteUserGroupInterface {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsArray()
    users: string[];

    @ApiProperty()
    @IsArray()
    schedules: string[];

    @ApiProperty()
    @IsArray()
    rooms: string[];

    @ApiProperty()
    @IsArray()
    switches: string[];

    isUser: boolean;
}