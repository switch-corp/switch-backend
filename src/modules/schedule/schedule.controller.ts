/* eslint-disable no-mixed-spaces-and-tabs */
import { Body, Controller, Param, Post } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dtos/create-schedule";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Schedule")
@Controller("/schedule")
export class ScheduleController {
	constructor (
		private readonly scheduleService: ScheduleService
	) {}

    @Post("/create")
	createSchedule(@Body() request: CreateScheduleDto) {
		return this.scheduleService.insertOne(request);
	}

	@Post("/teste/:id")
    teste(@Param("id") id: string){
    	return this.scheduleService.teste(id, false);
    }
}