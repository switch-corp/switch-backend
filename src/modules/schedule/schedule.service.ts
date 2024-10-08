/* eslint-disable no-mixed-spaces-and-tabs */
import { Injectable, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { CronJob } from "cron";
import { InjectModel } from "@nestjs/mongoose";
import { Schedules } from "./schemas/schedules.schema";
import { Model } from "mongoose";
import { CreateScheduleDto } from "./dtos/create-schedule";
import { EventEmitter } from "stream";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { UserGroupService } from "../user-groups/user-group.service";
// import { parseExpression } from "cron-parser";
import { plainToClass, plainToInstance } from "class-transformer";
import { UpdateUserGroupDto } from "../user-groups/dtos/update-user-group.dto";

@Injectable()
export class ScheduleService implements OnModuleInit {

	constructor(
		@InjectModel(Schedules.name) 
		private readonly scheduleModel: Model<Schedules>,
		private readonly eventEmiter: EventEmitter,
		private readonly schedulerRegistry: SchedulerRegistry,
		private readonly userGroupService: UserGroupService
	) {}
	private readonly logger: Logger = new Logger(ScheduleService.name);

	async onModuleInit() {
		const schedules = await this.scheduleModel.find({})
		schedules.map(e => this.addCronJob(`${e._id} - ${e.event_name}`, e.event_date))
	}

	// CRUD

	async findOneById(_id: string) {
		const schedule = await this.scheduleModel.find({ _id }).populate('switches').exec();
		if (!schedule) {
			throw new UnauthorizedException("Schedule not found");
		}
		return schedule;
	}

	async insertOne(data: CreateScheduleDto, userId: string) {
    	const schedule = await this.scheduleModel.create({ ...data, is_active: false});
		const userGroup = await this.userGroupService.findByUserId(userId);
		userGroup.schedules.push(schedule._id);
		await this.userGroupService.updateByUserId(userId, plainToInstance(UpdateUserGroupDto, userGroup))

		this.addCronJob(`${schedule._id} - ${schedule.event_name}`, schedule.event_date);

    	return schedule; 
	}

	//cron job

	addCronJob(name: string, time: string) {
		const job = new CronJob(time, () => {
			this.logger.debug(name)
		});
		this.schedulerRegistry.addCronJob(name, job);
		this.logger.warn(`iniciando ${name}`)
		job.start();
	  }
}