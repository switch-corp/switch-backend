import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PowerService {
	private logger: Logger = new Logger(PowerService.name);

	turnLight() {
		this.logger.log("Supplying/blocking energy to lights");
		const decision = Math.floor((Math.random() * 2));
		if (decision === 1) return true;
		return false;
	}
}
