/* eslint-disable no-mixed-spaces-and-tabs */
import { Injectable, Logger, NotFoundException, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { CronJob } from "cron";
import { InjectModel } from "@nestjs/mongoose";
import { Schedules } from "./schemas/schedules.schema";
import { Model } from "mongoose";
import { CreateScheduleDto } from "./dtos/create-schedule";
import { SchedulerRegistry } from "@nestjs/schedule";
import { UserGroupService } from "../user-groups/user-group.service";
// import { parseExpression } from "cron-parser";
import { plainToInstance } from "class-transformer";
import { UpdateUserGroupDto } from "../user-groups/dtos/update-user-group.dto";
import { SwitchService } from "../switch/switch.service";
import { UpdateScheduleDto } from "./dtos/update-schedule";

@Injectable()
export class ScheduleService implements OnModuleInit {

	constructor(
		@InjectModel(Schedules.name) 
		private readonly scheduleModel: Model<Schedules>,
		private readonly schedulerRegistry: SchedulerRegistry,
		private readonly userGroupService: UserGroupService,
		private readonly switchService: SwitchService
	) {}
	private readonly logger: Logger = new Logger(ScheduleService.name);

	async onModuleInit() {
		const schedules = await this.scheduleModel.find({});
		schedules.map(e => this.addCronJob(`${e._id} - ${e.event_name}`, e.event_date, e._id.toString()));
	}

	// CRUD

	async findOneById(_id: string) {
		try {
			const schedule = await this.scheduleModel.findOne({ _id });
			if (!schedule) throw new NotFoundException(`Schedule not found for id ${_id}`);
			return schedule.populate('switches');
		} catch (e) {	
			this.logger.error(e.message)
		}
	}

	async insertOne(data: CreateScheduleDto, userId: string) {
    	const schedule = await this.scheduleModel.create({ ...data, is_active: false});
		const userGroup = await this.userGroupService.findByUserIdNotPopulated(userId);

		userGroup.schedules.push(schedule._id);
		await this.userGroupService.updateByUserId(userId, plainToInstance(UpdateUserGroupDto, userGroup));

		this.addCronJob(`${schedule._id} - ${schedule.event_name}`, schedule.event_date, schedule._id.toString());
    	return schedule; 	
	}

	async updateOneById(_id: string, data: UpdateScheduleDto) {
		const schedule = await this.scheduleModel.findOne({ _id })
		if (!schedule) throw new NotFoundException("Schedule not found")
		Object.assign(schedule, data)
		return await this.scheduleModel.replaceOne({ _id }, schedule)
	}

	//cron job

	addCronJob(name: string, time: string, _id: string) {
		const job = new CronJob(time, async () => {
			const schedule = await this.findOneById(_id);
			schedule.switches.map(e => {
				if (e.is_active != schedule.is_active) this.switchService.powerOne(schedule.is_active, e.arduino_id)
			})
			this.logger.debug(_id)
		});
		this.schedulerRegistry.addCronJob(name, job);
		job.start();
	  }
}