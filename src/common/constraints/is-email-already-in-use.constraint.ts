import { Injectable } from "@nestjs/common";
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import { UserService } from "src/modules/user/user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyinUseConstraint
	implements ValidatorConstraintInterface
{
	constructor(private readonly userService: UserService) {}

	async validate(value: string): Promise<boolean> {
		try {
			await this.userService.findByEmail(value);
			return false;
		} catch (e) {
			return true;
		}
	}

	defaultMessage?(): string {
		return "The email '$value' is already in use";
	}
}
