/* eslint-disable indent */
import { IsEmail, IsString } from "class-validator";
import { CreateUserInterface } from "../interfaces/create-user.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmailAlreadyinUse } from "src/common/decorators/is-email-already-in-use.decorator";

export class CreateUserDto implements CreateUserInterface {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @IsEmail()
    @IsEmailAlreadyinUse()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}