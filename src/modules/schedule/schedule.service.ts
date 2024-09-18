/* eslint-disable no-mixed-spaces-and-tabs */
import { Injectable, Logger, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { CronJob } from "cron";
import { InjectModel } from "@nestjs/mongoose";
import { Schedules } from "./schemas/schedules.schema";
import { Model } from "mongoose";
import { CreateScheduleDto } from "./dtos/create-schedule";
import { EventEmitter } from "stream";
import { SwitchService } from "../switch/switch.service";
import { SwitchGateway } from "../switch/switch.gateway";
import { SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class ScheduleService implements OnModuleInit {
	constructor(
		@InjectModel(Schedules.name) 
		private readonly scheduleModel: Model<Schedules>,
		private readonly eventEmiter: EventEmitter,
		private readonly switchService: SwitchService,
		private readonly switchGateway: SwitchGateway,
		private schedulerRegistry: SchedulerRegistry
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

	teste(id: string, state: boolean) {
		this.switchGateway.emitToSwitch(id, state);
	}

	async insertOne(data: CreateScheduleDto) {
		data.switches.map(async e => {
			await this.switchService.findById(e);
		});

    	const schedule = await this.scheduleModel.create({ ...data, is_active: false});
    	this.eventEmiter.emit("new-schedule", schedule);
		this.addCronJob("teste", "5");
    	return schedule; 
	}

	addCronJob(name: string, seconds: string) {
		const job = new CronJob(`${seconds} * * * * *`, () => {
		  this.logger.warn(`time (${seconds}) for job ${name} to run!`);
		});
	  
		this.schedulerRegistry.addCronJob(name, job);
		job.start();
	  
		this.logger.warn(
		  `job ${name} added for each minute at ${seconds} seconds!`,
		);
	  }
}