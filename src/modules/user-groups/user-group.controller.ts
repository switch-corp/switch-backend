import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserGroupService } from "./user-group.service";
import { CreateUserGroupDto } from "./dtos/create-user-group.dto";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserGroupDto } from "./dtos/update-user-group.dto";

@ApiTags("UserGroups")
@Controller("usergroups")
export class UserGroupController {
    constructor (
        private readonly userGroupService: UserGroupService
    ) {}

    @Post()
    createUserGroup(@Body() body: CreateUserGroupDto) {
        return this.userGroupService.createOne(body);
    }
}
