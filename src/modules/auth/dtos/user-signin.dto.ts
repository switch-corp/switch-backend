/* eslint-disable indent */
import { IsEmail, IsString } from "class-validator";
import { UserSignInInterface } from "../interfaces/user-signin.interface";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignInDto implements UserSignInInterface {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}