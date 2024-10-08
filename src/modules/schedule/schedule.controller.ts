/* eslint-disable no-mixed-spaces-and-tabs */
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dtos/create-schedule";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CurrentUserDto } from "../user/dtos/current-user.dto";

@ApiTags("Schedule")
@Controller("/schedule")
export class ScheduleController {
	constructor (
		private readonly scheduleService: ScheduleService
	) {}

	@Get("/teste/:id")
	get(@Param("id") id: string) {
		return this.scheduleService.findOneById(id);
	}

    @Post("/create")
	createSchedule(@Body() request: CreateScheduleDto, @CurrentUser() user: CurrentUserDto) {
		return this.scheduleService.insertOne(request, user.id);
	}

}