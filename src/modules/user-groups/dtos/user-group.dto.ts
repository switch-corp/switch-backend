import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { Rooms } from "src/modules/rooms/schemas/rooms.schema";
import { Switches } from "src/modules/switch/schemas/switches.schema";
import { CurrentUserDto } from "src/modules/user/dtos/current-user.dto";

export class UserGroupDto  {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    _id: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
	name: string;

    @IsNotEmpty()
    @ApiProperty()
	users: CurrentUserDto[]

    @IsNotEmpty()
    @ApiProperty()
	schedules: Types.ObjectId[];

    @IsNotEmpty()
    @ApiProperty()
	rooms: Types.ObjectId[];

    @IsNotEmpty()
    @ApiProperty()
	switches: Types.ObjectId[];

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
	isUser: boolean;
}