import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class AddSwitchesDTO {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    switches: string[]
}