/* eslint-disable no-mixed-spaces-and-tabs */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dtos/create-schedule";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { CurrentUserDto } from "../user/dtos/current-user.dto";
import { UpdateScheduleDto } from "./dtos/update-schedule";

@ApiTags("Schedule")
@Controller("/schedule")
export class ScheduleController {
	constructor (
		private readonly scheduleService: ScheduleService
	) {}

	@Get("/search/:id")
	get(@Param("id") id: string) {
		return this.scheduleService.findOneById(id);
	}

    @Post("/create")
	createSchedule(@Body() request: CreateScheduleDto, @CurrentUser() user: CurrentUserDto) {
		return this.scheduleService.insertOne(request, user.id);
	}

	@Put("/update/:id")
	updateSwitch(@Param("id") id: string, @Body() body: UpdateScheduleDto) {
		return this.scheduleService.updateOneById(id, body)
	}

	@Delete("/:id")
	deleteSchedule(@Param("id") id: string) {
		return this.scheduleService.deleteOne(id)
	}

}