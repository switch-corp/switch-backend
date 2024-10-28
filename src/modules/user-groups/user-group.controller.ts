import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserGroupService } from "./user-group.service";
import { CreateUserGroupDto } from "./dtos/create-user-group.dto";
import { ApiTags } from "@nestjs/swagger";
import { UpdateUserGroupDto } from "./dtos/update-user-group.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CurrentUserDto } from "../user/dtos/current-user.dto";

@ApiTags("UserGroups")
@Controller("usergroups")
export class UserGroupController {
    constructor (
        private readonly userGroupService: UserGroupService
    ) {}

    @Get()
    findByUSerId(@CurrentUser() user: CurrentUserDto) {
        return this.userGroupService.findByUserId(user.id);
    }
}
