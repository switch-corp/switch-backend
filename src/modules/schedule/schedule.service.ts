/* eslint-disable no-mixed-spaces-and-tabs */
import { Injectable, Logger, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron } from "@nestjs/schedule";
import { Schedules } from "./schemas/schedules.schema";
import { Model } from "mongoose";
import { CreateScheduleDto } from "./dtos/create-schedule";
import { EventEmitter } from "stream";
import { SwitchService } from "../switch/switch.service";

@Injectable()
export class ScheduleService implements OnModuleInit {
	constructor(
		@InjectModel(Schedules.name) 
		private readonly scheduleModel: Model<Schedules>,
		private readonly eventEmiter: EventEmitter,
		private readonly switchservice: SwitchService
	) {}

	private readonly logger: Logger = new Logger(ScheduleService.name);

	onModuleInit() {
		this.eventEmiter.on("new-schedule", (schedule) => {
			console.log(schedule);			
		});
	}

	async findOne(_id: string) {
		const schedule = await this.scheduleModel.find({ _id });
		if (!schedule) {
			throw new UnauthorizedException("Schedule not found");
		}
		return schedule;
	}

	async insertOne(data: CreateScheduleDto) {
		// data.switches.map(async e => {
		// 	await this.switchservice.findById(e);
		// });

    	// const schedule = await this.scheduleModel.create({ ...data, is_active: false});
    	// this.eventEmiter.emit("new-schedule", schedule);
    	// return schedule; 
	}

	@Cron("*/30 * * * * *")
	handleCron() {
		this.logger.debug("Called when the current second is 45");
	}
}